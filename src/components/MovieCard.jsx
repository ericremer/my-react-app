export default function MovieCard({ movie }) {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md bg-gray-900">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-[300px] bg-gray-700 flex items-center justify-center text-gray-400">
          No Poster
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <p className="text-white text-sm font-semibold truncate">
          {movie.title}
        </p>
        <p className="text-gray-300 text-xs">
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : ""}
        </p>
      </div>
    </div>
  );
}
