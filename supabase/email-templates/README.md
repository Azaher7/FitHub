# Supabase email templates

Branded FitHub email templates. These can't be committed to the project — they
have to be pasted into the Supabase dashboard.

## One-time setup

1. **Paste the confirm-signup template**
   - Open the Supabase dashboard → **Authentication → Email Templates → Confirm signup**.
   - Copy the full contents of `confirm-signup.html` (in this folder) into the template body.
   - Set the **Subject** to something like: `Confirm your FitHub account`.
   - Save.

2. **Allow-list the redirect URL**
   - Dashboard → **Authentication → URL Configuration → Redirect URLs**.
   - Add both:
     - `http://localhost:5173/auth/confirm`
     - `https://<your-production-domain>/auth/confirm`
   - Save.

3. **Re-run the schema**
   - Dashboard → **SQL Editor** → paste the contents of `../schema.sql` and run it.
   - The `handle_new_user()` trigger now reads `firstname`, `lastname`, and
     `username` out of `raw_user_meta_data`, so every new signup inserts a
     matching row into `public.profiles`.

## Template variables used

- `{{ .ConfirmationURL }}` — Supabase fills this in with the one-time confirm link.
- `{{ .Email }}` — the email the user signed up with.

No other variables are referenced, so the template drops in without edits.
