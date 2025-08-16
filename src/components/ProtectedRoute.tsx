// components/ProtectedRoute.tsx
// import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = Cookies.get("userInfo"); // שליפת הטוקן מהקוקי
  console.log("🚀 ~ ProtectedRoute ~ token:", token)

  if (!token) {
    // אם אין טוקן, הפנה ללוגין
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
