import './DownloadButtons.css';

export default function DownloadButtons({ variant = 'hero', className = '' }) {
  const wrapperClass = ['download-buttons', `download-buttons--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClass}>
      <a
        href="#"
        className="download-btn download-btn--apple"
        aria-label="Download on the App Store"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.564 12.675c-.028-2.847 2.33-4.224 2.437-4.29-1.33-1.943-3.398-2.209-4.132-2.239-1.76-.177-3.434 1.037-4.328 1.037-.89 0-2.273-1.01-3.74-.982-1.922.028-3.695 1.117-4.685 2.836-1.998 3.461-.509 8.582 1.43 11.4.95 1.378 2.082 2.923 3.565 2.87 1.433-.058 1.973-.924 3.704-.924 1.73 0 2.222.924 3.739.895 1.544-.028 2.522-1.406 3.465-2.789 1.093-1.597 1.542-3.147 1.568-3.227-.034-.016-3.006-1.153-3.023-4.587zM14.74 4.339c.788-.957 1.32-2.289 1.175-3.613-1.136.047-2.513.757-3.327 1.713-.73.848-1.37 2.203-1.198 3.508 1.268.099 2.562-.646 3.35-1.608z" />
        </svg>
        <span className="download-btn-text">
          <span className="download-btn-text-small">Download on the</span>
          <span className="download-btn-text-large">App Store</span>
        </span>
      </a>

      <a
        href="#"
        className="download-btn download-btn--google"
        aria-label="Get it on Google Play"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="gplay-a" x1="3" y1="3" x2="3" y2="21" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#00C3FF" />
              <stop offset="1" stopColor="#1A73E8" />
            </linearGradient>
            <linearGradient id="gplay-b" x1="3" y1="3" x2="16" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#4CE0A3" />
              <stop offset="1" stopColor="#00A971" />
            </linearGradient>
            <linearGradient id="gplay-c" x1="3" y1="21" x2="16" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FFD43B" />
              <stop offset="1" stopColor="#FF8F00" />
            </linearGradient>
            <linearGradient id="gplay-d" x1="16" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FF4B55" />
              <stop offset="1" stopColor="#D93025" />
            </linearGradient>
          </defs>
          <path d="M3.5 2.75c-.3.2-.5.55-.5 1v16.5c0 .45.2.8.5 1L13 12 3.5 2.75z" fill="url(#gplay-a)" />
          <path d="M16.5 8.75 13 12l-9.5-9.25c.2-.15.45-.2.7-.15.15.03.3.09.44.17l11.86 6.98z" fill="url(#gplay-b)" />
          <path d="M16.5 15.25 4.64 22.23a1.23 1.23 0 0 1-.44.17c-.25.05-.5 0-.7-.15L13 12l3.5 3.25z" fill="url(#gplay-c)" />
          <path d="m20.84 10.72-4.34 2.53L13 12l3.5-3.25 4.34 2.54c.58.34.58 1.1 0 1.43z" fill="url(#gplay-d)" />
        </svg>
        <span className="download-btn-text">
          <span className="download-btn-text-small">GET IT ON</span>
          <span className="download-btn-text-large">Google Play</span>
        </span>
      </a>
    </div>
  );
}
