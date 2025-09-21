import mongoose from 'mongoose';
import Song from './models/Song.js';

// Ethiopian song data
const ethiopianSongs = [
  {
    title: 'Tezeta',
    artist: 'Mulatu Astatke',
    album: 'Ethiopian Jazz Series Vol. 1',
    genre: 'Ethio-Jazz'
  },
  {
    title: 'Yekermo Sew',
    artist: 'Krystal',
    album: 'Alebel',
    genre: 'Ethiopian Pop'
  },
  {
    title: 'Tizita',
    artist: 'Alemayehu Eshete',
    album: 'Golden Hits',
    genre: 'Ethiopian Traditional'
  },
  {
    title: 'Minilik',
    artist: 'Tilahun Gessesse',
    album: 'Legendary Voice',
    genre: 'Ethiopian Traditional'
  },
  {
    title: 'Sof Sof',
    artist: 'Neway Debebe',
    album: 'Classic Love Songs',
    genre: 'Ethiopian Pop'
  },
  {
    title: 'Kululaye',
    artist: 'Girma Beyene',
    album: 'Highland Melodies',
    genre: 'Ethiopian Folk'
  },
  {
    title: 'Hagere',
    artist: 'Teddy Afro',
    album: 'Tikur Sew',
    genre: 'Ethiopian Reggae'
  },
  {
    title: 'Ayalilem',
    artist: 'Micky Bekele',
    album: 'Modern Hits',
    genre: 'Ethiopian Pop'
  },
  {
    title: 'Konjit',
    artist: 'Ali Mohammed Birra',
    album: 'Oromo Classics',
    genre: 'Oromo Music'
  },
  {
    title: 'Anchiwoch',
    artist: 'Elias Melka',
    album: 'Instrumental Masterpieces',
    genre: 'Ethio-Jazz'
  },
  {
    title: 'Ene Nigist Amma',
    artist: 'Mahmoud Ahmed',
    album: 'Erè Mèla',
    genre: 'Ethiopian Soul'
  },
  {
    title: 'Yetsegelel',
    artist: 'Bereket Mengisteab',
    album: 'Contemporary Hits',
    genre: 'Ethiopian Pop'
  }
];

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/spotify';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing songs
    await Song.deleteMany({});
    console.log('Cleared existing songs');

    // Insert new songs
    const insertedSongs = await Song.insertMany(ethiopianSongs);
    console.log(`Inserted ${insertedSongs.length} Ethiopian songs into the database`);

    // Display inserted songs
    console.log('\nInserted Songs:');
    insertedSongs.forEach((song: any, index: number) => {
      console.log(`${index + 1}. ${song.title} by ${song.artist} from album ${song.album} (${song.genre})`);
    });

    console.log('\nDatabase seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();