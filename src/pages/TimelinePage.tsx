import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../contexts/MemoryContext';
import { Memory } from '../types';

const categoryIcons: Record<string, string> = {
  life: '🌟',
  travel: '✈️',
  family: '👨‍👩‍👧‍👦',
  friends: '👫',
  work: '💼',
  achievement: '🏆',
  love: '❤️',
  other: '📌',
};

const TimelinePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { memories } = useMemory();

  // 按年份分组回忆
  const groupMemoriesByYear = () => {
    const grouped: Record<number, Memory[]> = {};
    memories.forEach(memory => {
      const year = new Date(memory.date).getFullYear();
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(memory);
    });
    
    // 按日期排序每年的回忆
    Object.keys(grouped).forEach(year => {
      grouped[parseInt(year)].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
    
    return grouped;
  };

  const memoriesByYear = groupMemoriesByYear();
  const years = Object.keys(memoriesByYear).sort((a, b) => parseInt(b) - parseInt(a));

  const handleMemoryClick = (memoryId: string) => {
    navigate(`/memory/${memoryId}`);
  };

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
          时光轴
        </Typography>
      </motion.div>

      {years.map((year, yearIndex) => (
        <motion.div
          key={year}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: yearIndex * 0.1 }}
        >
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: theme.palette.primary.main,
                position: 'sticky',
                top: 80,
                backgroundColor: theme.palette.background.default,
                py: 1,
                zIndex: 10,
              }}
            >
              {year}年
            </Typography>
            
            <Timeline position="alternate">
              {memoriesByYear[parseInt(year)].map((memory, index) => (
                <TimelineItem key={memory.id}>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align={index % 2 === 0 ? 'right' : 'left'}
                    variant="body2"
                    color="text.secondary"
                  >
                    {format(new Date(memory.date), 'MM月dd日', { locale: zhCN })}
                  </TimelineOppositeContent>
                  
                  <TimelineSeparator>
                    <TimelineConnector sx={{ bgcolor: 'primary.light' }} />
                    <TimelineDot
                      sx={{
                        bgcolor: 'primary.main',
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                      }}
                    >
                      {categoryIcons[memory.category]}
                    </TimelineDot>
                    <TimelineConnector sx={{ bgcolor: 'primary.light' }} />
                  </TimelineSeparator>
                  
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Paper
                        elevation={3}
                        sx={{
                          p: 3,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: theme.shadows[6],
                          },
                        }}
                        onClick={() => handleMemoryClick(memory.id)}
                      >
                        <Typography variant="h6" component="h3" gutterBottom>
                          {memory.title}
                        </Typography>
                        
                        {memory.location && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            📍 {memory.location}
                          </Typography>
                        )}
                        
                        <Typography
                          variant="body2"
                          sx={{
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {memory.content}
                        </Typography>
                        
                        {memory.images.length > 0 && (
                          <Box
                            sx={{
                              mb: 2,
                              display: 'flex',
                              gap: 1,
                              overflowX: 'auto',
                              '&::-webkit-scrollbar': { display: 'none' },
                            }}
                          >
                            {memory.images.slice(0, 3).map((image, imgIndex) => (
                              <Box
                                key={imgIndex}
                                component="img"
                                src={image}
                                alt={`${memory.title} ${imgIndex + 1}`}
                                sx={{
                                  width: 80,
                                  height: 80,
                                  objectFit: 'cover',
                                  borderRadius: 1,
                                  flexShrink: 0,
                                }}
                              />
                            ))}
                            {memory.images.length > 3 && (
                              <Box
                                sx={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: 1,
                                  backgroundColor: 'grey.200',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}
                              >
                                <Typography variant="body2" color="text.secondary">
                                  +{memory.images.length - 3}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        )}
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {memory.tags.slice(0, 3).map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              variant="outlined"
                              sx={{ height: 24 }}
                            />
                          ))}
                        </Box>
                      </Paper>
                    </motion.div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
};

export default TimelinePage;