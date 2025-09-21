import type { ReactNode } from 'react';

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  totals: {
    songs: number;
    artists: number;
    albums: number;
    genres: number;
  };
  songsPerGenre: Array<{
    genre: string;
    count: number;
  }>;
  songsPerArtist: Array<{
    artist: string;
    songs: number;
    albums: number;
  }>;
  songsPerAlbum: Array<{
    album: string;
    count: number;
    artist: string;
  }>;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}

export interface CardProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}