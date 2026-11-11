import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User as UserIcon, Mail, Phone, Edit2 } from "lucide-react";

export default function Profile() {
  const { profile, saveProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...profile });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveProfile(form);
    setEditing(false);
    setMessage("Profile updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account information.</p>
      </div>

      <div className="profile-layout">
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="avatar">{profile.name.charAt(0).toUpperCase()}</div>
            <h3>{profile.name}</h3>
            <p className="profile-email">{profile.email}</p>
            <button className="btn btn-primary edit-btn" onClick={() => setEditing(true)}>
              <Edit2 size={18} /> Edit Profile
            </button>
          </div>
        </div>

        <div className="profile-main">
          {editing ? (
            <form onSubmit={handleSave} className="profile-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea name="bio" value={form.bio} onChange={handleChange} className="form-textarea" rows={4} />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" className="btn btn-ghost" onClick={() => { setForm({ ...profile }); setEditing(false); }}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              {message && <div className="alert alert-success">{message}</div>}
              <div className="detail-row">
                <span className="detail-label"><Mail size={18} /> Email</span>
                <span className="detail-value">{profile.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label"><Phone size={18} /> Phone</span>
                <span className="detail-value">{profile.phone || "Not provided"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Bio</span>
                <span className="detail-value">{profile.bio}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
