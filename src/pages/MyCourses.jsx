import { useAuth } from "../context/AuthContext";
import { COURSES } from "../data/courses";
import { Play, Clock, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyCourses() {
  const { enrolledIds, completedLessons } = useAuth();

  const enrolledCourses = COURSES.filter((c) => enrolledIds.includes(c.id));
  const ls = completedLessons || {};

  const completed = enrolledCourses.filter((c) => ls[c.id] && ls[c.id].length === c.lessons.length);
  const ongoing = enrolledCourses.filter((c) => !(ls[c.id] && ls[c.id].length === c.lessons.length));

  return (
    <div className="my-courses">
      <div className="page-header">
        <h1>My Courses</h1>
        <p>All your enrolled courses in one place.</p>
      </div>

      <div className="tabs">
        <button className="tab active">All ({enrolledCourses.length})</button>
        <button className="tab">Completed ({completed.length})</button>
        <button className="tab">Ongoing ({ongoing.length})</button>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="empty-state">
          <p>You haven&rsquo;t enrolled in any courses yet.</p>
          <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
        </div>
      ) : (
        <div className="course-grid">
          {enrolledCourses.map((course) => {
            const done = ls[course.id] || [];
            const progress = course.lessons.length === 0 ? 0 : Math.round((done.length / course.lessons.length) * 100);
            const isDone = progress === 100;
            return (
              <article key={course.id} className="course-card my-course-card">
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                  <div className="course-category">{course.category}</div>
                  {isDone && <div className="completion-badge">Completed</div>}
                </div>
                <div className="course-body">
                  <Link to={`/course/${course.id}`}>
                    <h3 className="course-title">{course.title}</h3>
                  </Link>
                  <div className="progress-label">
                    <span>{progress}% Complete</span>
                    <span>{done.length}/{course.lessons.length} lessons</span>
                  </div>
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="course-actions">
                    <Link to={`/lesson/${course.id}/${course.lessons[0]?.id || ""}`} className="btn btn-primary">
                      <Play size={16} /> {isDone ? "Review" : "Continue Learning"}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
