import { useAuth } from "../context/AuthContext";

export default function Lesson({ lesson, courseId, index, total, onComplete, onNavigate }) {
  const { isLessonCompleted, completeLesson } = useAuth();
  const completed = isLessonCompleted(courseId, lesson.id);

  return (
    <div className="lesson-wrapper">
      <div className="lesson-header">
        <div className="lesson-meta">
          <span className="lesson-number">Lesson {index + 1} of {total}</span>
          <span className="lesson-divider">•</span>
          <button
            className={`btn btn-sm btn-ghost mark-btn ${completed ? "completed" : ""}`}
            onClick={() => {
              completeLesson(courseId, lesson.id);
              onComplete();
            }}
          >
            {completed ? "Completed" : "Mark as Completed"}
          </button>
        </div>
      </div>

      <div className="lesson-content" dangerouslySetInnerHTML={{ __html: lesson.content }} />

      <div className="lesson-nav">
        {onNavigate.prev && (
          <button className="btn btn-outline" onClick={onNavigate.prev}>
            Previous Lesson
          </button>
        )}
        {onNavigate.next && (
          <button className="btn btn-primary" onClick={onNavigate.next}>
            Next Lesson
          </button>
        )}
      </div>
    </div>
  );
}
