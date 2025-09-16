import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";
import fetch from "node-fetch"; // install if not available

// Pick env file based on CLI arg (default = local)
const mode = process.argv[2] || "local";
const envFile = mode === "prod" ? ".env.prod" : ".env";

console.log(`🔑 Loading environment from: ${envFile}`);
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Helper for env vars
function getEnv(key: string): string | undefined {
  return process.env[key];
}
const SUPABASE_KEY = getEnv("VITE_SUPABASE_SECRET_KEY") || getEnv("VITE_SUPABASE_SERVICE_ROLE_KEY");
console.log("Loaded env from:", envFile);
console.log("VITE_SUPABASE_URL:", process.env.VITE_SUPABASE_URL);
console.log("Key starts with:", (SUPABASE_KEY || "").slice(0, 10) + "...");

if (!process.env.VITE_SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Missing Supabase URL or secret key in env");
}

const supabase = createClient(process.env.VITE_SUPABASE_URL, SUPABASE_KEY);

async function seedMovies() {
  console.log("Fetching TMDB movies…");

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.VITE_TMDB_API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();

  const movies = data.results.map((m) => ({
    id: m.id, // TMDB id
    title: m.title,
    poster_path: m.poster_path,
    release_date: m.release_date || null,
  }));

  console.log(`Inserting ${movies.length} movies…`);

  const { error } = await supabase.from("movies").upsert(movies, {
    onConflict: "id",
  });

  if (error) {
    console.error("❌ Failed to seed movies:", error);
  } else {
    console.log("✅ Seeded movies successfully");
  }
}

seedMovies().then(() => process.exit());
