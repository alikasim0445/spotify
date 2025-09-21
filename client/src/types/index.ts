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
  totalSongs: ReactNode;
  totalAlbums: ReactNode;
  totalArtists: ReactNode;
  totalGenres: ReactNode;
  totals: {
    songs: number;
    artists: number;
    albums: number;
    genres: number;
  };
  songsPerGenre: {
    genre: string;
    count: number;
  }[];
  songsPerArtist: {
    artist: string;
    songs: number;
    albums: number;
  }[];
  songsPerAlbum: {
    album: string;
    count: number;
    artist: string;
  }[];
}