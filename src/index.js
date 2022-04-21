import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { TndevProvider } from "./contexts/TndevContext";

const queryClient = new QueryClient();

// ReactDOM.render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <TndevProvider>
//         <App />
//       </TndevProvider>
//     </QueryClientProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <TndevProvider>
      <App />
    </TndevProvider>
  </QueryClientProvider>
);

reportWebVitals();
