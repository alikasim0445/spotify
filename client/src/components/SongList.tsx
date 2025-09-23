import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchSongs, 
  deleteSong, 
  fetchStats 
} from '../store/songs/songsSlice';
import type { RootState } from '../store';
import type { Song } from '../types';
import SongForm from './SongForm';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardActions,
  CircularProgress, 
  Grid, 
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  Chip,
  Paper,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MusicNote as MusicNoteIcon,
  Album as AlbumIcon,
  Person as PersonIcon,
  LibraryMusic as LibraryMusicIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';
import styled from '@emotion/styled';

import type { AppDispatch } from '../store';

// Styled components using Emotion
const HeaderSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: '16px',
  padding: '32px',
  marginBottom: '32px',
  color: 'white',
  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
    transform: 'rotate(30deg)',
  }
}));

const HeaderTitle = styled(Typography)`
  font-weight: 800 !important;
  margin-bottom: 16px !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const HeaderSubtitle = styled(Typography)`
  opacity: 0.9 !important;
  margin-bottom: 24px !important;
  font-weight: 500 !important;
  position: relative;
`;

const AddSongButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.primary.main,
  borderRadius: '30px',
  padding: '12px 24px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3)',
  }
}));

const StatsCard = styled(Paper)`
  border-radius: 12px !important;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
  transition: all 0.3s ease !important;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3) !important;
  }
`;

const StatIconContainer = styled(Box)(({ color }) => ({
  backgroundColor: `rgba(${color}, 0.1)`,
  borderRadius: '50%',
  padding: '12px',
  marginRight: '16px',
  display: 'flex',
}));

const SongCard = styled(Card)`
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  border-radius: 12px !important;
  background: linear-gradient(135deg, #181818 0%, #121212 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  transition: all 0.3s ease !important;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4) !important;
    border-color: rgba(29, 185, 84, 0.3) !important;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1DB954 0%, #1ed760 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const SongTitle = styled(Typography)`
  font-weight: 700 !important;
  margin-bottom: 12px !important;
  color: #ffffff !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
`;

const SongInfo = styled(Box)`
  display: flex !important;
  align-items: center !important;
  margin-bottom: 8px !important;
  color: #b3b3b3 !important;
`;

const GenreChip = styled(Chip)`
  margin-top: 12px !important;
  border-radius: 6px !important;
  background-color: rgba(29, 185, 84, 0.1) !important;
  border: 1px solid rgba(29, 185, 84, 0.3) !important;
  color: #1DB954 !important;
  font-weight: 500 !important;
`;

const ActionButton = styled(IconButton)`
  transition: all 0.2s ease !important;
  
  &:hover {
    transform: scale(1.1) !important;
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
  
  &:active {
    transform: scale(0.95) !important;
  }
`;

const EmptyStateContainer = styled(Paper)`
  padding: 48px !important;
  text-align: center !important;
  border-radius: 16px !important;
  background: linear-gradient(135deg, #181818 0%, #121212 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
`;

const SongList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { songs, loading, error, stats } = useSelector((state: RootState) => state.songs);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(fetchSongs.pending());
    dispatch(fetchStats.pending());
  }, [dispatch]);

  const handleEditSong = (song: Song) => {
    setEditingSong(song);
    setOpenDialog(true);
  };

  const handleDeleteSong = (id: string) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      dispatch(deleteSong.pending(id));
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSong(null);
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" color="textSecondary">
          Loading your music collection...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, width: '100%', maxWidth: '100%' }}>
      {/* Header Section */}
      <HeaderSection theme={theme}>
        <HeaderTitle variant="h3">
          Music Library
        </HeaderTitle>
        <HeaderSubtitle variant="h6">
          Manage your song collection
        </HeaderSubtitle>
        <AddSongButton 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => dispatch(fetchSongs.pending())}
        >
          Add New Song
        </AddSongButton>
      </HeaderSection>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Statistics Section */}
      {stats && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard elevation={2}>
              <Box 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center',
                  flexGrow: 1
                }}
              >
                <StatIconContainer color="29, 185, 84">
                  <MusicNoteIcon color="primary" />
                </StatIconContainer>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalSongs}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Songs
                  </Typography>
                </Box>
              </Box>
            </StatsCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard elevation={2}>
              <Box 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center',
                  flexGrow: 1
                }}
              >
                <StatIconContainer color="33, 150, 243">
                  <AlbumIcon color="info" />
                </StatIconContainer>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalAlbums}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Albums
                  </Typography>
                </Box>
              </Box>
            </StatsCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard elevation={2}>
              <Box 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center',
                  flexGrow: 1
                }}
              >
                <StatIconContainer color="76, 175, 80">
                  <PersonIcon color="success" />
                </StatIconContainer>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalArtists}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Artists
                  </Typography>
                </Box>
              </Box>
            </StatsCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard elevation={2}>
              <Box 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center',
                  flexGrow: 1
                }}
              >
                <StatIconContainer color="255, 152, 0">
                  <AnalyticsIcon color="warning" />
                </StatIconContainer>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalGenres}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Genres
                  </Typography>
                </Box>
              </Box>
            </StatsCard>
          </Grid>
        </Grid>
      )}

      {/* Songs Grid */}
      {songs.length === 0 ? (
        <EmptyStateContainer>
          <LibraryMusicIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="textSecondary">
            Your music library is empty
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Add your first song to get started
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={() => dispatch(fetchSongs.pending())}
            size="large"
            sx={{
              background: 'linear-gradient(45deg, #1DB954 30%, #1ed760 90%)',
              borderRadius: 30,
              padding: '12px 24px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(29, 185, 84, 0.4)'
              }
            }}
          >
            Add Your First Song
          </Button>
        </EmptyStateContainer>
      ) : (
        <>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            Your Songs
          </Typography>
          <Grid container spacing={3}>
            {songs.map((song) => (
              <Grid item xs={12} sm={6} md={4} key={song._id}>
                <SongCard>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <SongTitle variant="h6" noWrap>
                      {song.title}
                    </SongTitle>
                    
                    <SongInfo>
                      <PersonIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="textSecondary" noWrap>
                        {song.artist}
                      </Typography>
                    </SongInfo>
                    
                    <SongInfo>
                      <AlbumIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="textSecondary" noWrap>
                        {song.album}
                      </Typography>
                    </SongInfo>
                    
                    <GenreChip 
                      label={song.genre} 
                      size="small"
                    />
                  </CardContent>
                  
                  <CardActions>
                    <ActionButton 
                      aria-label="edit" 
                      onClick={() => handleEditSong(song)}
                      color="primary"
                    >
                      <EditIcon />
                    </ActionButton>
                    <ActionButton 
                      aria-label="delete" 
                      onClick={() => handleDeleteSong(song._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </ActionButton>
                  </CardActions>
                </SongCard>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ 
          backgroundColor: theme.palette.primary.main,
          color: 'white'
        }}>
          {editingSong ? 'Edit Song' : 'Add New Song'}
        </DialogTitle>
        <DialogContent>
          <SongForm song={editingSong || undefined} onCancel={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SongList;