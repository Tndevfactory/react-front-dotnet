import "./App.css";
import { TndevCtx } from "./contexts/TndevContext";
import { useState } from "react";
import Navbare from "./components/Navbare";
import CreationIncident from "./components/CreationIncident";
import Login from "./components/Login";
import Listeincident from "./components/ListeIncident";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { CenterFocusStrong } from "@mui/icons-material";
function App() {
  const [methods, states] = TndevCtx();
  const { authMethods } = methods;
  const { testContext } = authMethods;
  const { color } = states;
  const [user, setUser] = useState({ loguedIn: true });
  const handleClick = () => {
    let t = testContext();
    console.log(t);
  };

  return (
    <>
      <Router>
        <Navbare />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/liste-incident"
            element={
              <ProtectedRoutes user={user}>
                <Listeincident />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/creation-incident"
            element={
              <ProtectedRoutes user={user}>
                <CreationIncident />
              </ProtectedRoutes>
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
