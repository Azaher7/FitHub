-- FitHub — Supabase schema for early-access signup
--
-- Run this once in your Supabase project (SQL editor) to set up the profiles
-- table that stores the username captured at signup. Email + password are
-- handled by Supabase Auth in auth.users automatically.
--
-- Also confirm: Project Settings → Authentication → Providers → Email is ON.

-- 1. profiles table (one row per auth user)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  firstname text not null,
  lastname text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- 2. Row Level Security — users can read/update only their own profile
drop policy if exists "Profiles are viewable by owner" on public.profiles;
create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 3. Trigger: when a new auth.users row is created, insert a matching profile
-- using the username supplied in user_metadata at signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
