import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  PROFILE: "lms_student_profile",
  ENROLLED: "lms_enrolled_courses",
  COMPLETED_LESSONS: "lms_completed_lessons",
  QUIZ_RESULTS: "lms_quiz_results",
};

const defaultProfile = {
  name: "Student User",
  email: "student@college.edu",
  phone: "",
  bio: "Welcome to the Learning Management System.",
};

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(defaultProfile);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [completedLessons, setCompletedLessons] = useState({});
  const [quizResults, setQuizResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      const savedEnrolled = localStorage.getItem(STORAGE_KEYS.ENROLLED);
      const savedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      const savedQuiz = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);

      if (savedProfile) setProfile(JSON.parse(savedProfile));
      if (savedEnrolled) setEnrolledIds(JSON.parse(savedEnrolled));
      if (savedCompleted) setCompletedLessons(JSON.parse(savedCompleted));
      if (savedQuiz) setQuizResults(JSON.parse(savedQuiz));
    } catch (e) {
      console.error("Failed to load from localStorage", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveProfile = useCallback((next) => {
    setProfile(next);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(next));
  }, []);

  const enrollCourse = useCallback((courseId) => {
    setEnrolledIds((prev) => {
      if (prev.includes(courseId)) return prev;
      const next = [...prev, courseId];
      localStorage.setItem(STORAGE_KEYS.ENROLLED, JSON.stringify(next));
      return next;
    });
  }, []);

  const isEnrolled = useCallback(
    (courseId) => enrolledIds.includes(courseId),
    [enrolledIds]
  );

  const completeLesson = useCallback((courseId, lessonId) => {
    setCompletedLessons((prev) => {
      const key = courseId;
      const done = prev[key] || [];
      if (done.includes(lessonId)) return prev;
      const next = { ...prev, [key]: [...done, lessonId] };
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(next));
      return next;
    });
  }, []);

  const isLessonCompleted = useCallback(
    (courseId, lessonId) => {
      return (completedLessons[courseId] || []).includes(lessonId);
    },
    [completedLessons]
  );

  const getCourseProgress = useCallback(
    (courseId, totalLessons) => {
      const done = completedLessons[courseId] || [];
      if (totalLessons === 0) return 0;
      return Math.round((done.length / totalLessons) * 100);
    },
    [completedLessons]
  );

  const saveQuizResult = useCallback((courseId, score, total) => {
    setQuizResults((prev) => {
      const next = { ...prev, [courseId]: { score, total } };
      localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = {
    profile,
    saveProfile,
    enrolledIds,
    enrollCourse,
    isEnrolled,
    completedLessons,
    completeLesson,
    isLessonCompleted,
    getCourseProgress,
    quizResults,
    saveQuizResult,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
