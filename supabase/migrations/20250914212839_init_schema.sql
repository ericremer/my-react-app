-- Profiles (extra info about Supabase users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  role text default 'user',
  created_at timestamp default now()
);

-- Movies (only store the ones a user interacts with)
create table movies (
  id bigint primary key, -- TMDB id
  title text not null,
  poster_path text,
  release_date date
);

-- Logs (user logging they watched a movie + optional review)
create table logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  movie_id bigint references movies(id) on delete cascade,
  rating int check (rating between 1 and 10),
  review text,
  created_at timestamp default now()
);

-- User-Movie relationship (watchlist, favorites, status, etc.)
create table user_movies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  movie_id bigint references movies(id) on delete cascade,

  status text check (status in ('watchlist', 'watched')),
  is_watchlist boolean default false,
  is_loved boolean default false,
  is_hated boolean default false,

  created_at timestamp default now(),
  unique (user_id, movie_id) -- prevents duplicate entries
);
