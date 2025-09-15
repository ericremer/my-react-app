import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-white">
           🎬Betterboxd
          </Link>

          {/* Links */}
          <div className="flex space-x-4">
            <NavLink to="/" className={linkClasses} end>
              Home
            </NavLink>
            <NavLink to="/movies" className={linkClasses}>
              Movies
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
