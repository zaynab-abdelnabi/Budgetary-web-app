import React, { useState } from "react";
import axios from "axios";
import "../../components/Navbar/Navbar";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as alert from "../../components/Alerts/Alert";
import "./Login.css";

import { useNavigate } from "react-router-dom";

function Login() {
  const [inputType, setInputType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var loginINfo = {
      email,
      password,
    };
    axios
      .post(`https://financial-app-api.herokuapp.com/api/login`, loginINfo)
      .then((response) => {
        if (response.data.status === 500 || response.data.status === 400) {
          alert.error(response.data.message);
        } else {
          alert.success(response.data.message);

          localStorage.setItem("token", response.data.data.original.token);
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login_page">
      <div className="logo_section">
        <span className="letter_logo">B</span>
        <span className="name_logo">Budgetary</span>
        <span className="line_logo"></span>
      </div>
      <div className="login_section">
        <div className="login_title">
          <FaRegUser style={{ marginRight: "1rem" }} />
          <span>Login</span>
        </div>
        <div className="login_form animate__animated animate__slideInUp">
          <form className="form" onSubmit={handleSubmit}>
            <label className="input_label">
              <span className="input_title">Email</span>
              <input
                className="input"
                name="email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input_label">
              <span className="input_title">Password</span>
              <input
                className="input"
                name="password"
                type={inputType}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {inputType === "password" ? (
                <AiOutlineEye
                  className="password_eye"
                  onClick={() => togglePassword()}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="password_eye"
                  onClick={() => togglePassword()}
                />
              )}
            </label>

            <div style={{ margin: "0 auto" }}>
              <button type="Submit" className="btn btn-submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
