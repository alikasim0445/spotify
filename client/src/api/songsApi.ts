import axios from 'axios';
import type { Song, Stats } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Songs API
export const fetchSongs = async (): Promise<Song[]> => {
  const response = await api.get('/songs');
  return response.data;
};

export const fetchSongById = async (id: string): Promise<Song> => {
  const response = await api.get(`/songs/${id}`);
  return response.data;
};

export const createSong = async (song: Omit<Song, '_id' | 'createdAt' | 'updatedAt'>): Promise<Song> => {
  const response = await api.post('/songs', song);
  return response.data;
};

export const updateSong = async (id: string, song: Partial<Song>): Promise<Song> => {
  const response = await api.put(`/songs/${id}`, song);
  return response.data;
};

export const deleteSong = async (id: string): Promise<void> => {
  await api.delete(`/songs/${id}`);
};

// Stats API
export const fetchStats = async (): Promise<Stats> => {
  const response = await api.get('/stats');
  return response.data;
};