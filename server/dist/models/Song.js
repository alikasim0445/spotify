import mongoose, { Schema } from 'mongoose';
const SongSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: String,
        required: true,
        trim: true
    },
    album: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});
export default mongoose.model('Song', SongSchema);
