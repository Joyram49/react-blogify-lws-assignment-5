import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

export default function PrivateRoute({ children }) {
  const { auth } = useAuth();
  return auth?.accessToken ? children : <Navigate to='/' />;
}
