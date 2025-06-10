import React, { useState } from "react";

const allArtists = [
  // Sample data; extend to 100+ entries
  { name: "Arijit Singh", category: "Bollywood", isPopular: true },
  { name: "Shreya Ghoshal", category: "Bollywood", isPopular: true },
  { name: "Sonu Nigam", category: "Bollywood", isPopular: false },
  { name: "Atif Aslam", category: "Bollywood", isPopular: true },
  { name: "Neha Kakkar", category: "Bollywood", isPopular: false },
  { name: "A. R. Rahman", category: "Bollywood", isPopular: true },
  { name: "Lata Mangeshkar", category: "Bollywood", isPopular: false },
  { name: "Rihanna", category: "Hollywood", isPopular: true },
  { name: "Drake", category: "Hollywood", isPopular: true },
  { name: "Taylor Swift", category: "Hollywood", isPopular: true },
  { name: "Billie Eilish", category: "Hollywood", isPopular: true },
  { name: "Ed Sheeran", category: "Hollywood", isPopular: true },
  { name: "Adele", category: "Hollywood", isPopular: false },
  { name: "Justin Bieber", category: "Hollywood", isPopular: false },
  { name: "The Weeknd", category: "Hollywood", isPopular: true },
  { name: "Katy Perry", category: "Hollywood", isPopular: false },
  { name: "R.D. Burman", category: "bollywood" },
  { name: "Shankar Mahadevan", category: "bollywood" },
  { name: "Vishal Dadlani", category: "bollywood" },
  { name: "Sukhwinder Singh", category: "bollywood" },
  { name: "Nusrat Fateh Ali Khan", category: "bollywood" },
  { name: "Rekha Bhardwaj", category: "bollywood" },
  { name: "Harshdeep Kaur", category: "bollywood" },
  { name: "Ankit Tiwari", category: "bollywood" },
  { name: "Palak Muchhal", category: "bollywood" },
  { name: "Mika Singh", category: "bollywood" },
  { name: "Lana Del Rey", category: "hollywood" },
  { name: "Miley Cyrus", category: "hollywood" },
  { name: "Sam Smith", category: "hollywood" },
  { name: "Avicii", category: "hollywood" },
  { name: "David Guetta", category: "hollywood" },
  { name: "Zedd", category: "hollywood" },
  { name: "Chainsmokers", category: "hollywood" },
  { name: "OneRepublic", category: "hollywood" },
  { name: "Jason Derulo", category: "hollywood" },
  { name: "Nicki Minaj", category: "hollywood" },
  { name: "Cardi B", category: "hollywood" },
  { name: "Doja Cat", category: "hollywood" },
  { name: "Lil Nas X", category: "hollywood" },
  { name: "21 Savage", category: "hollywood" },
  { name: "Chris Brown", category: "hollywood" },
  { name: "Tones and I", category: "hollywood" },
  { name: "Lizzo", category: "hollywood" },
  { name: "Khalid", category: "hollywood" },
  { name: "Meet Bros", category: "bollywood" },
  { name: "Amaal Mallik", category: "bollywood" },
  { name: "Tanishk Bagchi", category: "bollywood" },
  { name: "Tulsi Kumar", category: "bollywood" },
  { name: "Kanika Kapoor", category: "bollywood" },
  { name: "Aditya Narayan", category: "bollywood" },
  { name: "Neeti Mohan", category: "bollywood" },
  { name: "Pritam", category: "bollywood" },
  { name: "Armaan Malik", category: "bollywood" },
];



const ArtistsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArtists = allArtists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularArtists = allArtists.filter((artist) => artist.isPopular);

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-6xl font-semibold my-4 justify-center items-center flex flex-row">ARTISTS FROM ALL OVER THE WORLD</h1>

      <input
        type="text"
        placeholder="Search artists..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-gray-dark text-white rounded px-4 py-2 mb-6 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Popular Artists</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {popularArtists.map((artist, index) => (
            <div
              key={index}
              className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-center cursor-pointer"
            >
              {artist.name}
            </div>
          ))}
        </div>
      </div>

     
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Artists</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredArtists.map((artist, index) => (
            <div
              key={index}
              className="bg-gray-dark hover:bg-gray-700 p-4 rounded-lg text-center cursor-pointer"
            >
              {artist.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistsPage;
