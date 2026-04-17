import './Avatar.css';

export default function Avatar({ src, name, size = 'md' }) {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div className={`avatar avatar-${size}`}>
      {src ? (
        <img src={src} alt={name} />
      ) : (
        <span className="avatar-initials">{initials}</span>
      )}
    </div>
  );
}
