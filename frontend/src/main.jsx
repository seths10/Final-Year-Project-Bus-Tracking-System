import { FronteggProvider } from "@frontegg/react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const contextOptions = {
  baseUrl: "https://app-7xlws802sb6w.frontegg.com",
  clientId: "b11f65fa-2174-4d72-bd3a-d46379a6c6e5",
};

const authOptions = {
  keepSessionAlive: true,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <FronteggProvider
    contextOptions={contextOptions}
    hostedLoginBox={true}
    authOptions={authOptions}
  >
    <App />
  </FronteggProvider>
  // document.getElementById("root")
);
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
