import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Home, Login, Admins, Transactions, Categories } from "./pages";
import "./App.css";
// import ProtectedRoutes from "./pages/ProtectedRoutes";
import NotFound from "./pages/Login/NotFound";
export function Page(props) {
  return (
    <div className="main_container">
      <Navbar active={props.active} />
      <div className="main_section">{props.children}</div>
    </div>
  );
}

function App() {
  // let navigate = useNavigate();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* <Route element = {<ProtectedRoutes />}>*/}
        {localStorage.getItem("token") ? (
          <>
            <Route
              path="/"
              element={
                <Page active={1}>
                  <Home />
                </Page>
              }
            />

            <Route
              path="/admins"
              element={
                <Page active={2}>
                  <Admins />
                </Page>
              }
            />
            <Route
              path="/categories"
              element={
                <Page active={3}>
                  <Categories />
                </Page>
              }
            />
            <Route
              path="/transactions"
              element={
                <Page active={4}>
                  <Transactions />
                </Page>
              }
            />
            <Route path="/*" element={<NotFound />} />
            {/*  </Route>*/}
          </>
        ) : (
          <>
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
