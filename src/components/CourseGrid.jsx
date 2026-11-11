import { CourseCard } from "./CourseCard";

export const CourseGrid = ({ courses }) => (
  <div className="course-grid">
    {courses.map((course) => (
      <CourseCard key={course.id} course={course} />
    ))}
  </div>
);
