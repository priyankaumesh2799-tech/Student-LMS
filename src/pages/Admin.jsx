import { useState } from "react";
import { COURSES, CATEGORIES } from "../data/courses";
import { Plus, Trash2, Edit3, Search as SearchIcon } from "lucide-react";

export default function Admin() {
  const [courses, setCourses] = useState([...COURSES]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", category: "Programming", instructor: "", duration: "" });
  const [message, setMessage] = useState("");

  const filtered = courses.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setCourses(courses.map((c) => (c.id === editingId ? { ...c, ...form } : c)));
      setMessage("Course updated successfully!");
    } else {
      const newCourse = {
        id: String(Date.now()),
        ...form,
        lessons: [],
      };
      setCourses([...courses, newCourse]);
      setMessage("Course created successfully!");
    }
    setEditingId(null);
    setForm({ title: "", description: "", category: "Programming", instructor: "", duration: "" });
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (course) => {
    setEditingId(course.id);
    setForm({ title: course.title, description: course.description, category: course.category, instructor: course.instructor, duration: course.duration });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== id));
      setMessage("Course deleted successfully!");
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Admin Course Management</h1>
        <p>Create, edit, and delete courses.</p>
      </div>

      {message && <div className="alert alert-success">{message}</div>}

      <div className="admin-controls">
        <input type="text" placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="search-input" />
        <button className="btn btn-primary" onClick={() => { setEditingId(null); setForm({ title: "", description: "", category: "Programming", instructor: "", duration: "" }); }}>
          <Plus size={18} /> Add Course
        </button>
      </div>

      {editingId ? (
        <div className="admin-form-card">
          <h3>{editingId ? "Edit Course" : "Add Course"}</h3>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input type="text" name="title" value={form.title} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="form-textarea" rows={3} />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="select">
                {CATEGORIES.slice(1).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Instructor</label>
              <input type="text" name="instructor" value={form.instructor} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Duration</label>
              <input type="text" name="duration" value={form.duration} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Save Course</button>
              <button type="button" className="btn btn-ghost" onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="courses-table">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Instructor</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={5}>No courses found.</td></tr>
                ) : (
                  filtered.map((course) => (
                    <tr key={course.id}>
                      <td>{course.title}</td>
                      <td><span className="badge badge-primary">{course.category}</span></td>
                      <td>{course.instructor}</td>
                      <td>{course.duration}</td>
                      <td>
                        <button className="btn btn-sm btn-ghost" onClick={() => handleEdit(course)} title="Edit">
                          <Edit3 size={16} />
                        </button>
                        <button className="btn btn-sm btn-ghost" onClick={() => handleDelete(course.id)} title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
