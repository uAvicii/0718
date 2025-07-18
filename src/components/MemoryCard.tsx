import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Stack,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Mood as MoodIcon,
  LocalOffer as TagIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Memory } from '../types';

interface MemoryCardProps {
  memory: Memory;
  index?: number;
}

const moodEmojis = {
  happy: '😊',
  sad: '😢',
  excited: '🎉',
  peaceful: '😌',
  nostalgic: '🥺',
  grateful: '🙏',
};

const categoryColors = {
  life: '#4ADE80',
  travel: '#3B82F6',
  family: '#F59E0B',
  friends: '#8B5CF6',
  work: '#10B981',
  achievement: '#EF4444',
  love: '#EC4899',
  other: '#6B7280',
};

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, index = 0 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/memory/${memory.id}`);
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card
        sx={{
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 20px -10px rgba(0, 0, 0, 0.15)',
          },
        }}
        onClick={handleClick}
      >
        {memory.images.length > 0 && (
          <CardMedia
            component="img"
            height="200"
            image={memory.images[0]}
            alt={memory.title}
            sx={{
              objectFit: 'cover',
            }}
          />
        )}
        <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {memory.title}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {format(new Date(memory.date), 'yyyy年MM月dd日', { locale: zhCN })}
                </Typography>
              </Box>
              {memory.location && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {memory.location}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {truncateContent(memory.content, 150)}
          </Typography>

          <Box sx={{ mt: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Chip
                label={memory.category}
                size="small"
                sx={{
                  backgroundColor: categoryColors[memory.category] + '20',
                  color: categoryColors[memory.category],
                  fontWeight: 500,
                }}
              />
              {memory.mood && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 0.5 }}>
                    {moodEmojis[memory.mood]}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {memory.mood}
                  </Typography>
                </Box>
              )}
            </Box>
            {memory.tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {memory.tags.slice(0, 3).map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                    }}
                  />
                ))}
                {memory.tags.length > 3 && (
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1, alignSelf: 'center' }}>
                    +{memory.tags.length - 3}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MemoryCard;