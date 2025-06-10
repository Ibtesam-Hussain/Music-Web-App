import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const audioRef = useRef(new Audio());

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  useEffect(() => {
    if (userEmail) {
      const stored = JSON.parse(localStorage.getItem(`favorites_${userEmail}`)) || [];
      setFavorites(stored);
    }
  }, [userEmail]);

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const handlePlayPause = (song) => {
    const audio = audioRef.current;

    if (currentSong?.audioUrl === song.audioUrl) {
      isPlaying ? audio.pause() : audio.play();
      setIsPlaying(!isPlaying);
    } else {
      audio.src = `http://localhost:5000${song.audioUrl}`;
      audio.play();
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const handleForward = () => {
    audioRef.current.currentTime += 5;
  };

  const handleBackward = () => {
    audioRef.current.currentTime -= 5;
  };

  const toggleFavorite = (song) => {
    if (!userEmail) return;

    let updatedFavorites;
    const isFav = favorites.some((fav) => fav.audioUrl === song.audioUrl);

    if (isFav) {
      updatedFavorites = favorites.filter((fav) => fav.audioUrl !== song.audioUrl);
    } else {
      updatedFavorites = [
        ...favorites,
        {
          songName: song.title,
          artist: song.artist,
          duration: song.duration,
          coverPic: `http://localhost:5000${song.coverUrl}`,
          audioUrl: song.audioUrl,
        },
      ];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${userEmail}`, JSON.stringify(updatedFavorites));
  };

  const isFavorite = (song) => {
    return favorites.some((fav) => fav.audioUrl === song.audioUrl);
  };

  const filteredSongs = songs.filter((song) => {
    const title = song.title?.toLowerCase() || '';
    const artist = song.artist?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    return title.includes(query) || artist.includes(query);
  });


  return (
    <div className="p-4 space-y-6 bg-black min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-4">All Songs</h2>

      <input
        type="text"
        placeholder="Search by title or artist..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <div className="space-y-4">
        {filteredSongs.map((song, index) => {
          const isCurrent = currentSong?.audioUrl === song.audioUrl && isPlaying;

          return (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all ${
                isCurrent ? "bg-green-500" : "bg-gray-700 hover:bg-gray-dark"
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:5000${song.coverUrl}`}
                  alt={song.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <div className={`text-lg font-semibold ${isCurrent ? "text-black" : "text-white"}`}>
                    {song.title}
                  </div>
                  <div className={`text-sm ${isCurrent ? "text-black" : "text-gray-400"}`}>
                    {song.artist}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleFavorite(song)}
                  className={`text-2xl ${isCurrent ? "text-black" : "text-red-600"}`}
                >
                  {isFavorite(song) ? <AiFillHeart /> : <AiOutlineHeart />}
                </button>

                <button
                  onClick={handleBackward}
                  className={`text-xl ${isCurrent ? "text-black hover:text-gray-800" : "text-gray-400 hover:text-white"}`}
                >
                  <FaBackward />
                </button>

                <button
                  onClick={() => handlePlayPause(song)}
                  className={`text-2xl ${isCurrent ? "text-black hover:text-gray-800" : "text-gray-400 hover:text-white"}`}
                >
                  {isCurrent && isPlaying ? <FaPause /> : <FaPlay />}
                </button>

                <button
                  onClick={handleForward}
                  className={`text-xl ${isCurrent ? "text-black hover:text-gray-800" : "text-gray-400 hover:text-white"}`}
                >
                  <FaForward />
                </button>
              </div>
            </div>
          );
        })}
        {filteredSongs.length === 0 && (
          <div className="text-center text-gray-400">No songs found.</div>
        )}
      </div>
    </div>
  );
};

export default SongsPage;
