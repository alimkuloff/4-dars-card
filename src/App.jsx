import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; 

const App = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/shows')
      .then(response => {
        setShows(response.data);
      })
      .catch(error => {
        console.error('Ma\'lumotlarni olishda xato:', error);
      });
  }, []);

  return (
    <div className="app">
      <h1>TV Shows</h1>
      <div className="card-container">
        {shows.map(show => (
          <div key={show.id} className="card">
            <img src={show.image?.medium} alt={show.name} />
            <div className="card-content">
              <h2>{show.name}</h2>
              <p><strong>Genre:</strong> {show.genres.join(', ')}</p>
              <p><strong>Language:</strong> {show.language}</p>
              <p><strong>Premiered:</strong> {show.premiered}</p>
              <p><strong>Rating:</strong> {show.rating.average || 'N/A'}</p>
              <p><strong>Summary:</strong> {show.summary.replace(/<\/?[^>]+(>|$)/g, "")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
