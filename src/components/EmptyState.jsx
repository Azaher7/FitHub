import './EmptyState.css';

/**
 * Reusable empty-state placeholder used across pages.
 *
 * Props:
 *   icon      – Lucide icon component (rendered at size 36)
 *   title     – heading text
 *   message   – body text (optional)
 *   children  – optional action button / link
 */
export default function EmptyState({ icon: Icon, title, message, children }) {
  return (
    <div className="empty-box">
      {Icon && (
        <div className="empty-box-icon">
          <Icon size={36} />
        </div>
      )}
      {title && <h3 className="empty-box-title">{title}</h3>}
      {message && <p className="empty-box-message">{message}</p>}
      {children && <div className="empty-box-actions">{children}</div>}
    </div>
  );
}
