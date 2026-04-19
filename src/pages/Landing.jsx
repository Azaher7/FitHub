import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Dumbbell, BarChart3, Clock, Zap, CheckCircle,
  Star, Trophy, ArrowRight,
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import DownloadButtons from '../components/DownloadButtons';
import useScrollReveal from '../hooks/useScrollReveal';
import './Landing.css';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80&auto=format&fit=crop';
const FEATURE_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1200&q=80&auto=format&fit=crop',
    alt: 'Athlete performing a heavy barbell lift',
    caption: 'Built for real training.',
  },
  {
    src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900&q=80&auto=format&fit=crop',
    alt: 'Rack of dumbbells in a modern gym',
    caption: 'Track every session.',
  },
  {
    src: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=900&q=80&auto=format&fit=crop',
    alt: 'Woman training with kettlebells',
    caption: 'Move with intent.',
  },
];
const SHOWCASE_IMAGE = 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1920&q=80&auto=format&fit=crop';

const features = [
  {
    icon: Dumbbell,
    title: 'Workout Templates',
    desc: 'Build reusable routines. Tap once to start your favorite workout — no setup needed.',
  },
  {
    icon: BarChart3,
    title: 'Log Sets, Reps & Weight',
    desc: 'Track every rep in real time. See exactly what you lifted and watch your numbers climb.',
  },
  {
    icon: Clock,
    title: 'Full Workout History',
    desc: 'Every session saved. Scroll back to any workout and know exactly what you did.',
  },
  {
    icon: Zap,
    title: 'Built for Speed',
    desc: 'No bloat. No ads. No fluff. Just a clean, fast tool that stays out of your way.',
  },
];

const stats = [
  { value: '10K+', label: 'Active Lifters' },
  { value: '500K+', label: 'Workouts Logged' },
  { value: '4.9', label: 'App Rating' },
  { value: '100%', label: 'Free to Use' },
];

const testimonials = [
  {
    name: 'Marcus R.',
    role: 'Powerlifter',
    text: "Finally an app that doesn't try to do everything. I open it, log my sets, and I'm done. Best workout tracker I've used.",
    rating: 5,
  },
  {
    name: 'Sarah K.',
    role: 'CrossFit Athlete',
    text: "I love how fast it is to start a workout from a template. No more scrolling through notes on my phone between sets.",
    rating: 5,
  },
  {
    name: 'James T.',
    role: 'Bodybuilder',
    text: "The workout history is a game changer. I can see exactly what weight I hit last week and push for more every session.",
    rating: 5,
  },
];

const steps = [
  { num: '01', title: 'Create a Template', desc: 'Pick your exercises, set your rep targets.' },
  { num: '02', title: 'Start Your Workout', desc: 'One tap to begin. The timer starts automatically.' },
  { num: '03', title: 'Log as You Lift', desc: 'Enter weight and reps after each set. Check it off.' },
  { num: '04', title: 'Review & Repeat', desc: 'See your full history. Beat your last session.' },
];

