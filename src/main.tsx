
  import { createRoot } from "react-dom/client";
  import { BrowserRouter } from "react-router-dom";
  import App from "./App.tsx";
  import { AppProvider } from "./context/AppContext";
  import "./index.css";
  import 'leaflet/dist/leaflet.css';  
  createRoot(document.getElementById("root")!).render(
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  );  