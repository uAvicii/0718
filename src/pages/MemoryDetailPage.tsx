import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
  IconButton,
  Button,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Mood as MoodIcon,
  WbSunny as WeatherIcon,
  MusicNote as MusicIcon,
  People as PeopleIcon,
  FormatQuote as QuoteIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useMemory } from '../contexts/MemoryContext';

const moodEmojis = {
  happy: '😊',
  sad: '😢',
  excited: '🎉',
  peaceful: '😌',
  nostalgic: '🥺',
  grateful: '🙏',
};

const categoryLabels = {
  life: '生活',
  travel: '旅行',
  family: '家人',
  friends: '朋友',
  work: '工作',
  achievement: '成就',
  love: '爱情',
  other: '其他',
};

const MemoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { memories, deleteMemory } = useMemory();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const memory = memories.find(m => m.id === id);

  if (!memory) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          回忆不存在
        </Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
          返回首页
        </Button>
      </Box>
    );
  }

  const handleDelete = () => {
    deleteMemory(memory.id);
    navigate('/');
  };

  return (
    <Box>
      {/* 顶部操作栏 */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: 'text.secondary' }}
        >
          返回
        </Button>
        <Stack direction="row" spacing={1}>
          <IconButton color="primary">
            <ShareIcon />
          </IconButton>
          <IconButton color="primary">
            <FavoriteIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => navigate(`/edit/${memory.id}`)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => setDeleteDialogOpen(true)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper sx={{ p: 4 }}>
          {/* 标题和基本信息 */}
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            {memory.title}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1">
                  {format(new Date(memory.date), 'yyyy年MM月dd日 EEEE', { locale: zhCN })}
                </Typography>
              </Box>
            </Grid>
            {memory.location && (
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body1">{memory.location}</Typography>
                </Box>
              </Grid>
            )}
            {memory.weather && (
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WeatherIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body1">{memory.weather}</Typography>
                </Box>
              </Grid>
            )}
            {memory.mood && (
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ mr: 1 }}>
                    {moodEmojis[memory.mood]}
                  </Typography>
                  <Typography variant="body1">{memory.mood}</Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          <Box sx={{ mb: 4 }}>
            <Chip
              label={categoryLabels[memory.category]}
              color="primary"
              sx={{ mr: 2 }}
            />
            {memory.tags.map(tag => (
              <Chip
                key={tag}
                label={tag}
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* 图片展示 */}
          {memory.images.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Box
                component="img"
                src={memory.images[selectedImageIndex]}
                alt={`${memory.title} ${selectedImageIndex + 1}`}
                sx={{
                  width: '100%',
                  maxHeight: 500,
                  objectFit: 'contain',
                  borderRadius: 2,
                  mb: 2,
                }}
              />
              {memory.images.length > 1 && (
                <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto' }}>
                  {memory.images.map((image, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={image}
                      alt={`缩略图 ${index + 1}`}
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: 1,
                        cursor: 'pointer',
                        opacity: selectedImageIndex === index ? 1 : 0.6,
                        border: selectedImageIndex === index ? '2px solid' : 'none',
                        borderColor: 'primary.main',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          opacity: 1,
                        },
                      }}
                      onClick={() => setSelectedImageIndex(index)}
                    />
                  ))}
                </Box>
              )}
            </Box>
          )}

          {/* 内容 */}
          <Box sx={{ mb: 4 }}>
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                    {children}
                  </Typography>
                ),
              }}
            >
              {memory.content}
            </ReactMarkdown>
          </Box>

          {/* 额外信息 */}
          {(memory.music || memory.people || memory.quote) && (
            <>
              <Divider sx={{ my: 4 }} />
              <Grid container spacing={3}>
                {memory.music && (
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <MusicIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="subtitle2" color="text.secondary">
                        背景音乐
                      </Typography>
                    </Box>
                    <Typography variant="body1">{memory.music}</Typography>
                  </Grid>
                )}
                {memory.people && memory.people.length > 0 && (
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PeopleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="subtitle2" color="text.secondary">
                        相关人物
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {memory.people.map(person => (
                        <Chip key={person} label={person} size="small" />
                      ))}
                    </Box>
                  </Grid>
                )}
                {memory.quote && (
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <QuoteIcon sx={{ mr: 1, color: 'text.secondary', mt: 0.5 }} />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          引用
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontStyle: 'italic',
                            borderLeft: '4px solid',
                            borderColor: 'primary.main',
                            pl: 2,
                            py: 1,
                          }}
                        >
                          {memory.quote}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </>
          )}

          {/* 时间戳 */}
          <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary">
              创建于 {format(new Date(memory.createdAt), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
              {memory.updatedAt.getTime() !== memory.createdAt.getTime() && (
                <> · 更新于 {format(new Date(memory.updatedAt), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}</>
              )}
            </Typography>
          </Box>
        </Paper>
      </motion.div>

      {/* 删除确认对话框 */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <Typography>
            确定要删除这个回忆吗？此操作无法撤销。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MemoryDetailPage;