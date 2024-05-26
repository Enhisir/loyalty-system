import { useState, createContext, useEffect } from "react";
import { UserInfo } from "../types";
import api from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [refresh, setRefresh] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (localStorage.getItem("refresh_token")) refreshAuthInfo();
    else logout();
  }, []);

  const storeAuthInfo = (info: AuthInfo) => {
    if (!info) return;
    console.log(info);
    localStorage.setItem("access_token", info.accessToken);
    localStorage.setItem("refresh_token", info.refreshToken);
    localStorage.setItem("expires_in", info.accessTokenExpires.toString());

    ConfigureAuthInfo(info);
  };

  const ConfigureAuthInfo = (info: AuthInfo) => {
    api.defaults.headers.common.Authorization = `Bearer ${info.accessToken}`;

    setUser(info.user);
    setUserLoading(false);
    setRefresh(setTimeout(refreshAuthInfo, info.accessTokenExpires));
  };

  const logout = () => {
    localStorage.clear();

    setUser(null);
    setUserLoading(false);
    clearTimeout(refresh ?? undefined);
    setRefresh(null);
  };

  const refreshAuthInfo = () => {
    const refreshToken = localStorage.getItem("refresh_token");

    api
      .post("auth/refresh", { refreshToken: refreshToken })
      .then((response) => storeAuthInfo(response.data))
      .catch(() => {
        logout();
      });
  };

  return (
    <AuthContext.Provider
      value={{ userLoading, setUserLoading, user, storeAuthInfo, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

type AuthInfo = {
  user: UserInfo;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
};

export { AuthContext, AuthProvider };
