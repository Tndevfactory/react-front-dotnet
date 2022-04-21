import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ user, children }) => {
  const { loguedIn } = user;
  console.log(loguedIn);
  if (!loguedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoutes;
