import Song from '../models/Song.js';
// Get all songs
export const getSongs = async (req, res) => {
    try {
        const songs = await Song.find().sort({ createdAt: -1 });
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching songs', error });
    }
};
// Get song by ID
export const getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            res.status(404).json({ message: 'Song not found' });
            return;
        }
        res.status(200).json(song);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching song', error });
    }
};
// Create a new song
export const createSong = async (req, res) => {
    try {
        const { title, artist, album, genre } = req.body;
        // Validate required fields
        if (!title || !artist || !album || !genre) {
            res.status(400).json({ message: 'Title, artist, album, and genre are required' });
            return;
        }
        const song = new Song({
            title,
            artist,
            album,
            genre
        });
        const savedSong = await song.save();
        res.status(201).json(savedSong);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating song', error });
    }
};
// Update a song
export const updateSong = async (req, res) => {
    try {
        const { title, artist, album, genre } = req.body;
        const song = await Song.findByIdAndUpdate(req.params.id, { title, artist, album, genre }, { new: true, runValidators: true });
        if (!song) {
            res.status(404).json({ message: 'Song not found' });
            return;
        }
        res.status(200).json(song);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating song', error });
    }
};
// Delete a song
export const deleteSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndDelete(req.params.id);
        if (!song) {
            res.status(404).json({ message: 'Song not found' });
            return;
        }
        res.status(200).json({ message: 'Song deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting song', error });
    }
};
// Get statistics
export const getStats = async (req, res) => {
    try {
        // Total counts
        const totalSongs = await Song.countDocuments();
        // Distinct counts
        const totalArtists = (await Song.distinct('artist')).length;
        const totalAlbums = (await Song.distinct('album')).length;
        const totalGenres = (await Song.distinct('genre')).length;
        // Songs per genre
        const songsPerGenre = await Song.aggregate([
            {
                $group: {
                    _id: '$genre',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    genre: '$_id',
                    count: 1
                }
            }
        ]);
        // Songs and albums per artist
        const songsPerArtist = await Song.aggregate([
            {
                $group: {
                    _id: '$artist',
                    songs: { $sum: 1 },
                    albums: { $addToSet: '$album' }
                }
            },
            {
                $project: {
                    _id: 0,
                    artist: '$_id',
                    songs: 1,
                    albums: { $size: '$albums' }
                }
            }
        ]);
        // Songs per album
        const songsPerAlbum = await Song.aggregate([
            {
                $group: {
                    _id: '$album',
                    count: { $sum: 1 },
                    artist: { $first: '$artist' }
                }
            },
            {
                $project: {
                    _id: 0,
                    album: '$_id',
                    count: 1,
                    artist: 1
                }
            }
        ]);
        res.status(200).json({
            totals: {
                songs: totalSongs,
                artists: totalArtists,
                albums: totalAlbums,
                genres: totalGenres
            },
            songsPerGenre,
            songsPerArtist,
            songsPerAlbum
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error });
    }
};
