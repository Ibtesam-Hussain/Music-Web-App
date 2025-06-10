const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  song_name: String,
  artist_name: String,
  duration: String,
  coverpic: String,
  audiolink: String,
  popularity: Boolean,
});

module.exports = mongoose.model('Song', SongSchema);