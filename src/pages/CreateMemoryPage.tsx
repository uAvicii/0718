import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Stack,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Add as AddIcon,
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  Save as SaveIcon,
  LocationOn as LocationIcon,
  MusicNote as MusicIcon,
  People as PeopleIcon,
  WbSunny as WeatherIcon,
  FormatQuote as QuoteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemory } from '../contexts/MemoryContext';
import { Memory } from '../types';

const categories = [
  { value: 'life', label: '生活' },
  { value: 'travel', label: '旅行' },
  { value: 'family', label: '家人' },
  { value: 'friends', label: '朋友' },
  { value: 'work', label: '工作' },
  { value: 'achievement', label: '成就' },
  { value: 'love', label: '爱情' },
  { value: 'other', label: '其他' },
];

const moods = [
  { value: 'happy', label: '开心 😊' },
  { value: 'sad', label: '难过 😢' },
  { value: 'excited', label: '兴奋 🎉' },
  { value: 'peaceful', label: '平静 😌' },
  { value: 'nostalgic', label: '怀念 🥺' },
  { value: 'grateful', label: '感恩 🙏' },
];

const CreateMemoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { addMemory } = useMemory();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date(),
    category: 'life' as Memory['category'],
    mood: '' as Memory['mood'] | '',
    location: '',
    weather: '',
    music: '',
    quote: '',
    tags: [] as string[],
    people: [] as string[],
    images: [] as string[],
  });
  const [newTag, setNewTag] = useState('');
  const [newPerson, setNewPerson] = useState('');
  const [newImage, setNewImage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      setError('请输入标题');
      return;
    }
    if (!formData.content.trim()) {
      setError('请输入内容');
      return;
    }

    const memoryData: Omit<Memory, 'id' | 'createdAt' | 'updatedAt'> = {
      title: formData.title,
      content: formData.content,
      date: formData.date,
      category: formData.category,
      mood: formData.mood || undefined,
      location: formData.location || undefined,
      weather: formData.weather || undefined,
      music: formData.music || undefined,
      quote: formData.quote || undefined,
      tags: formData.tags,
      people: formData.people.length > 0 ? formData.people : undefined,
      images: formData.images,
    };

    addMemory(memoryData);
    navigate('/');
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleAddPerson = () => {
    if (newPerson.trim() && !formData.people.includes(newPerson.trim())) {
      setFormData({ ...formData, people: [...formData.people, newPerson.trim()] });
      setNewPerson('');
    }
  };

  const handleRemovePerson = (personToRemove: string) => {
    setFormData({
      ...formData,
      people: formData.people.filter(person => person !== personToRemove),
    });
  };

  const handleAddImage = () => {
    if (newImage.trim() && !formData.images.includes(newImage.trim())) {
      setFormData({ ...formData, images: [...formData.images, newImage.trim()] });
      setNewImage('');
    }
  };

  const handleRemoveImage = (imageToRemove: string) => {
    setFormData({
      ...formData,
      images: formData.images.filter(image => image !== imageToRemove),
    });
  };

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
          写下新的回忆
        </Typography>
      </motion.div>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 4 }}>
        <Grid container spacing={3}>
          {/* 基本信息 */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="标题"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="内容"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              multiline
              rows={6}
              variant="outlined"
              placeholder="记录下这个美好的时刻..."
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="日期"
              value={formData.date}
              onChange={(newValue) => newValue && setFormData({ ...formData, date: newValue })}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>分类</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Memory['category'] })}
                label="分类"
              >
                {categories.map(cat => (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>心情</InputLabel>
              <Select
                value={formData.mood}
                onChange={(e) => setFormData({ ...formData, mood: e.target.value as Memory['mood'] })}
                label="心情"
              >
                <MenuItem value="">无</MenuItem>
                {moods.map(mood => (
                  <MenuItem key={mood.value} value={mood.value}>
                    {mood.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="地点"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              InputProps={{
                startAdornment: <LocationIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          </Grid>

          {/* 额外信息 */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="天气"
              value={formData.weather}
              onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
              InputProps={{
                startAdornment: <WeatherIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="背景音乐"
              value={formData.music}
              onChange={(e) => setFormData({ ...formData, music: e.target.value })}
              InputProps={{
                startAdornment: <MusicIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="引用/座右铭"
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              InputProps={{
                startAdornment: <QuoteIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          </Grid>

          {/* 标签 */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              标签
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <TextField
                size="small"
                placeholder="添加标签"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleAddTag}
                startIcon={<AddIcon />}
              >
                添加
              </Button>
            </Stack>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.tags.map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                />
              ))}
            </Box>
          </Grid>

          {/* 相关人物 */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              相关人物
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <TextField
                size="small"
                placeholder="添加人物"
                value={newPerson}
                onChange={(e) => setNewPerson(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddPerson()}
                InputProps={{
                  startAdornment: <PeopleIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleAddPerson}
                startIcon={<AddIcon />}
              >
                添加
              </Button>
            </Stack>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.people.map(person => (
                <Chip
                  key={person}
                  label={person}
                  onDelete={() => handleRemovePerson(person)}
                />
              ))}
            </Box>
          </Grid>

          {/* 图片 */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              图片
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="输入图片URL"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddImage()}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleAddImage}
                startIcon={<UploadIcon />}
              >
                添加
              </Button>
            </Stack>
            <Grid container spacing={2}>
              {formData.images.map((image, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Box sx={{ position: 'relative' }}>
                    <img
                      src={image}
                      alt={`预览 ${index + 1}`}
                      style={{
                        width: '100%',
                        height: 150,
                        objectFit: 'cover',
                        borderRadius: 8,
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                      }}
                      onClick={() => handleRemoveImage(image)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* 操作按钮 */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
              >
                取消
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                startIcon={<SaveIcon />}
              >
                保存回忆
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CreateMemoryPage;