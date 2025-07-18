import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { zhCN } from 'date-fns/locale';
import { MemoryProvider } from './contexts/MemoryContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import GalleryPage from './pages/GalleryPage';
import CreateMemoryPage from './pages/CreateMemoryPage';
import MemoryDetailPage from './pages/MemoryDetailPage';
import StatisticsPage from './pages/StatisticsPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366F1',
      light: '#818CF8',
      dark: '#4F46E5',
    },
    secondary: {
      main: '#EC4899',
      light: '#F472B6',
      dark: '#DB2777',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Noto Sans SC", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Noto Serif SC", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Noto Serif SC", serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Noto Serif SC", serif',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhCN}>
        <MemoryProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/create" element={<CreateMemoryPage />} />
                <Route path="/memory/:id" element={<MemoryDetailPage />} />
                <Route path="/statistics" element={<StatisticsPage />} />
              </Routes>
            </Layout>
          </Router>
        </MemoryProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;