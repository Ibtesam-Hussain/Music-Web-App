import React from "react";

const playlists = [
  {
    name: "Bollywood Hits",
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK4ylweUyLZnQOC3JikNlyxZpGODSFJTVtpw&s",
    listeners: 9500,
  },
  {
    name: "Hollywood Vibes",
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTSTkWGg3s4jZPh3AuDa1pSfC42cn5triQJw&s",
    listeners: 8700,
  },
  {
    name: "Workout Mix",
    coverImage:
      "https://i.ytimg.com/vi/kNDir9J3v4M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBIL-lpbOHIF10VC32d1pqpAELgig",
    listeners: 6200,
  },
  {
    name: "Romantic Melodies",
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ9aL0k7KdB9kzU_waz6aEsVlmMJ3JJiR4QA&s",
    listeners: 7800,
  },
  {
    name: "Top EDM",
    coverImage:
      "https://cdn-knopn.nitrocdn.com/VmDthQfAFPBEcyNNXANVOfbgjTukBfpx/assets/images/optimized/rev-4f3df46/exoduslasvegas.com/wp-content/uploads/2023/03/Featured-1-730x487.jpg",
    listeners: 10100,
  },
  {
    name: "Lofi Chill",
    coverImage:
      "https://i.ytimg.com/vi/NH0rWI0iCqU/maxresdefault.jpg",
    listeners: 11200,
  },
  // Add more playlists as needed
];

const PlaylistsPage = () => {
  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">All Playlists</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl transition-all duration-300"
          >
            <img
              src={playlist.coverImage}
              alt={playlist.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold">{playlist.name}</h2>
            <p className="text-sm text-gray-300">
              {playlist.listeners.toLocaleString()} listeners
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistsPage;