export default function Landing() {
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <div className="landing" ref={rootRef}>
      {/* Header */}
      <header className="landing-header">
        <div className="landing-header-inner">
          <div className="landing-logo">
            <Dumbbell size={28} />
            <span>FitHub</span>
          </div>
          <nav className="landing-nav">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#testimonials">Reviews</a>
            <Link to="/about">About</Link>
          </nav>
          <div className="landing-header-actions">
            <ThemeToggle />
            <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
            <Link to="/signup" className="btn btn-primary btn-sm">Sign up</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-image" aria-hidden="true" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="hero-bg" />
        <div className="hero-content">
          <span className="hero-badge reveal" style={{ '--reveal-delay': '0ms' }}>
            <Trophy size={14} /> #1 Free Workout Tracker
          </span>
          <h1 className="reveal" style={{ '--reveal-delay': '80ms' }}>
            Your Workouts.<br />Your Progress.<br /><span className="hero-accent">Your Way.</span>
          </h1>
          <p className="reveal" style={{ '--reveal-delay': '160ms' }}>
            The simplest, fastest way to log your training. Create templates, track every set,
            and never wonder what you lifted last time.
          </p>
          <div className="hero-actions reveal" style={{ '--reveal-delay': '240ms' }}>
            <Link to="/signup" className="btn btn-primary btn-lg">
              Start Training Free <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg">
              I Have an Account
            </Link>
          </div>
          <DownloadButtons
            variant="hero"
            className="hero-downloads reveal"
          />
          <div className="hero-proof reveal" style={{ '--reveal-delay': '400ms' }}>
            <div className="hero-avatars">
              <div className="hero-avatar">M</div>
              <div className="hero-avatar">S</div>
              <div className="hero-avatar">J</div>
              <div className="hero-avatar">A</div>
              <div className="hero-avatar">+</div>
            </div>
            <p>Joined by <strong>10,000+</strong> lifters worldwide</p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="stats-bar-inner">
          {stats.map((stat) => (
            <div key={stat.label} className="stats-bar-item">
              <span className="stats-bar-value">{stat.value}</span>
              <span className="stats-bar-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="section-container">
          <div className="section-label reveal">Features</div>
          <h2 className="section-title reveal" style={{ '--reveal-delay': '80ms' }}>
            Everything you need.<br />Nothing you don't.
          </h2>
          <p className="section-desc reveal" style={{ '--reveal-delay': '160ms' }}>
            Made for people who actually lift. Fast to log, easy to read, yours to keep.
          </p>
          <div className="features-visual reveal" style={{ '--reveal-delay': '200ms' }}>
            {FEATURE_IMAGES.map((img, i) => (
              <figure key={img.src} className={`features-visual-item features-visual-item-${i}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{img.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="feature-card reveal"
                style={{ '--reveal-delay': `${i * 80}ms` }}
              >
                <div className="feature-icon-wrap">
                  <f.icon size={24} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase band — full-bleed visual break between sections */}
      <section className="showcase-band" aria-label="FitHub in action">
        <img
          src={SHOWCASE_IMAGE}
          alt="Lifter mid-set inside a high-contrast gym"
          loading="lazy"
          decoding="async"
        />
        <div className="showcase-band-overlay" aria-hidden="true" />
        <div className="showcase-band-content reveal">
          <span className="showcase-band-eyebrow">Train with purpose</span>
          <h3>Lift. Log. Level up.</h3>
          <p>Every rep you record makes the next session sharper. FitHub keeps your training on record so progress never goes missing.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section" id="how-it-works">
        <div className="section-container">
          <div className="section-label reveal">How It Works</div>
          <h2 className="section-title reveal" style={{ '--reveal-delay': '80ms' }}>
            From zero to tracking<br />in under a minute.
          </h2>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="step-card reveal"
                style={{ '--reveal-delay': `${i * 80}ms` }}
              >
                <span className="step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section" id="testimonials">
        <div className="testimonials-bg" aria-hidden="true" />
        <div className="section-container">
          <div className="section-label reveal">Reviews</div>
          <h2 className="section-title reveal" style={{ '--reveal-delay': '80ms' }}>
            Loved by lifters<br />everywhere.
          </h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="testimonial-card reveal"
                style={{ '--reveal-delay': `${i * 100}ms` }}
              >
                <div className="testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.name[0]}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="section-container">
          <h2 className="reveal">Ready to get stronger?</h2>
          <p className="reveal" style={{ '--reveal-delay': '80ms' }}>
            Join thousands of lifters already tracking smarter with FitHub.
          </p>
          <div className="cta-actions reveal" style={{ '--reveal-delay': '160ms' }}>
            <Link to="/signup" className="btn btn-primary btn-lg">
              Create Free Account <ArrowRight size={18} />
            </Link>
          </div>
          <div className="cta-perks reveal" style={{ '--reveal-delay': '240ms' }}>
            <span><CheckCircle size={16} /> Free forever</span>
            <span><CheckCircle size={16} /> No credit card</span>
            <span><CheckCircle size={16} /> Works on any device</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="landing-logo">
              <Dumbbell size={22} />
              <span>FitHub</span>
            </div>
            <p>Simple workout tracking for serious lifters.</p>
            <DownloadButtons variant="footer" className="footer-downloads" />
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#testimonials">Reviews</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <Link to="/about">About</Link>
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
