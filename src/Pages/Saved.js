import React, { useEffect, useState } from "react";

const SavedPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user?.email;

    if (userEmail) {
      const saved = JSON.parse(localStorage.getItem(`favorites_${userEmail}`)) || [];
      setFavorites(saved);
    }
  }, []);

  const removeFromFavorites = (songName) => {
    const updated = favorites.filter((song) => song.songName !== songName);
    setFavorites(updated);

    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user?.email;

    if (userEmail) {
      localStorage.setItem(`favorites_${userEmail}`, JSON.stringify(updated));
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-6xl mb-4 text-white flex justify-center">Saved Songs</h2>
      {favorites.length === 0 ? (
        <p className="text-3xl flex justify-center">No favorite songs yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {favorites.map((song, index) => (
            <div key={index} className="bg-gray-dark p-4 rounded shadow">
              <img
                src={song.coverPic}
                alt={song.songName}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{song.songName}</h3>
              <p className="text-sm text-gray-400">{song.artist}</p>
              <div className="flex justify-between items-center mt-2">
                <span>{song.duration}</span>
                <button onClick={() => removeFromFavorites(song.songName)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPage;
