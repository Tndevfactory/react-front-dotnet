import FormData from "form-data";
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const TndevContext = createContext(null);

export const TndevCtx = () => {
  return useContext(TndevContext);
};

// config
const BASE_URL_SERVER = "http://localhost:8000/api";
console.log(process.env.NODE_ENV);
console.log(process.env.REACT_APP_BASE_URL);
const api = axios.create({
  // baseURL: process.env.BASE_URL,
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(function (config) {
  config.headers = { "X-Requested-With": "XMLHttpRequest" };
  config.headers = { Accept: "application/json" };
  config.headers = { "content-type": "application/json" };

  const token = Cookies.get("token3s") ? Cookies.get("token3s") : null;
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

// authMethods  zone  --> loginController
export const apiLogin = async (cred) => {
  let url = "/login";
  const { data } = await api.post(url, cred);
  return data;
};

const authMethods = {
  apiLogin,
};

export const TndevProvider = ({ children }) => {
  // init check
  const [loguedIn, setLoguedIn] = useState(
    Cookies.get("token3s") ? true : false
  );
  const [user, setUser] = useState({});
  console.log(loguedIn);

  const [openDrawer, setOpenDrawer] = useState(false);

  const states = {
    openDrawer,
    setOpenDrawer,
    loguedIn,
    setLoguedIn,
    user,
    setUser,
  };

  const methods = {
    authMethods,
  };

  return (
    <TndevContext.Provider value={[methods, states]}>
      {children}
    </TndevContext.Provider>
  );
};
