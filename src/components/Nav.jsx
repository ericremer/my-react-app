// src/components/Nav.jsx
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="flex justify-between items-center py-4 px-3 bg-gray-900 text-white">
      <Link to="/" className="text-xl font-bold">🎬Betterboxd</Link>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/movies" className="hover:text-gray-300">Movies</Link>
        <Link to="/login" className="hover:text-gray-300">Login</Link>
      </div>
    </nav>
  );
}
