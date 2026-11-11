import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { COURSES, QUIZZES } from "../data/courses";
import { BookOpen, User as UserIcon, Clock as ClockIcon, Layout, Play, Star } from "lucide-react";

export default function CourseDetails() {
  const { id } = useParams();
  const { isEnrolled, enroll } = useAuth();

  const course = COURSES.find((c) => c.id === id);
  if (!course) return <div className="not-found">Course not found.</div>;

  const enrolled = isEnrolled(course.id);

  return (
    <div className="course-details">
      <div className="course-hero">
        <img src={course.image} alt={course.title} className="hero-image" />
        <div className="hero-content">
          <span className="badge badge-primary">{course.category}</span>
          <h1>{course.title}</h1>
          <div className="course-meta">
            <div className="meta-item">
              <UserIcon size={18} />
              <span>{course.instructor}</span>
            </div>
            <div className="meta-item">
              <ClockIcon size={18} />
              <span>{course.duration}</span>
            </div>
            <div className="meta-item">
              <Star size={18} />
              <span>{course.rating}</span>
            </div>
          </div>
          <p className="hero-description">{course.description}</p>
          <div className="hero-actions">
            {enrolled ? (
              <Link to={`/lesson/${course.id}/${course.lessons[0].id}`} className="btn btn-primary">
                <Play size={18} /> Start Learning
              </Link>
            ) : (
              <button className="btn btn-primary" onClick={() => enroll(course.id)}>
                <Play size={18} /> Enroll Now
              </button>
            )}
            <Link to="/courses" className="btn btn-outline">Back to Catalogue</Link>
          </div>
        </div>
      </div>

      <div className="lessons-list">
        <h2>Lessons ({course.lessons.length})</h2>
        <ul>
          {course.lessons.map((lesson, index) => (
            <li key={lesson.id} className="lesson-item">
              <div className="lesson-info">
                <span className="lesson-number">{index + 1}</span>
                <span className="lesson-title">{lesson.title}</span>
              </div>
              <Link to={`/lesson/${course.id}/${lesson.id}`} className="btn btn-sm btn-ghost">
                View
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {QUIZZES[id] && (
        <div className="quiz-section">
          <h2>Course Quiz</h2>
          <p>Test your knowledge with {QUIZZES[id].length} multiple-choice questions.</p>
          <Link to={`/quiz/${course.id}`} className="btn btn-primary">
            Take Quiz
          </Link>
        </div>
      )}
    </div>
  );
}
