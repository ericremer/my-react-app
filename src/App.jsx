import { useState, useEffect } from 'react';
import './App.css';


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    if (!query) return;
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setMovies(data.results);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies();
  };

  const consoleLog = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/238?api_key=${API_KEY}`);
    const data = await res.json();
    console.log(data);
  }

  
  consoleLog();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🎬 Betterboxd</h1>
      <h3>A movie app that <i><u>doesn't</u></i> suck.</h3>
      <br></br>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>
          Search
        </button>
      </form>

      <div style={{ marginTop: "2rem" }}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} style={{ marginBottom: "1rem" }}>
              <strong>{movie.title}</strong> ({movie.release_date?.slice(0, 4)})
            </div>
          ))
        ) : (
          <p>No results yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;