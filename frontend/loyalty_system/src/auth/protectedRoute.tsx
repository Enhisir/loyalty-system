import { useLocation, Navigate, Routes } from "react-router-dom";

import useAuth from "./useAuth";
import CustomBeatLoader from "../components/general/beatLoader";

const ProtectedRoute = ({ children }) => {
  const { userLoading, user } = useAuth();

  const location = useLocation();

  if (userLoading) return <CustomBeatLoader />;

  return (
    user
      ? children
      : <Navigate to="/signin" state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRoute;
