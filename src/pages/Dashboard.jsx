import { useAuth } from "../context/AuthContext";
import { COURSES } from "../data/courses";
import { Clock, CheckCircle, Play, Award } from "lucide-react";
import { CourseGrid } from "../components/CourseGrid";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { profile, enrolledIds, completedLessons, isEnrolled } = useAuth();

  const enrolledCourses = COURSES.filter((c) => enrolledIds.includes(c.id));
  const ls = completedLessons || {};

  const totalLessons = enrolledCourses.reduce((sum, c) => sum + c.lessons.length, 0);
  const completedCount = enrolledCourses.reduce(
    (sum, c) => sum + (ls[c.id] ? ls[c.id].length : 0),
    0
  );
  const overallProgress = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);
  const completedCountCourses = enrolledCourses.filter(
    (c) => ls[c.id] && ls[c.id].length === c.lessons.length
  ).length;

  const recentlyAccessed = enrolledCourses.slice(0, 3);

  return (
    <div className="dashboard">
      <div className="welcome-card">
        <div className="welcome-text">
          <h2>Welcome back, <span>{profile.name}</span>!</h2>
          <p>Here&rsquo;s what you&rsquo;ve been learning lately.</p>
        </div>
        <div className="welcome-avatar">{profile.name.charAt(0).toUpperCase()}</div>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Enrolled" value={enrolledCourses.length} icon={<Clock size={26} />} />
        <StatCard label="Completed" value={completedCountCourses} icon={<Award size={26} />} />
        <StatCard label="Overall Progress" value={overallProgress} suffix="%" icon={<Play size={26} />} />
        <StatCard label="Lessons Completed" value={completedCount} icon={<CheckCircle size={26} />} />
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h3>Enrolled Courses</h3>
          {enrolledCourses.length === 0 ? (
            <p className="empty-text">You haven&rsquo;t enrolled in any courses yet.</p>
          ) : (
            <Link to="/my-courses" className="view-all">View all courses &rarr;</Link>
          )}
        </div>
        {enrolledCourses.length > 0 ? (
          <CourseGrid courses={enrolledCourses} />
        ) : (
          <div className="empty-state">
            <p>Start by browsing the course catalogue.</p>
            <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h3>Recently Accessed</h3>
        </div>
        {recentlyAccessed.length > 0 ? (
          <CourseGrid courses={recentlyAccessed} />
        ) : (
          <div className="empty-state">
            <p>No recently accessed courses.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, suffix }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <div className="stat-value">{value}{suffix}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}
