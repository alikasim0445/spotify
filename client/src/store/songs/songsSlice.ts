import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Song, Stats } from '../../types';

// Action creators for songs
export const fetchSongs = {
  pending: () => ({ type: 'songs/fetchSongs/pending' }),
  fulfilled: (songs: Song[]) => ({ type: 'songs/fetchSongs/fulfilled', payload: songs }),
  rejected: (error: string) => ({ type: 'songs/fetchSongs/rejected', payload: error }),
};

export const addSong = {
  pending: (song: Omit<Song, '_id' | 'createdAt' | 'updatedAt'>) => ({ 
    type: 'songs/addSong/pending', 
    payload: song 
  }),
  fulfilled: (song: Song) => ({ type: 'songs/addSong/fulfilled', payload: song }),
  rejected: (error: string) => ({ type: 'songs/addSong/rejected', payload: error }),
};

export const updateSong = {
  pending: (payload: { id: string; song: Partial<Song> }) => ({ 
    type: 'songs/updateSong/pending', 
    payload 
  }),
  fulfilled: (song: Song) => ({ type: 'songs/updateSong/fulfilled', payload: song }),
  rejected: (error: string) => ({ type: 'songs/updateSong/rejected', payload: error }),
};

export const deleteSong = {
  pending: (id: string) => ({ type: 'songs/deleteSong/pending', payload: id }),
  fulfilled: (id: string) => ({ type: 'songs/deleteSong/fulfilled', payload: id }),
  rejected: (error: string) => ({ type: 'songs/deleteSong/rejected', payload: error }),
};

export const fetchStats = {
  pending: () => ({ type: 'songs/fetchStats/pending' }),
  fulfilled: (stats: Stats) => ({ type: 'songs/fetchStats/fulfilled', payload: stats }),
  rejected: (error: string) => ({ type: 'songs/fetchStats/rejected', payload: error }),
};

interface SongsState {
  songs: Song[];
  stats: Stats | null;
  loading: boolean;
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  stats: null,
  loading: false,
  error: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch songs
    builder
      .addCase('songs/fetchSongs/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('songs/fetchSongs/fulfilled', (state, action: PayloadAction<Song[]>) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase('songs/fetchSongs/rejected', (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch songs';
      });

    // Add song
    builder
      .addCase('songs/addSong/fulfilled', (state, action: PayloadAction<Song>) => {
        state.songs.unshift(action.payload);
      })
      .addCase('songs/addSong/rejected', (state, action) => {
        state.error = action.payload || 'Failed to add song';
      });

    // Update song
    builder
      .addCase('songs/updateSong/fulfilled', (state, action: PayloadAction<Song>) => {
        const index = state.songs.findIndex(song => song._id === action.payload._id);
        if (index !== -1) {
          state.songs[index] = action.payload;
        }
      })
      .addCase('songs/updateSong/rejected', (state, action) => {
        state.error = action.payload || 'Failed to update song';
      });

    // Delete song
    builder
      .addCase('songs/deleteSong/fulfilled', (state, action: PayloadAction<string>) => {
        state.songs = state.songs.filter(song => song._id !== action.payload);
      })
      .addCase('songs/deleteSong/rejected', (state, action) => {
        state.error = action.payload || 'Failed to delete song';
      });

    // Fetch stats
    builder
      .addCase('songs/fetchStats/fulfilled', (state, action: PayloadAction<Stats>) => {
        state.stats = action.payload;
      })
      .addCase('songs/fetchStats/rejected', (state, action) => {
        state.error = action.payload || 'Failed to fetch stats';
      });
  },
});

export const { clearError } = songsSlice.actions;
export default songsSlice.reducer;