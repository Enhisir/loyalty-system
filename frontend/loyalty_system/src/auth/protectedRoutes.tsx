import { useLocation, Navigate } from "react-router-dom";

import useAuth from "./useAuth";
import CustomBeatLoader from "../components/general/beatLoader";

const ProtectedRoutes = ({ children }) => {
  const { userLoading, user } = useAuth();

  const location = useLocation();

  if (userLoading) return <CustomBeatLoader />;

  return user ? (
    children
  ) : (
    <Navigate to="/sign_in" state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRoutes;
