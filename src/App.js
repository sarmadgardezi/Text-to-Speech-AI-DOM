// ...

import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {
  Navbar,
  Footer,
  Home,
  Login,
  Detect,
  NotFound,
  Dashboard,
} from "./components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifyMsg = (type, msg) => {
  if (type === "success") {
    const notify = () => toast.success(msg);
    notify();
  } else {
    const notify = () => toast.error(msg);
    notify();
  }
};

const Layout = ({ children }) => {
  return (
    <>
      <Navbar notifyMsg={notifyMsg} />
      {children}
      <Footer />
    </>
  );
};

function App() {
  const { accessToken, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/login");
    } else if (!loading && accessToken) {
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [accessToken, loading, navigate]);

  const handleLogin = (username, password) => {
    // Your login logic here
    // Example: Check if username and password are valid
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      notifyMsg("success", "Login successful");
      navigate("/");
    } else {
      notifyMsg("error", "Invalid username or password");
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Layout notifyMsg={notifyMsg}>
              <Home />
            </Layout>
          }
        />

        <Route
          exact
          path="/detect"
          element={
            <Layout>
              <Detect />
            </Layout>
          }
        />

        {/* <Route
          exact
          path="/guide"
          element={
            <Layout>
              <Guide />
            </Layout>
          }
        /> */}

        <Route
          exact
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          exact
          path="/login"
          element={
            <Login
              notifyMsg={notifyMsg}
              isLoggedIn={isLoggedIn}
              handleLogin={handleLogin}
            />
          }
        />

        <Route exact path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default App;
