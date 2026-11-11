import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { COURSES, CATEGORIES } from "../data/courses";
import { CourseGrid } from "../components/CourseGrid";
import { CourseCard } from "../components/CourseCard";
import { Search, Filter, SortAsc, ArrowUpDown } from "lucide-react";

export default function CourseCatalogue() {
  const { isEnrolled, enroll } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("name");

  let filtered = COURSES.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || c.category === category;
    return matchesSearch && matchesCat;
  });

  if (sort === "name") {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="catalogue">
      <div className="catalogue-header">
        <h1>Course Catalogue</h1>
        <p>Explore our available courses and start learning today.</p>
      </div>

      <div className="controls">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search courses by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-box">
          <Filter size={18} />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="select">
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="sort-box">
          <SortAsc size={18} />
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="select">
            <option value="name">Sort by Name</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>

      <div className="results-count">
        {filtered.length} course{filtered.length !== 1 ? "s" : ""} found
      </div>

      <div className="course-grid">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No courses match your filters.</p>
          </div>
        ) : (
          filtered.map((course) => (
            <div key={course.id}>
              <CourseCard course={course} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
