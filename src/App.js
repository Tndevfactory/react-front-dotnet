import "./App.css";
import { TndevCtx } from "./contexts/TndevContext";
import { useState } from "react";
import Navbarr from "./components/Navbarr";
import Login from "./pages/auth/Login";
import Calendrier from "./pages/calendrier/Calendrier";
import Incidents from "./pages/incidents/Incidents";
import Interventions from "./pages/interventions/Interventions";
import Validations from "./pages/validations/Validations";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import GuestRoutes from "./GuestRoutes";
import { CenterFocusStrong } from "@mui/icons-material";
import Taches from "./pages/taches/Taches";

function App() {
  const [methods, states] = TndevCtx();
  const { authMethods } = methods;
  const { testContext } = authMethods;
  const { loguedIn } = states;

  return (
    <>
      <Router>
        <Navbarr />
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route
            path="/"
            element={
              <GuestRoutes loguedIn={loguedIn}>
                <Login />
              </GuestRoutes>
            }
          />
          <Route
            path="/calendrier"
            element={
              <AuthRoutes loguedIn={loguedIn}>
                <Calendrier />
              </AuthRoutes>
            }
          />
          <Route
            path="/incidents"
            element={
              <AuthRoutes loguedIn={loguedIn}>
                <Incidents />
              </AuthRoutes>
            }
          />
          <Route
            path="/interventions"
            element={
              <AuthRoutes loguedIn={loguedIn}>
                <Interventions />
              </AuthRoutes>
            }
          />
          <Route
            path="/taches"
            element={
              <AuthRoutes loguedIn={loguedIn}>
                <Taches />
              </AuthRoutes>
            }
          />
          <Route
            path="/validations"
            element={
              <AuthRoutes loguedIn={loguedIn}>
                <Validations />
              </AuthRoutes>
            }
          />
          <Route
            path="*"
            element={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "9rem",
                  fontSize: "3rem",
                }}
              >
                page: 404
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
