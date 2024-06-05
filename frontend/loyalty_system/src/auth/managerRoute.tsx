import { useLocation, Navigate } from "react-router-dom";
import { Role } from "../types";
import useAuth from "./useAuth";
import Error from '../components/general/error/error';
import CustomBeatLoader from "../components/general/beatLoader";

const ManagerRoute = ({ children }) => {
  const { userLoading, user } = useAuth();

  const location = useLocation();

  if (userLoading) return <CustomBeatLoader />;

  if (user == null)
    return <Navigate
      to="/signin"
      state={{ from: location.pathname }}
      replace />;

  return user.role == Role.Manager
    ? children
    : <Error>Access not allowed</Error>;
};

export default ManagerRoute;
