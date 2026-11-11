import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { loading } = useAuth();

  if (loading) return null;

  return children;
}
