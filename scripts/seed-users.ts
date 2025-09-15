import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";

// Pick env file based on CLI arg (default = local)
const mode = process.argv[2] || "local";
const envFile = mode === "prod" ? ".env.prod" : ".env";

console.log(`🔑 Loading environment from: ${envFile}`);
dotenv.config({ path: path.resolve(process.cwd(), envFile) });


// Helper for env vars
function getEnv(key: string): string | undefined {
  return process.env[key];
}

const SUPABASE_KEY =
  getEnv("SUPABASE_SECRET_KEY") || getEnv("VITE_SUPABASE_SERVICE_ROLE_KEY");

if (!process.env.VITE_SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Missing Supabase URL or secret key in env");
}

console.log("Loaded env from:", envFile);
console.log("VITE_SUPABASE_URL:", process.env.VITE_SUPABASE_URL);
console.log("Key starts with:", (SUPABASE_KEY || "").slice(0, 10) + "...");

const supabase = createClient(process.env.VITE_SUPABASE_URL, SUPABASE_KEY);

// Users to seed
const users = [
  {
    email: "admin@example.com",
    password: "adminpassword",
    username: "Administrator",
    role: "admin",
  },
  {
    email: "michael@example.com",
    password: "password123",
    username: "Michael Bluth",
    role: "user",
  },
  {
    email: "lindsay@example.com",
    password: "password123",
    username: "Lindsay Bluth",
    role: "user",
  },
  {
    email: "tobias@example.com",
    password: "password123",
    username: "Tobias Fünke",
    role: "user",
  },
];




async function seed() {
  for (const u of users) {
    console.log(`Creating user: ${u.email}`);
    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
    });

    if (error) {
      console.error(`❌ Failed to create user ${u.email}:`, error.message);
      continue;
    }

    const userId = data.user?.id;
    if (!userId) {
      console.error(`❌ No user ID returned for ${u.email}`);
      continue;
    }

    // Insert profile row
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        username: u.username,
        role: u.role,
      });

    if (profileError) {
      console.error(
        `❌ Failed to insert profile for ${u.email}:`,
        profileError.message
      );
    } else {
      console.log(`✅ Seeded ${u.email} (${u.role})`);
    }
  }
}


seed().then(async () => {
  console.log("Seeding finished.");
  const { data, error } = await supabase.auth.admin.listUsers();
  console.log(data, error);
  process.exit(0);
});
