import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";
import Users from "./pages/users/Users";
import RequestEditor from "./pages/requestEditor/requestEditor";
import CreateRequest from "./pages/createRequest/createRequest";
import "./App.css"
import RequestEditorVpn from "./pages/requestEditor/vpn";
import RequestEditorVm from "./pages/requestEditor/vm";
import RequestEditorAp from "./pages/requestEditor/ap";

import CreateUser from "./components/CreateUser/CreateUser";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);
  //
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/createRequest"
          element={
            <Sidebar>
              <Layout>
                <CreateRequest />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/requestEditor"
          element={
            <Sidebar>
              <Layout>
                <RequestEditor />
              </Layout>
            </Sidebar>
          }
        />
                <Route
          path="/requestEditor/vpn"
          element={
            <Sidebar>
              <Layout>
                <RequestEditorVpn />
              </Layout>
            </Sidebar>
          }
        />
                <Route
          path="/requestEditor/vm"
          element={
            <Sidebar>
              <Layout>
                <RequestEditorVm />
              </Layout>
            </Sidebar>
          }
        />
                <Route
          path="/requestEditor/ap"
          element={
            <Sidebar>
              <Layout>
                <RequestEditorAp />
              </Layout>
            </Sidebar>
          }
        />
                <Route
          path="/requestEditor/vpn"
          element={
            <Sidebar>
              <Layout>
                <RequestEditorVpn />
              </Layout>
            </Sidebar>
          }
        />
                <Route
          path="/requestEditor/vm"
          element={
            <Sidebar>
              <Layout>
                <RequestEditorVm />
              </Layout>
            </Sidebar>
          }
        />
                <Route
          path="/requestEditor/ap"
          element={
            <Sidebar>
              <Layout>
                <RequestEditorAp />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/users"
          element={
            <Sidebar>
              <Layout>
                <Users />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/users/createUser"
          element={
            <Sidebar>
              <Layout>
                <CreateUser />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
