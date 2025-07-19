import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Fab,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MemoryCard from '../components/MemoryCard';
import { getMemories } from '../api/memories';

interface Memory {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?: string;
  location?: string;
  tags?: string[];
  images?: string[];
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMemories() {
      try {
        setLoading(true);
        const result = await getMemories();
        if (result.error) {
          setError(result.error);
        } else {
          setMemories(result.memories || []);
        }
      } catch (err) {
        setError('获取记忆列表失败，请稍后再试');
        console.error('获取记忆列表错误:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMemories();
  }, []);

  // 获取所有标签及其出现次数
  const getAllTags = () => {
    const tagCount: Record<string, number> = {};
    memories.forEach(memory => {
      if (memory.tags) {
        memory.tags.forEach(tag => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      }
    });
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); // 只显示前10个热门标签
  };

  const popularTags = getAllTags();

  // 搜索记忆
  const searchMemories = (query: string) => {
    return memories.filter(memory =>
      memory.title.toLowerCase().includes(query.toLowerCase()) ||
      memory.content.toLowerCase().includes(query.toLowerCase())
    );
  };

  // 按标签过滤
  const filterByTag = (tag: string) => {
    return memories.filter(memory =>
      memory.tags && memory.tags.includes(tag)
    );
  };

  // 根据搜索和标签过滤回忆
  const filteredMemories = selectedTag
    ? filterByTag(selectedTag)
    : searchQuery
      ? searchMemories(searchQuery)
      : memories;

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    setSearchQuery('');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      {/* 头部搜索区域 */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 3,
          color: 'white',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            记录美好，珍藏回忆
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            共有 {memories.length} 个回忆在这里闪闪发光
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="搜索回忆..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedTag(null);
            }}
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </motion.div>
      </Paper>

      {/* 热门标签 */}
      {popularTags.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              热门标签
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {popularTags.map(([tag, count]) => (
              <motion.div
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Chip
                  label={`${tag} (${count})`}
                  onClick={() => handleTagClick(tag)}
                  color={selectedTag === tag ? 'primary' : 'default'}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: selectedTag === tag ? 600 : 400,
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </Box>
      )}

      {/* 回忆卡片网格 */}
      <Grid container spacing={3}>
        {filteredMemories.map((memory, index) => (
          <Grid item xs={12} sm={6} md={4} key={memory.id}>
            <MemoryCard memory={memory} index={index} />
          </Grid>
        ))}
      </Grid>

      {/* 如果没有找到回忆 */}
      {filteredMemories.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            没有找到相关的回忆
          </Typography>
          <Typography variant="body2" color="text.secondary">
            试试其他关键词或标签吧
          </Typography>
        </Box>
      )}

      {/* 悬浮添加按钮 */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
        onClick={() => navigate('/create')}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default HomePage;