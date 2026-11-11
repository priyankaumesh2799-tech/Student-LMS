import { Play, Clock, Star, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEnrollment } from "../hooks/useLMS";

export const CourseCard = ({ course }) => {
  const { isEnrolled, enroll } = useEnrollment();
  const enrolled = isEnrolled(course.id);

  return (
    <article className="course-card">
      <div className="course-image">
        <img src={course.image} alt={course.title} />
        <div className="course-category">{course.category}</div>
        <Link to={`/course/${course.id}`} className="enroll-overlay">
          {enrolled ? (
            <button className="btn btn-primary continue-btn">
              <Play size={18} /> Continue Learning
            </button>
          ) : (
            <button className="btn btn-primary enroll-btn" onClick={() => enroll(course.id)}>
              <Download size={18} /> Enroll Now
            </button>
          )}
        </Link>
      </div>
      <div className="course-body">
        <Link to={`/course/${course.id}`}>
          <h3 className="course-title">{course.title}</h3>
        </Link>
        <div className="course-meta">
          <span className="instructor">
            <span className="dot"></span> {course.instructor}
          </span>
          <span className="duration">
            <Clock size={14} /> {course.duration}
          </span>
        </div>
        <div className="course-rating">
          <Star size={16} fill="currentColor" />
          <span>{course.rating}</span>
        </div>
        <p className="course-description">{course.description}</p>
      </div>
    </article>
  );
}
