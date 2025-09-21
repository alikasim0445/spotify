import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Song, Stats } from '../../types';
import * as songsApi from '../../api/songsApi';

// Async thunks
export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs',
  async () => {
    const response = await songsApi.fetchSongs();
    return response;
  }
);

export const addSong = createAsyncThunk(
  'songs/addSong',
  async (song: Omit<Song, '_id' | 'createdAt' | 'updatedAt'>) => {
    const response = await songsApi.createSong(song);
    return response;
  }
);

export const updateSong = createAsyncThunk(
  'songs/updateSong',
  async ({ id, song }: { id: string; song: Partial<Song> }) => {
    const response = await songsApi.updateSong(id, song);
    return response;
  }
);

export const deleteSong = createAsyncThunk(
  'songs/deleteSong',
  async (id: string) => {
    await songsApi.deleteSong(id);
    return id;
  }
);

export const fetchStats = createAsyncThunk(
  'songs/fetchStats',
  async () => {
    const response = await songsApi.fetchStats();
    return response;
  }
);

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
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action: PayloadAction<Song[]>) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch songs';
      });

    // Add song
    builder
      .addCase(addSong.fulfilled, (state, action: PayloadAction<Song>) => {
        state.songs.unshift(action.payload);
      })
      .addCase(addSong.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add song';
      });

    // Update song
    builder
      .addCase(updateSong.fulfilled, (state, action: PayloadAction<Song>) => {
        const index = state.songs.findIndex(song => song._id === action.payload._id);
        if (index !== -1) {
          state.songs[index] = action.payload;
        }
      })
      .addCase(updateSong.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update song';
      });

    // Delete song
    builder
      .addCase(deleteSong.fulfilled, (state, action: PayloadAction<string>) => {
        state.songs = state.songs.filter(song => song._id !== action.payload);
      })
      .addCase(deleteSong.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete song';
      });

    // Fetch stats
    builder
      .addCase(fetchStats.fulfilled, (state, action: PayloadAction<Stats>) => {
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch stats';
      });
  },
});

export const { clearError } = songsSlice.actions;
export default songsSlice.reducer;