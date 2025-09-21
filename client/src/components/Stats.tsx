import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from '../store/songs/songsSlice';
import type { RootState } from '../store';
import type { AppDispatch } from '../store';
import { 
  Box, 
  Card, 
  CardContent, 
  CircularProgress, 
  Grid, 
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery,
  alpha,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  MusicNote as MusicNoteIcon,
  Album as AlbumIcon,
  Person as PersonIcon,
  LibraryMusic as LibraryMusicIcon,
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

// Keyframes for animations
const subtlePulse = keyframes`
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }
  50% {
    transform: scale(1.01);
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  }
`;

// Styled components using Emotion
const StatsHeader = styled(Box)`
  margin-bottom: 32px !important;
  text-align: center;
  animation: ${subtlePulse} 4s ease-in-out infinite;
`;

const StatsTitle = styled(Typography)`
  background: linear-gradient(135deg, ${(props: any) => props.theme.palette.primary.main} 0%, ${(props: any) => props.theme.palette.secondary.main} 100%) !important;
  background-clip: text !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  margin-bottom: 16px !important;
  font-weight: 800 !important;
  text-align: center;
`;

const StatsSubtitle = styled(Typography)`
  color: #b3b3b3 !important;
  text-align: center;
`;

const StatCard = styled(Card)`
  border-radius: 16px !important;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1) !important;
  position: relative !important;
  overflow: hidden !important;
  transition: all 0.3s ease !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 16px 32px rgba(0,0,0,0.2) !important;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1DB954 0%, #1ed760 100%);
  }
`;

const StatCardContent = styled(CardContent)`
  padding: 24px !important;
  position: relative !important;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StatNumber = styled(Typography)`
  font-weight: 800 !important;
  font-size: 2.5rem !important;
  margin-bottom: 8px !important;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatLabel = styled(Typography)`
  opacity: 0.9 !important;
  font-weight: 500 !important;
  text-align: center;
`;

const SectionHeader = styled(Box)`
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  margin-bottom: 16px !important;
`;

const SectionTitle = styled(Typography)`
  font-weight: 700 !important;
  color: #ffffff !important;
`;

const GenreItem = styled(Box)`
  margin-bottom: 20px !important;
`;

const GenreName = styled(Typography)`
  font-weight: 600 !important;
  color: #ffffff !important;
  margin-bottom: 8px !important;
`;

const GenreCount = styled(Chip)`
  background-color: rgba(29, 185, 84, 0.1) !important;
  border: 1px solid rgba(29, 185, 84, 0.3) !important;
  color: #1DB954 !important;
  font-weight: 600 !important;
`;

const GenreProgress = styled(LinearProgress)`
  height: 12px !important;
  border-radius: 6px !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
  margin-top: 8px;
  
  & .MuiLinearProgress-bar {
    border-radius: 6px !important;
    background: linear-gradient(90deg, #1DB954 0%, #1ed760 100%) !important;
  }
`;

const ArtistRow = styled(TableRow)`
  &:hover {
    background-color: rgba(29, 185, 84, 0.05) !important;
  }
  
  & td {
    padding: 12px 16px !important;
  }
`;

const AlbumRow = styled(TableRow)`
  &:hover {
    background-color: rgba(29, 185, 84, 0.05) !important;
  }
  
  &:last-child td, &:last-child th {
    border: 0 !important;
  }
  
  & td {
    padding: 12px 16px !important;
  }
`;

const AlbumTitle = styled(Typography)`
  font-weight: 600 !important;
  color: #ffffff !important;
`;

const AlbumArtist = styled(Typography)`
  color: #b3b3b3 !important;
`;

const AlbumCount = styled(Chip)`
  background: linear-gradient(45deg, #1DB954 30%, #1ed760 90%) !important;
  color: white !important;
  font-weight: 600 !important;
`;

const Stats: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { stats, loading, error } = useSelector((state: RootState) => state.songs);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

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
          Loading statistics...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Error: {error}</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Please try refreshing the page
        </Typography>
      </Box>
    );
  }

  if (!stats) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>No statistics available</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Add some songs to see statistics
        </Typography>
      </Box>
    );
  }

  // Find maximum values for progress bars
  const maxSongsPerGenre = Math.max(...stats.songsPerGenre.map(item => item.count), 0);
  const maxSongsPerArtist = Math.max(...stats.songsPerArtist.map(item => item.songs), 0);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, width: '100%', maxWidth: '100%' }}>
      {/* Header */}
      <StatsHeader>
        <StatsTitle variant="h3" theme={theme}>
          Music Statistics
        </StatsTitle>
        <StatsSubtitle variant="h6">
          Insights into your music collection
        </StatsSubtitle>
      </StatsHeader>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            sx={{ 
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.dark, 0.1)} 100%)`,
              color: 'white',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
            }}
          >
            <StatCardContent>
              <StatNumber>
                {stats.totals.songs}
              </StatNumber>
              <StatLabel>
                Total Songs
              </StatLabel>
              <MusicNoteIcon 
                sx={{ 
                  position: 'absolute', 
                  bottom: 10, 
                  right: 10, 
                  fontSize: 40,
                  opacity: 0.2,
                  color: theme.palette.primary.main
                }} 
              />
            </StatCardContent>
          </StatCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            sx={{ 
              background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.1)} 0%, ${alpha(theme.palette.info.dark, 0.1)} 100%)`,
              color: 'white',
              border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`
            }}
          >
            <StatCardContent>
              <StatNumber>
                {stats.totals.artists}
              </StatNumber>
              <StatLabel>
                Total Artists
              </StatLabel>
              <PersonIcon 
                sx={{ 
                  position: 'absolute', 
                  bottom: 10, 
                  right: 10, 
                  fontSize: 40,
                  opacity: 0.2,
                  color: theme.palette.info.main
                }} 
              />
            </StatCardContent>
          </StatCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            sx={{ 
              background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.dark, 0.1)} 100%)`,
              color: 'white',
              border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`
            }}
          >
            <StatCardContent>
              <StatNumber>
                {stats.totals.albums}
              </StatNumber>
              <StatLabel>
                Total Albums
              </StatLabel>
              <AlbumIcon 
                sx={{ 
                  position: 'absolute', 
                  bottom: 10, 
                  right: 10, 
                  fontSize: 40,
                  opacity: 0.2,
                  color: theme.palette.success.main
                }} 
              />
            </StatCardContent>
          </StatCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            sx={{ 
              background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)} 0%, ${alpha(theme.palette.warning.dark, 0.1)} 100%)`,
              color: 'white',
              border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`
            }}
          >
            <StatCardContent>
              <StatNumber>
                {stats.totals.genres}
              </StatNumber>
              <StatLabel>
                Total Genres
              </StatLabel>
              <LibraryMusicIcon 
                sx={{ 
                  position: 'absolute', 
                  bottom: 10, 
                  right: 10, 
                  fontSize: 40,
                  opacity: 0.2,
                  color: theme.palette.warning.main
                }} 
              />
            </StatCardContent>
          </StatCard>
        </Grid>
      </Grid>
      
      {/* Detailed Statistics */}
      <Grid container spacing={3}>
        {/* Songs by Genre */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: 3, 
            background: 'linear-gradient(135deg, #181818 0%, #121212 100%)', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent sx={{ 
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <SectionHeader>
                <BarChartIcon color="primary" />
                <SectionTitle variant="h6">
                  Songs by Genre
                </SectionTitle>
              </SectionHeader>
              
              {stats.songsPerGenre.length === 0 ? (
                <Typography color="textSecondary" sx={{ py: 2, textAlign: 'center' }}>
                  No genre data available
                </Typography>
              ) : (
                <Box sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Box sx={{ 
                    maxHeight: { xs: 300, md: 400 }, 
                    overflowY: 'auto',
                    pr: 1
                  }}>
                    {stats.songsPerGenre.map((item) => (
                      <GenreItem key={item.genre}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                          <GenreName variant="body2">
                            {item.genre}
                          </GenreName>
                          <GenreCount 
                            label={item.count} 
                            size="small"
                          />
                        </Box>
                        <GenreProgress 
                          variant="determinate" 
                          value={maxSongsPerGenre ? (item.count / maxSongsPerGenre) * 100 : 0}
                        />
                      </GenreItem>
                    ))}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Songs & Albums by Artist */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: 3, 
            background: 'linear-gradient(135deg, #181818 0%, #121212 100%)', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent sx={{ 
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <SectionHeader>
                <TrendingUpIcon color="primary" />
                <SectionTitle variant="h6">
                  Top Artists
                </SectionTitle>
              </SectionHeader>
              
              {stats.songsPerArtist.length === 0 ? (
                <Typography color="textSecondary" sx={{ py: 2, textAlign: 'center' }}>
                  No artist data available
                </Typography>
              ) : (
                <Box sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <TableContainer sx={{ 
                    maxHeight: { xs: 300, md: 400 }, 
                    overflowY: 'auto',
                    flexGrow: 1
                  }}>
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ 
                            color: '#b3b3b3', 
                            fontWeight: 600, 
                            backgroundColor: 'rgba(24, 24, 24, 0.9)',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1
                          }}>
                            Artist
                          </TableCell>
                          <TableCell align="right" sx={{ 
                            color: '#b3b3b3', 
                            fontWeight: 600,
                            backgroundColor: 'rgba(24, 24, 24, 0.9)',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1
                          }}>
                            Songs
                          </TableCell>
                          <TableCell align="right" sx={{ 
                            color: '#b3b3b3', 
                            fontWeight: 600,
                            backgroundColor: 'rgba(24, 24, 24, 0.9)',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1
                          }}>
                            Albums
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stats.songsPerArtist.map((item) => (
                          <ArtistRow key={item.artist}>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#ffffff' }}>
                                {item.artist}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Chip 
                                label={item.songs} 
                                size="small" 
                                sx={{ 
                                  backgroundColor: 'rgba(29, 185, 84, 0.1)',
                                  border: '1px solid rgba(29, 185, 84, 0.3)',
                                  color: '#1DB954',
                                  fontWeight: 600
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Chip 
                                label={item.albums} 
                                size="small" 
                                sx={{ 
                                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                  border: '1px solid rgba(255, 255, 255, 0.2)',
                                  color: '#ffffff',
                                  fontWeight: 600
                                }}
                              />
                            </TableCell>
                          </ArtistRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Songs by Album */}
        <Grid item xs={12}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: 3, 
            background: 'linear-gradient(135deg, #181818 0%, #121212 100%)', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 2,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent sx={{ 
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <SectionHeader>
                <AlbumIcon color="primary" />
                <SectionTitle variant="h6">
                  Songs by Album
                </SectionTitle>
              </SectionHeader>
              
              {stats.songsPerAlbum.length === 0 ? (
                <Typography color="textSecondary" sx={{ py: 2, textAlign: 'center' }}>
                  No album data available
                </Typography>
              ) : (
                <Box sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <TableContainer component={Paper} variant="outlined" sx={{ 
                    background: 'transparent', 
                    border: 'none',
                    maxHeight: { xs: 300, md: 400 },
                    overflowY: 'auto',
                    flexGrow: 1
                  }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ 
                            color: '#b3b3b3', 
                            fontWeight: 600,
                            backgroundColor: 'rgba(24, 24, 24, 0.9)',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1
                          }}>
                            Album
                          </TableCell>
                          <TableCell sx={{ 
                            color: '#b3b3b3', 
                            fontWeight: 600,
                            backgroundColor: 'rgba(24, 24, 24, 0.9)',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1
                          }}>
                            Artist
                          </TableCell>
                          <TableCell align="right" sx={{ 
                            color: '#b3b3b3', 
                            fontWeight: 600,
                            backgroundColor: 'rgba(24, 24, 24, 0.9)',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1
                          }}>
                            Songs
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stats.songsPerAlbum.map((item) => (
                          <AlbumRow key={item.album}>
                            <TableCell>
                              <AlbumTitle variant="body2">
                                {item.album}
                              </AlbumTitle>
                            </TableCell>
                            <TableCell>
                              <AlbumArtist variant="body2">
                                {item.artist}
                              </AlbumArtist>
                            </TableCell>
                            <TableCell align="right">
                              <AlbumCount 
                                label={item.count} 
                                size="small"
                              />
                            </TableCell>
                          </AlbumRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stats;