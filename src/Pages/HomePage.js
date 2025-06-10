import React, { useState, useEffect, useRef, useCallback  } from "react";
import {
  FaHeart,
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaRedo,
} from "react-icons/fa";
import SidePanel from "../Components/sidePanel";
import Navbar from "../Components/navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex h-screen bg-black">
        <SidePanel />
        <MainPanel />
      </div>
    </div>
  );
}

const MainPanel = () => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
        setCurrentSong(data[0]);
        setCurrentIndex(0);
      })
      .catch((err) => console.error("Error fetching popular songs:", err));
  }, []);


  // Stable callback for playing next song
  const handleNextSong = useCallback(() => {
    if (!songs.length) return;
    const nextIndex = isShuffle
      ? Math.floor(Math.random() * songs.length)
      : (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    setCurrentSong(songs[nextIndex]);
  }, [songs, currentIndex, isShuffle]);

  // Play previous song
  const handlePreviousSong = () => {
    if (!songs.length) return;
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentSong(songs[prevIndex]);
  };

  useEffect(() => {
    if (currentSong && audioRef.current) {
      const audio = audioRef.current;
      console.log(audioRef.current);
      audio.src = `http://localhost:5000${currentSong.audioUrl}`;
      
      const playAudio = () => {
        if (isPlaying) {
          audio
            .play()
            .then(() => console.log("Audio playing..."))
            .catch((err) => console.warn("Autoplay blocked:", err));
        }
      };

      audio.addEventListener("canplay", playAudio);
      
      return () => {
        audio.removeEventListener("canplay", playAudio);
      };
    }
  }, [currentSong, isPlaying]);



  // Track progress & handle song end with repeat and next logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent || 0);
    };

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNextSong();
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isRepeat, currentIndex, songs, handleNextSong]);

  const handleSeek = (e) => {
    if (!progressBarRef.current || !audioRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newProgress = (x / rect.width) * 100;
    setProgress(newProgress);

    const duration = audioRef.current.duration;
    if (duration && !isNaN(duration) && isFinite(duration)) {
      audioRef.current.currentTime = (newProgress / 100) * duration;
    }
  };


  const handlePlaySong = (song) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (currentSong?.audioUrl === song.audioUrl) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch((err) => {
          console.warn("Play error:", err);
        });
        setIsPlaying(true);
      }
    } else {
      setCurrentSong(song);  // Will trigger useEffect
    }
  };



  // Filter songs by search term
  const filteredSongs = songs.filter((song) =>
    song?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen rounded-2xl bg-black2 text-white py-1 px-1">
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Section */}
        <div className="relative p-4 laptop:p-8 flex flex-col laptop:flex-row items-end laptop:items-center bg-gradient-to-b from-gray-700/50 to-gray-dark mobile:h-1/3 h-[30rem] gap-4 overflow-hidden transition-all duration-500 ease-in-out">
          <img
            key={currentSong ? currentSong.coverUrl : "default"}
            src={
              currentSong
                ? `http://localhost:5000${currentSong.coverUrl}`
                : "https://via.placeholder.com/800x400?text=No+Song+Selected"
            }
            alt={currentSong ? currentSong.title : "No Song Selected"}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 transition-opacity duration-500 ease-in-out"
          />
          <div className="relative z-10 my-4">
            <h2 className={`text-4xl laptop:text-6xl font-bold mb-2 transition-all duration-500 ease-in-out ${isPlaying ? "text-white" : "text-white"}`}>
              {currentSong ? currentSong.title : "Select a Song"}
            </h2>
            <p className="text-gray-400 text-lg transition-opacity duration-500 ease-in-out">
              {currentSong ? currentSong.artist : "No song playing"}
            </p>
          </div>
          {currentSong && (
            <button
              className="ml-auto bg-green-500 hover:bg-green-400 text-white px-6 py-2 rounded-full transition-transform duration-300 hover:scale-105"
              onClick={() => {
                audioRef.current.play();
                setIsPlaying(true);
              }}
            >
              Playing now...
            </button>
          )}
        </div>

        {/* Songs List */}
        <div className="p-8 space-y-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Popular Songs</h2>
              <input
                type="text"
                placeholder="Search songs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 text-white rounded-full px-4 py-2 w-3/4"
              />
            </div>

            <div>
              <div className="flex space-x-6 overflow-x-auto">
                {filteredSongs
                  .filter((song) => song.popularity === true)
                  .map((song, idx) => (
                    <div
                      key={idx}
                      className={`w-48 min-w-[12rem] h-60 rounded-lg p-4 flex flex-col justify-between cursor-pointer shadow-lg transform hover:scale-105 transition duration-300 ${
                        idx % 5 === 0
                          ? "bg-gradient-to-br from-pink-400 to-red-400"
                          : idx % 5 === 1
                          ? "bg-gradient-to-br from-blue-400 to-purple"
                          : idx % 5 === 2
                          ? "bg-gradient-to-br from-green-500 to-blue-400"
                          : idx % 5 === 3
                          ? "bg-gradient-to-br from-yellow to-pink-400"
                          : "bg-gradient-to-br from-green-500 to-orange-400"
                      }`}
                      onClick={() => handlePlaySong(song, idx)}
                    >
                      <img
                        src={`http://localhost:5000${song.coverUrl}`}
                        alt={song.title}
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                      <div className="text-white font-bold">{song.title}</div>
                      <div className="text-gray-200 text-sm">{song.artist}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Playlist Grid */}
          <div>
            <h3 className="text-2xl font-bold mb-4 mt-10">In playlists</h3>
            <div className="flex space-x-6 overflow-x-auto">
              {[
                { title: "Grunge Revolution", color: "bg-purple" },
                { title: "Sounds of the 90s", color: "bg-pink-400" },
                { title: "Darkness and Rebellion", color: "bg-gray-700" },
                { title: "Cult Rock Albums", color: "bg-mild-yellow" },
                { title: "Emotional Dark Moments", color: "bg-blue-400" },
              ].map((playlist, i) => (
                <div
                  key={i}
                  className={`w-40 h-40 rounded-lg flex items-center justify-center text-black font-bold text-center p-4 ${playlist.color} hover:opacity-90 transition duration-300`}
                >
                  {playlist.title}
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center space-x-4">
            {currentSong && (
              <>
                <img
                  src={
                    currentSong?.coverUrl
                      ? `http://localhost:5000${currentSong.coverUrl}`
                      : "https://via.placeholder.com/50"
                  }
                  alt={currentSong?.title || "No Title"}
                  className="w-12 h-12 object-cover rounded"
                />

                <div>
                  <div className="font-semibold">{currentSong.title}</div>
                  <div className="text-gray-400 text-sm">{currentSong.artist}</div>
                </div>
                <FaHeart className="text-gray-400 hover:text-pink-400 cursor-pointer ml-4" />
              </>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center space-y-2 w-[40%]">
            <div className="flex items-center space-x-6">
              <FaRandom
                className={`cursor-pointer ${isShuffle ? "text-green-400" : ""}`}
                onClick={() => setIsShuffle(!isShuffle)}
              />
              <FaStepBackward className="cursor-pointer" onClick={handlePreviousSong} />
              {isPlaying ? (
                <FaPause
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  }}
                />
              ) : (
                <FaPlay
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    audioRef.current
                      .play()
                      .then(() => setIsPlaying(true))
                      .catch((err) => console.warn("Play error:", err));
                  }}
                />
              )}

              <FaStepForward className="cursor-pointer" onClick={handleNextSong} />
              <FaRedo
                className={`cursor-pointer ${isRepeat ? "text-green-400" : ""}`}
                onClick={() => setIsRepeat(!isRepeat)}
              />
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-2 text-sm text-gray-400 w-full">
              <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
              <div
                ref={progressBarRef}
                className="flex-1 h-1 bg-gray-600 rounded relative cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="h-1 bg-white rounded absolute top-0 left-0"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span>{formatTime(audioRef.current?.duration || 0)}</span>
            </div>
          </div>

          {/* Extra Options */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white">T</button>
            <button className="text-gray-400 hover:text-white">...</button>
          </div>
        </div>

        <audio ref={audioRef} preload="metadata" />
      </main>
    </div>
  );
};

function formatTime(time) {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.floor(time % 60) || 0;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default Home;
