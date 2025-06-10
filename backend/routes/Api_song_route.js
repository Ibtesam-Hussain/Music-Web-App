const express = require("express");
const Song = require("../models/Songs");
const router = express.Router();



// GET all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();

    // Map songs to include URLs for audio and cover images accessible via server
    const songsWithPaths = songs.map(song => ({
      title: song.song_name,
      artist: song.artist_name,
      duration: song.duration,
      audioUrl: `/uploads/audios/${encodeURIComponent(song.audiolink)}`,
      coverUrl: `/uploads/covers/${encodeURIComponent(song.coverpic)}`,
      popularity: song.popularity
    }));

    res.json(songsWithPaths);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});


// // GET popular songs
// router.get("/popular", async (req, res) => {
//   try {
//     const popularSongs = await Song.find({ popularity: true });

//     const songsWithPaths = popularSongs.map(song => ({
//       title: song.song_name,
//       artist: song.artist_name,
//       duration: song.duration,
//       audioUrl: `/uploads/audios/${encodeURIComponent(song.audiolink)}`,
//       coverUrl: `/uploads/covers/${encodeURIComponent(song.coverpic)}`
//     }));

//     res.json(songsWithPaths);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch popular songs" });
//   }
// });



module.exports = router;
