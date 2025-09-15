import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, role")
        .eq("id", user.id)
        .single();

      if (error) console.error(error);
      else setProfile(data);
    }
    loadProfile();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setProfile(null);
  }

  if (!profile) return <p className="mt-10 text-center">Not logged in</p>;

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-bold">Profile</h1>
      <p>
        <strong>Username:</strong> {profile.username}
      </p>
      <p>
        <strong>Role:</strong> {profile.role}
      </p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-gray-700 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
