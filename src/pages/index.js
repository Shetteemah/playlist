import React, { useState } from 'react';
// import '../styles/globals.css';


const PlaylistPage = () => {
  const [playlist, setPlaylist] = useState([]);

  const addAudio = (file) => {
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);
    audio.addEventListener('loadedmetadata', () => {
      const newAudio = {
        name: file.name,
        length: Math.round(audio.duration),
        file: audio.src,
      };
      setPlaylist([...playlist, newAudio]);
    });
  };

  const removeAudio = (index) => {
    const updatedPlaylist = [...playlist];
    updatedPlaylist.splice(index, 1);
    setPlaylist(updatedPlaylist);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    if (seconds >= 3600) {
      const hours = Math.floor(seconds / 3600);
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const calculateTotalTime = () => {
    const totalTime = playlist.reduce((total, audio) => total + audio.length, 0);
    return formatTime(totalTime);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    addAudio(file);
  };

  return (
    <div className="bg-beige h-screen flex items-center justify-center">
      <div className="bg-opacity-75 bg-card rounded-lg p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-matt-orange">Playlist App</h1>
        <div className="playlist mb-6">
          <h2 className="text-2xl font-bold mb-2 text-matt-orange">Playlist</h2>
          {playlist.length > 0 ? (
            <ul className="text-lg">
              {playlist.map((audio, index) => (
                <li key={index} className="mb-2">
                  {audio.name} ({formatTime(audio.length)})
                  <button
                    className="ml-4 py-1 px-2 rounded bg-matt-orange text-white"
                    onClick={() => removeAudio(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No audio in the playlist.</p>
          )}
          <p className="text-total-time mt-2">Total Time: {calculateTotalTime()}</p>
        </div>
        <div className="add-audio">
          <h2 className="text-2xl font-bold mb-2 text-matt-orange">Add Audio</h2>
          <form>
            <label className="block text-lg mb-2">
              <p>Upload File</p> 
              <input
                type="file"
                accept="audio/*"
                className="mt-2"
                onChange={handleFileChange}
              />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
