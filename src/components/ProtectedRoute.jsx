import {Navigate} from "react-router-dom";
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return isAuthenticated ? children : null;
}
export default ProtectedRoute;