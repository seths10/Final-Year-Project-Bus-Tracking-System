import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAuth, useLoginWithRedirect } from "@frontegg/react";
import { Toaster } from "react-hot-toast";
import { Notifications } from "react-push-notification";
import "./App.css";
import Home from "./page/Home";
import About from "./page/About";
import Splash from "./components/Splash";

const App = () => {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  return (
    <>
      <Splash />

      <Notifications />
      <Toaster position="top-center" />

      <main>
        <Routes>
          <Route path="/" element={<Home userProfile={user} />} />
          <Route path="/about" element={<About userProfile={user} />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
