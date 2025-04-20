// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/firebase.auth";
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
