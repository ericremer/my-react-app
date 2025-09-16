export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🎬Betterboxd</h1>
      <p className="text-lg text-gray-600 mb-6">
        Track and review your favorite movies.  
      </p>
  <a
        href="/movies"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Browse Movies
      </a>
    </div>
  );
}
