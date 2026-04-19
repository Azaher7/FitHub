import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Dumbbell, Target, LineChart, Flame, Sparkles,
  Apple, Bot, ArrowRight, CheckCircle, Clock,
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import DownloadButtons from '../components/DownloadButtons';
import useScrollReveal from '../hooks/useScrollReveal';
import './About.css';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1920&q=80&auto=format&fit=crop';
const MISSION_IMAGE = 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1200&q=80&auto=format&fit=crop';

const whatWeDo = [
  {
    icon: LineChart,
    title: 'Track real progress',
    desc: 'Log every set, rep, and weight. Build a long-term record of exactly how your strength is changing — without the bloat.',
  },
  {
    icon: Target,
    title: 'Stay consistent',
    desc: 'Templates, streaks, and a clean workflow make it easy to show up and train, even on the days motivation is thin.',
  },
  {
    icon: Flame,
    title: 'Train with intent',
    desc: 'See your last session at a glance so every workout is measured against the one before it. No guessing, only growth.',
  },
];

const comingSoon = [
  {
    icon: Bot,
    tag: 'FitHub Coach',
    title: 'Personalised programming',
    desc: 'A structured coaching layer that reviews your history, suggests the next block, and keeps you progressing past plateaus.',
  },
  {
    icon: Apple,
    tag: 'Calorie Tracker',
    title: 'Nutrition built for lifters',
    desc: 'A fast, minimal calorie and macro log — designed around training goals, not fad diets.',
  },
  {
    icon: Sparkles,
    tag: 'AI Support',
    title: 'Smart fitness assistance',
    desc: 'AI-powered insights, form cues, and adaptive recommendations that learn how you actually train.',
  },
];

export default function About() {
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <div className="about" ref={rootRef}>
      {/* Header */}
      <header className="landing-header">
        <div className="landing-header-inner">
          <Link to="/" className="landing-logo">
            <Dumbbell size={28} />
            <span>FitHub</span>
          </Link>
          <nav className="landing-nav">
            <Link to="/">Home</Link>
            <Link to="/about" className="is-active">About</Link>
            <Link to="/#features">Features</Link>
          </nav>
          <div className="landing-header-actions">
            <ThemeToggle />
            <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
            <Link to="/signup" className="btn btn-primary btn-sm">Sign up</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-image" aria-hidden="true" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="about-hero-content">
          <span className="about-eyebrow reveal">About FitHub</span>
          <h1 className="reveal" style={{ '--reveal-delay': '80ms' }}>
            Built by lifters.<br />
            <span className="about-hero-accent">For everyone who trains.</span>
          </h1>
          <p className="reveal" style={{ '--reveal-delay': '160ms' }}>
            FitHub is a fitness platform for people serious about getting better — a clean, focused home
            for your training that grows into a full suite of smart tools as the product evolves.
          </p>
          <div className="about-hero-stats reveal" style={{ '--reveal-delay': '240ms' }}>
            <div>
              <strong>10K+</strong>
              <span>Early-access lifters</span>
            </div>
            <div>
              <strong>500K+</strong>
              <span>Sets logged</span>
            </div>
            <div>
              <strong>2026</strong>
              <span>Full launch year</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="about-container about-mission-grid">
          <div className="about-mission-copy">
            <span className="section-label reveal">Our Mission</span>
            <h2 className="reveal" style={{ '--reveal-delay': '80ms' }}>
              Help every athlete train with clarity, confidence, and consistency.
            </h2>
            <p className="reveal" style={{ '--reveal-delay': '160ms' }}>
              Most fitness apps get in your way. FitHub stays out of it — start your session,
              log what you lifted, get back to training.
            </p>
            <p className="reveal" style={{ '--reveal-delay': '220ms' }}>
              Coaching, nutrition, and AI support are on the way, built on the same principle:
              useful when you need it, quiet when you don't.
            </p>
            <ul className="about-mission-list reveal" style={{ '--reveal-delay': '280ms' }}>
              <li><CheckCircle size={18} /> Make tracking effortless</li>
              <li><CheckCircle size={18} /> Respect your time and attention</li>
              <li><CheckCircle size={18} /> Build tools athletes actually use</li>
            </ul>
          </div>
          <div className="about-mission-visual reveal" style={{ '--reveal-delay': '160ms' }}>
            <img src={MISSION_IMAGE} alt="Athlete mid-training in a modern gym" loading="lazy" decoding="async" />
            <div className="about-mission-visual-overlay" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="about-what">
        <div className="about-container">
          <div className="section-label reveal">What We Do</div>
          <h2 className="section-title reveal" style={{ '--reveal-delay': '80ms' }}>
            A focused home for your training, today.
          </h2>
          <p className="section-desc reveal" style={{ '--reveal-delay': '160ms' }}>
            FitHub already helps thousands of lifters stay consistent. Here's what that looks like right now.
          </p>
          <div className="about-what-grid">
            {whatWeDo.map((item, i) => (
              <div
                key={item.title}
                className="about-what-card reveal"
                style={{ '--reveal-delay': `${i * 80}ms` }}
              >
                <div className="about-what-icon">
                  <item.icon size={22} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="about-soon">
        <div className="about-container">
          <div className="section-label reveal">
            <Clock size={14} aria-hidden="true" /> Coming Soon
          </div>
          <h2 className="section-title reveal" style={{ '--reveal-delay': '80ms' }}>
            What we're building next.
          </h2>
          <p className="section-desc reveal" style={{ '--reveal-delay': '160ms' }}>
            FitHub is still early. These are the pillars on the roadmap — signup today and you'll be
            first in line as each one ships.
          </p>
          <div className="about-soon-grid">
            {comingSoon.map((item, i) => (
              <div
                key={item.tag}
                className="about-soon-card reveal"
                style={{ '--reveal-delay': `${i * 100}ms` }}
              >
                <div className="about-soon-tag">
                  <item.icon size={14} />
                  <span>{item.tag}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="about-soon-status">In development</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-container about-cta-inner">
          <h2 className="reveal">Be part of the early cohort.</h2>
          <p className="reveal" style={{ '--reveal-delay': '80ms' }}>
            Claim your FitHub account now, start tracking, and get every new tool the moment it launches.
          </p>
          <div className="about-cta-actions reveal" style={{ '--reveal-delay': '160ms' }}>
            <Link to="/signup" className="btn btn-primary btn-lg">
              Create Free Account <ArrowRight size={18} />
            </Link>
            <Link to="/" className="btn btn-outline btn-lg">Back to home</Link>
          </div>
          <DownloadButtons variant="hero" className="about-cta-downloads reveal" />
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/" className="landing-logo">
              <Dumbbell size={22} />
              <span>FitHub</span>
            </Link>
            <p>Simple workout tracking for serious lifters.</p>
            <DownloadButtons variant="footer" className="footer-downloads" />
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Company</h4>
              <Link to="/about">About</Link>
              <Link to="/#features">Features</Link>
              <Link to="/#how-it-works">How It Works</Link>
            </div>
            <div className="footer-col">
              <h4>Account</h4>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 FitHub. Built for lifters, by lifters.</p>
        </div>
      </footer>
    </div>
  );
}
