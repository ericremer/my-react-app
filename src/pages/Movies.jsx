import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import MovieCard from "../components/MovieCard";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      const { data, error } = await supabase
        .from("movies")
        .select("id, title, poster_path, release_date")
        .order("release_date", { ascending: false });

      if (error) {
        console.error("Error fetching movies:", error);
      } else {
        setMovies(data || []);
      }
      setLoading(false);
    }

    fetchMovies();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
