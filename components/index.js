import { useState } from 'react';

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const audio = {
        name: file.name,
        length: file.duration
      };
      setPlaylist([...playlist, audio]);
    }
  };

  const handleRemove = (index) => {
    const updatedPlaylist = [...playlist];
    updatedPlaylist.splice(index, 1);
    setPlaylist(updatedPlaylist);
  };

  const calculateTotalTime = () => {
    const totalTime = playlist.reduce((total, audio) => total + audio.length, 0);
    return totalTime;
  };

  return (
    <div>
      <h1>Playlist App</h1>
      <div>
        <h2>Playlist</h2>
        <ul>
          {playlist.map((audio, index) => (
            <li key={index}>
              {audio.name} ({audio.length} seconds)
              <button onClick={() => handleRemove(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total Time: {calculateTotalTime()} seconds</p>
      </div>
      <div>
        <h2>Add Audio</h2>
        <input type="file" accept="audio/*" onChange={handleUpload} />
      </div>
    </div>
  );
};

export default Playlist;
