# FitHub

Full-stack fitness tracking app for logging workouts, creating workout templates, and tracking training progress.

## Tech Stack

- **Frontend**: React 19 + Vite
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Styling**: CSS with custom properties (mobile-first, responsive)

## Getting Started

```bash
npm install
npm run dev
```

## Screens

| Screen | Route | Description |
|---|---|---|
| Landing | `/` | Marketing page with feature overview |
| Sign Up | `/signup` | Account registration |
| Login | `/login` | User authentication |
| Dashboard | `/dashboard` | Home with stats, quick start, recent workouts |
| Templates | `/templates` | List of workout templates |
| Create Template | `/templates/new` | Build a new workout routine |
| Active Workout | `/workout/active` | Live workout logging with timer |
| Workout Detail | `/workout/:id` | View completed workout details |
| History | `/history` | All past workouts grouped by month |
| Profile | `/profile` | User profile and stats |
| Edit Profile | `/profile/edit` | Update name, email, photo |

## Navigation Flow

```
Landing → Sign Up / Login → Dashboard
                              ├── Quick Start → Active Workout → History
                              ├── Templates → Create Template
                              ├── History → Workout Detail
                              └── Profile → Edit Profile
```

Bottom navigation (mobile) / top navigation (desktop) provides access to:
Home, Workouts, History, Profile

## Project Structure

```
src/
├── components/       # Reusable UI components (Avatar, BottomNav, ExerciseSearch)
├── data/             # Mock data for development
├── layouts/          # App layout (with nav) and Auth layout
├── pages/            # All screen components
├── styles/           # Global CSS and design tokens
├── hooks/            # Custom hooks (ready for state management)
└── assets/           # Static assets
```
