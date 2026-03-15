import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import Avatar from '../components/Avatar';
import { mockUser } from '../data/mockData';
import './EditProfile.css';

export default function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: mockUser.name,
    email: mockUser.email,
  });
  const [profilePicture, setProfilePicture] = useState(mockUser.profilePicture);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePicture(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // TODO: save to backend
    navigate('/profile');
  };

  return (
    <div className="page">
      <div className="page-header">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} style={{ width: 'auto', marginBottom: 'var(--space-md)' }}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className="page-title">Edit Profile</h1>
      </div>

      <div className="edit-avatar-section">
        <div className="edit-avatar-wrapper">
          <Avatar name={form.name} src={profilePicture} size="xl" />
          <label className="edit-avatar-btn" htmlFor="photo-upload">
            <Camera size={16} />
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
        </div>
        <p className="edit-avatar-hint">Tap to change photo</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="edit-profile-form">
        <div className="form-group">
          <label className="form-label" htmlFor="edit-name">Full Name</label>
          <input
            id="edit-name"
            type="text"
            className="form-input"
            value={form.name}
            onChange={update('name')}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="edit-email">Email</label>
          <input
            id="edit-email"
            type="email"
            className="form-input"
            value={form.email}
            onChange={update('email')}
            required
          />
        </div>

        <div className="edit-profile-actions">
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/profile')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
