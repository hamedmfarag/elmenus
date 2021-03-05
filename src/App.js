import { useState } from "react";
import { ToastContainer } from "react-toastify";

import { UserContext } from "./userContext";
import Routes from "./routes";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [user, setUser] = useState({});
  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      <ToastContainer draggable position="bottom-right" />
      <Routes />
    </UserContext.Provider>
  );
}
