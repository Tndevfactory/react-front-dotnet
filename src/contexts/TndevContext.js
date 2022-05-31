import FormData from "form-data";
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const TndevContext = createContext(null);

export const TndevCtx = () => {
  return useContext(TndevContext);
};

// config

console.clear();
// console.warn("Contact Developer:");
// console.warn("Name: CH");
// console.warn("Website: https://tndev-art.tn");
// console.warn("WhatsApp/Tel: +216 55 38 54 74");
// console.warn("Email: tndev8@gmail.com");
// console.warn("facebook: https://www.facebook.com/TndevArt");

console.log(process.env.NODE_ENV);
console.log(process.env.REACT_APP_BASE_API_ENDPOINT);

const api = axios.create({
  // baseURL: process.env.BASE_URL,
  baseURL: process.env.REACT_APP_BASE_API_ENDPOINT,
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

// authMethods  zone  --> loginController
export const apiLogout = async () => {
  let url = "/logout";
  const { data } = await api.get(url);
  return data;
};

const authMethods = {
  apiLogin,
  apiLogout,
};
// incidents  zone  --> IncidenController
export const apiIncidentsAll = async (tri = "asc") => {
  let payload = {
    params: {
      tri: tri,
    },
  };
  let url = "/incidents-all";
  const { data } = await api.get(url, payload);
  return data;
};

export const apiIncidentCreate = async (dt) => {
  let url = "/incident-create";
  const { data } = await api.post(url, dt);
  return data;
};

export const apiIncidentDelete = async (id) => {
  let payload = {
    params: {
      id: id,
    },
  };
  let url = "/incident-delete";
  const { data } = await api.delete(url, payload);
  return data;
};

export const apiIncidentUpdate = async (dt) => {
  let payload = {
    id: dt.id,
    data: dt.data,
  };
  console.log(payload);

  let url = "/incident-update";
  const { data } = await api.put(url, payload);
  return data;
};

const incidentsMethods = {
  apiIncidentsAll,
  apiIncidentDelete,
  apiIncidentCreate,
  apiIncidentUpdate,
};

// interventions  zone  --> interventionController
export const apiInterventionAll = async (tri = "asc") => {
  let payload = {
    params: {
      tri: tri,
    },
  };
  let url = "/interventions-all";
  const { data } = await api.get(url, payload);
  return data;
};

export const apiInterventionCreate = async (dt) => {
  let url = "/intervention-create";
  const { data } = await api.post(url, dt);
  return data;
};

export const apiInterventionDelete = async (id) => {
  let payload = {
    params: {
      id: id,
    },
  };
  let url = "/intervention-delete";
  const { data } = await api.delete(url, payload);
  return data;
};

export const apiInterventionUpdate = async (dt) => {
  let payload = {
    id: dt.id,
    data: dt.data,
  };
  console.log(payload);

  let url = "/intervention-update";
  const { data } = await api.put(url, payload);
  return data;
};

const interventionsMethods = {
  apiInterventionAll,
  apiInterventionCreate,
  apiInterventionDelete,
  apiInterventionUpdate,
};

// Tache  zone  --> TacheController
export const apiTachesAll = async (tri = "asc") => {
  let payload = {
    params: {
      tri: tri,
    },
  };
  let url = "/taches-all";
  const { data } = await api.get(url, payload);
  return data;
};

export const apiTacheCreate = async (dt) => {
  let url = "/tache-create";
  const { data } = await api.post(url, dt);
  return data;
};

export const apiTacheDelete = async (id) => {
  let payload = {
    params: {
      id: id,
    },
  };
  let url = "/tache-delete";
  const { data } = await api.delete(url, payload);
  return data;
};

export const apiTacheUpdate = async (dt) => {
  let payload = {
    id: dt.id,
    data: dt.data,
  };
  console.log(payload);

  let url = "/tache-update";
  const { data } = await api.put(url, payload);
  return data;
};

const tachesMethods = {
  apiTachesAll,
  apiTacheDelete,
  apiTacheUpdate,
  apiTacheCreate,
};

// Validations  zone  --> ValidationController
export const apiValidationsAll = async (tri = "asc") => {
  let payload = {
    params: {
      tri: tri,
    },
  };
  let url = "/validations-all";
  const { data } = await api.get(url, payload);
  return data;
};

export const apiAskToCloseIncident = async (dt) => {
  let payload = {
    id: dt.id,
    data: dt.data,
  };
  console.log(payload);

  let url = "/ask-to-close-incident";
  const { data } = await api.put(url, payload);
  return data;
};
export const apiCloseTache = async (dt) => {
  let payload = {
    id: dt.id,
    data: dt.data,
  };
  console.log(payload);

  let url = "/close-tache";
  const { data } = await api.put(url, payload);
  return data;
};
export const apiCloseIntervention = async (dt) => {
  let payload = {
    id: dt.id,
    data: dt.data,
  };
  console.log(payload);

  let url = "/close-intervention";
  const { data } = await api.put(url, payload);
  return data;
};

const validationsMethods = {
  apiValidationsAll,
  apiAskToCloseIncident,
  apiCloseIntervention,
  apiCloseTache,
};

// Stat  zone  --> StatController
export const apiStatAll = async (tri = "asc") => {
  let payload = {
    params: {
      tri: tri,
    },
  };
  let url = "/stat-all";
  const { data } = await api.get(url, payload);
  return data;
};

const statsMethods = {
  apiStatAll,
};
export const TndevProvider = ({ children }) => {
  // init check
  const [loguedIn, setLoguedIn] = useState(
    Cookies.get("token3s") ? true : false
  );
  const [user, setUser] = useState(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")) : ""
  );
  // console.log(loguedIn);
  // console.log(user);

  const [bigData, setBigData] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const [taches, setTaches] = useState([]);

  const [openDrawer, setOpenDrawer] = useState(false);

  const states = {
    openDrawer,
    setOpenDrawer,
    loguedIn,
    setLoguedIn,
    user,
    setUser,
    bigData,
    setBigData,
    interventions,
    setInterventions,
    taches,
    setTaches,
  };

  const methods = {
    authMethods,
    incidentsMethods,
    interventionsMethods,
    tachesMethods,
    validationsMethods,
    statsMethods,
  };

  return (
    <TndevContext.Provider value={[methods, states]}>
      {children}
    </TndevContext.Provider>
  );
};
