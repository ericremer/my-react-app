import { useState, useEffect } from 'react';
import { supabase } from "./lib/supabaseClient";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import Movies from "./pages/Movies";
import './App.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top navigation bar */}
      <NavBar />

      {/* Page content */}
      <main className="p-6">
        <Routes>
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </main>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">🎬Betterboxd</h1>
        <p>A movie app that <b>doesn't</b> suck.</p>
        <Link to="/movies" className="text-blue-600 underline">
          Go to Movies
        </Link>
        {session ? <Profile /> : <Login />}
      </div>
    </div>
  );

}
