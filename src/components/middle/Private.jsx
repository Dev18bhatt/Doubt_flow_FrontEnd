import { Navigate } from "react-router-dom";

export default function PrivateRoute({ Component }) {
  const token = localStorage.getItem("token");

  return token !== null ? <Component /> : <Navigate to="/login" />;
}
