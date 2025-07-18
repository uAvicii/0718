import React, { useState } from 'react';
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Dialog,
  DialogContent,
  useTheme,
  useMediaQuery,
  Chip,
  Paper,
} from '@mui/material';
import {
  Close as CloseIcon,
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { useMemory } from '../contexts/MemoryContext';
import { Memory } from '../types';

interface ImageItem {
  src: string;
  memory: Memory;
  imageIndex: number;
}

const GalleryPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { memories } = useMemory();
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 收集所有图片
  const allImages: ImageItem[] = [];
  memories.forEach(memory => {
    memory.images.forEach((image, index) => {
      allImages.push({
        src: image,
        memory,
        imageIndex: index,
      });
    });
  });

  const handleImageClick = (item: ImageItem, index: number) => {
    setSelectedImage(item);
    setCurrentImageIndex(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : allImages.length - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentImageIndex < allImages.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
          相册
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          共 {allImages.length} 张照片，记录了 {memories.length} 个美好瞬间
        </Typography>
      </motion.div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
        style={{ display: 'flex', marginLeft: '-16px' }}
      >
        {allImages.map((item, index) => (
          <motion.div
            key={`${item.memory.id}-${item.imageIndex}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            style={{ paddingLeft: '16px', marginBottom: '16px' }}
          >
            <Paper
              elevation={2}
              sx={{
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                  '& .image-overlay': {
                    opacity: 1,
                  },
                },
              }}
              onClick={() => handleImageClick(item, index)}
            >
              <Box sx={{ position: 'relative' }}>
                <img
                  src={item.src}
                  alt={item.memory.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
                <Box
                  className="image-overlay"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                    color: 'white',
                    p: 2,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {item.memory.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <CalendarIcon sx={{ fontSize: 14, mr: 0.5 }} />
                    <Typography variant="caption">
                      {format(new Date(item.memory.date), 'yyyy年MM月dd日', { locale: zhCN })}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Masonry>

      {/* 图片查看对话框 */}
      <AnimatePresence>
        {selectedImage && (
          <Dialog
            open={!!selectedImage}
            onClose={handleClose}
            maxWidth={false}
            fullScreen
            sx={{
              '& .MuiDialog-paper': {
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
              },
            }}
          >
            <DialogContent sx={{ p: 0, position: 'relative', height: '100vh' }}>
              <IconButton
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  color: 'white',
                  zIndex: 10,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>

              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <IconButton
                  onClick={handlePrevious}
                  sx={{
                    position: 'absolute',
                    left: 16,
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                >
                  <PrevIcon />
                </IconButton>

                <motion.img
                  key={selectedImage.src}
                  src={selectedImage.src}
                  alt={selectedImage.memory.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    objectFit: 'contain',
                  }}
                />

                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                >
                  <NextIcon />
                </IconButton>

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                    color: 'white',
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {selectedImage.memory.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarIcon sx={{ fontSize: 18, mr: 0.5 }} />
                      <Typography variant="body2">
                        {format(new Date(selectedImage.memory.date), 'yyyy年MM月dd日', { locale: zhCN })}
                      </Typography>
                    </Box>
                    {selectedImage.memory.location && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationIcon sx={{ fontSize: 18, mr: 0.5 }} />
                        <Typography variant="body2">
                          {selectedImage.memory.location}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {selectedImage.memory.tags.map(tag => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                        }}
                      />
                    ))}
                  </Box>
                  <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
                    {currentImageIndex + 1} / {allImages.length}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <style>{`
        .masonry-grid {
          display: flex;
          margin-left: -16px;
          width: auto;
        }
        .masonry-grid-column {
          padding-left: 16px;
          background-clip: padding-box;
        }
      `}</style>
    </Box>
  );
};

export default GalleryPage;