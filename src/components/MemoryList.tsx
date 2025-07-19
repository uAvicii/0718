import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import MemoryCard from './MemoryCard';
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

const MemoryList: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
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

  if (memories.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h6" color="text.secondary">
          暂无记忆，点击"创建"按钮添加你的第一个记忆
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      {memories.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} />
      ))}
    </Box>
  );
};

export default MemoryList; 