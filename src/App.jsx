import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import Landing from './pages/Landing';
import About from './pages/About';
import ThankYou from './pages/ThankYou';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AuthConfirm from './pages/AuthConfirm';
import AlreadySignedUp from './pages/AlreadySignedUp';
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';
import CreateTemplate from './pages/CreateTemplate';
import WorkoutDetail from './pages/WorkoutDetail';
import ActiveWorkout from './pages/ActiveWorkout';
import History from './pages/History';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/thank-you" element={<ThankYou />} />

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/confirm" element={<AuthConfirm />} />
          <Route path="/already-signed-up" element={<AlreadySignedUp />} />
        </Route>

        {/* App routes (authenticated) */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/new" element={<CreateTemplate />} />
          <Route path="/templates/:id" element={<WorkoutDetail />} />
          <Route path="/workout/active" element={<ActiveWorkout />} />
          <Route path="/workout/:id" element={<WorkoutDetail />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
