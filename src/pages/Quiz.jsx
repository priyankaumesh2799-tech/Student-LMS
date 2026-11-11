import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { COURSES, QUIZZES } from "../data/courses";
import { CheckCircle, RefreshCw, AlertTriangle } from "lucide-react";

export default function Quiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { saveQuizResult } = useAuth();

  const course = COURSES.find((c) => c.id === courseId);
  const questions = QUIZZES[courseId] || [];
  if (!course || questions.length === 0) {
    return (
      <div className="quiz-page">
        <div className="quiz-card">
          <h2>No Quiz Available</h2>
          <p>This course does not have a quiz yet.</p>
          <Link to={`/course/${courseId}`} className="btn btn-primary">
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (qIdx, optionIdx) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    const percentage = Math.round((correct / questions.length) * 100);
    const passed = percentage >= 60;
    setShowResult(true);
    saveQuizResult(courseId, correct, questions.length);
    // store result locally for display
    window.sessionStorage.setItem("quiz_last_result", JSON.stringify({ correct, total: questions.length, percentage, passed }));
  };

  const result = JSON.parse(window.sessionStorage.getItem("quiz_last_result") || "null");

  return (
    <div className="quiz-page">
      {showResult && result ? (
        <div className="quiz-result">
          <div className="quiz-card">
            <div className={`result-icon ${result.passed ? "pass" : "fail"}`}>
              {result.passed ? <CheckCircle size={48} /> : <AlertTriangle size={48} />}
            </div>
            <h2>{result.passed ? "You Passed!" : "You Failed"}</h2>
            <p className="result-score">
              {result.correct} / {result.total} correct ({result.percentage}%)
            </p>
            <div className="result-actions">
              <Link to={`/course/${courseId}`} className="btn btn-outline">
                Back to Course
              </Link>
              <button className="btn btn-primary" onClick={() => {
                setShowResult(false);
                setAnswers({});
                setCurrent(0);
                window.sessionStorage.removeItem("quiz_last_result");
              }}>
                <RefreshCw size={18} /> Retake Quiz
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="quiz-card">
          <div className="quiz-header">
            <h2>Quiz: {course.title}</h2>
            <div className="quiz-progress">
              <span>{current + 1} of {questions.length}</span>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="question-card">
            <div className="question-text">
              <span className="question-number">Q{current + 1}</span>
              {questions[current].question}
            </div>
            <div className="options">
              {questions[current].options.map((opt, i) => (
                <button
                  key={i}
                  className={`option-btn ${answers[current] === i ? "selected" : ""} ${submitted && answers[current] === i && i === questions[current].answer ? "correct" : submitted && answers[current] === i && i !== questions[current].answer ? "incorrect" : ""}`}
                  onClick={() => handleSelect(current, i)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="quiz-actions">
            {current > 0 && (
              <button className="btn btn-outline" onClick={() => setCurrent((p) => p - 1)}>
                Previous
              </button>
            )}
            {current < questions.length - 1 ? (
              <button className="btn btn-primary" onClick={() => setCurrent((p) => p + 1)} disabled={answers[current] === undefined}>
                Next
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleSubmit} disabled={answers[current] === undefined}>
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
