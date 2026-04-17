import './StatCard.css';

/**
 * Reusable stat card with icon, value, and label.
 *
 * Props:
 *   icon   – Lucide icon component
 *   value  – display value (string or number)
 *   label  – description text
 */
export default function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="scard">
      <div className="scard-icon">
        <Icon size={16} />
      </div>
      <span className="scard-value">{value}</span>
      <span className="scard-label">{label}</span>
    </div>
  );
}
