import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { COURSES } from "../data/courses";
import Lesson from "../components/Lesson";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

export default function LessonViewer() {
  const { courseId, lessonId } = useParams();
  const { completeLesson } = useAuth();
  const navigate = useNavigate();

  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return <div className="not-found">Course not found.</div>;

  const lessonIndex = course.lessons.findIndex((l) => l.id === lessonId);
  if (lessonIndex === -1) return <div className="not-found">Lesson not found.</div>;

  const lesson = course.lessons[lessonIndex];
  const hasPrev = lessonIndex > 0;
  const hasNext = lessonIndex < course.lessons.length - 1;

  const handleComplete = () => {
    completeLesson(courseId, lesson.id);
  };

  return (
    <div className="lesson-viewer">
      <div className="lesson-header-bar">
        <Link to={`/course/${courseId}`} className="btn btn-sm btn-ghost back-btn">
          <ChevronLeft size={18} /> Back to Course
        </Link>
        <h1>{course.title}</h1>
      </div>

      <div className="lesson-layout">
        <aside className="lesson-sidebar">
          <h2>Lessons</h2>
          <ul>
            {course.lessons.map((l, idx) => (
              <li key={l.id} className={lesson.id === l.id ? "active" : ""}>
                <Link to={`/lesson/${courseId}/${l.id}`} className="lesson-link">
                  <span className="lesson-dot"></span>
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <main className="lesson-main">
          <Lesson
            lesson={lesson}
            courseId={courseId}
            index={lessonIndex}
            total={course.lessons.length}
            onComplete={handleComplete}
            onNavigate={{
              prev: hasPrev ? () => navigate(`/lesson/${courseId}/${course.lessons[lessonIndex - 1].id}`) : undefined,
              next: hasNext ? () => navigate(`/lesson/${courseId}/${course.lessons[lessonIndex + 1].id}`) : undefined,
            }}
          />
        </main>
      </div>
    </div>
  );
}
