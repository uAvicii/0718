import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  LinearProgress,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Collections as CollectionsIcon,
  LocalOffer as TagIcon,
  Category as CategoryIcon,
  Mood as MoodIcon,
  CalendarToday as CalendarIcon,
  AutoAwesome as AutoAwesomeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useMemory } from '../contexts/MemoryContext';

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

const moodLabels = {
  happy: '开心',
  sad: '难过',
  excited: '兴奋',
  peaceful: '平静',
  nostalgic: '怀念',
  grateful: '感恩',
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

const moodColors = {
  happy: '#FDE047',
  sad: '#60A5FA',
  excited: '#F97316',
  peaceful: '#86EFAC',
  nostalgic: '#C084FC',
  grateful: '#FDA4AF',
};

const StatisticsPage: React.FC = () => {
  const theme = useTheme();
  const { statistics, memories } = useMemory();

  // 计算最活跃的月份
  const getActivestMonth = () => {
    const monthCounts: Record<string, number> = {};
    memories.forEach(memory => {
      const monthKey = new Date(memory.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
      monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
    });
    
    const sortedMonths = Object.entries(monthCounts).sort((a, b) => b[1] - a[1]);
    return sortedMonths[0] || ['暂无数据', 0];
  };

  const [activestMonth, activestMonthCount] = getActivestMonth();

  // 获取最大值用于计算百分比
  const maxCategoryCount = Math.max(...Object.values(statistics.memoriesByCategory));
  const maxMoodCount = Math.max(...Object.values(statistics.memoriesByMood));

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
          统计数据
        </Typography>
      </motion.div>

      {/* 概览卡片 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AutoAwesomeIcon sx={{ color: 'white', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    总回忆数
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 700 }}>
                  {statistics.totalMemories}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 1 }}>
                  个美好瞬间
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CollectionsIcon sx={{ color: 'white', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    照片总数
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 700 }}>
                  {statistics.totalImages}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 1 }}>
                  张珍贵照片
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TagIcon sx={{ color: 'white', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    标签总数
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 700 }}>
                  {statistics.totalTags}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 1 }}>
                  个不同标签
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarIcon sx={{ color: 'white', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    最活跃月份
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
                  {activestMonth}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 1 }}>
                  {activestMonthCount} 个回忆
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* 分类统计 */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  分类分布
                </Typography>
              </Box>
              {Object.entries(statistics.memoriesByCategory).map(([category, count]) => (
                <Box key={category} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{categoryLabels[category as keyof typeof categoryLabels]}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{count}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(count / maxCategoryCount) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.palette.grey[200],
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: categoryColors[category as keyof typeof categoryColors],
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              ))}
            </Paper>
          </motion.div>
        </Grid>

        {/* 心情统计 */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <MoodIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  心情分布
                </Typography>
              </Box>
              {Object.entries(statistics.memoriesByMood).map(([mood, count]) => (
                <Box key={mood} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{moodLabels[mood as keyof typeof moodLabels]}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{count}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(count / maxMoodCount) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.palette.grey[200],
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: moodColors[mood as keyof typeof moodColors],
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              ))}
            </Paper>
          </motion.div>
        </Grid>

        {/* 年度统计 */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  年度趋势
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {Object.entries(statistics.memoriesByYear)
                  .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                  .map(([year, count]) => (
                    <Card key={year} sx={{ minWidth: 120, textAlign: 'center' }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                          {year}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, my: 1 }}>
                          {count}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          个回忆
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticsPage;