import "./App.css";
import { TndevCtx } from "./contexts/TndevContext";
import Button from "@mui/material/Button";
import Navbare from "./components/Navbare";

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
    <div className="App">
      <Navbare />
    </div>
  );
}

export default App;
