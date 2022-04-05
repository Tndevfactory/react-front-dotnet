import "./App.css";
import { TndevCtx } from "./contexts/TndevContext";

import Navbare from "./components/Navbare";
import CreationIncident from "./components/CreationIncident";
import Login from "./components/Login";
import Listeincident from "./components/ListeIncident";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [methods, states] = TndevCtx();
  const { authMethods } = methods;
  const { testContext } = authMethods;
  const { color } = states;

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
          <Route path="/liste-incident" element={<Listeincident />} />
          <Route path="/creation-incident" element={<CreationIncident />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
