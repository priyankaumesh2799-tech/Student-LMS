import { useAuth } from "../context/AuthContext";

export const useCourseProgress = (courseId, totalLessons) => {
  const { isLessonCompleted, completeLesson, getCourseProgress } = useAuth();
  const progress = getCourseProgress(courseId, totalLessons);

  const markComplete = (lessonId) => {
    completeLesson(courseId, lessonId);
  };

  return {
    progress,
    isLessonCompleted: (lessonId) => isLessonCompleted(courseId, lessonId),
    markComplete,
  };
};

export const useEnrollment = () => {
  const { isEnrolled, enrollCourse } = useAuth();
  return {
    isEnrolled: (courseId) => isEnrolled(courseId),
    enroll: (courseId) => enrollCourse(courseId),
  };
};
