import React, { Component, useState, useHistory } from "react";
import "../../components/Navbar/Navbar";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./Login.css";
import axios from "axios";
import Swal from "sweetalert2";
import "animate.css";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useRouter } from 'next/router';

function Login(props) {
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
    // console.log("logininfo ", loginINfo);
    axios
      .post(`http://127.0.0.1:8000/api/login`, loginINfo)
      .then((response) => {
        console.log("response token ", response);
        if (response.data.status === 500 || response.data.status === 400) {
          // console.log("wrong");
          Swal.fire({
            icon: "error",
            title: `${response.data.message}`,
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: "#f76928",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
            timer: 3000,
          });
        } else {
          // console.log(response.data.data.original);
          // console.log(response.data);
          Swal.fire({
            title: `${response.data.message}`,
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: "#f76928",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
            timer: 2000,
          });
          // useRouter.replace('/');
          //  const navigate = props.useNavigate()

          localStorage.setItem("token", response.data.data.original.token);
          navigate("/");
          window.location.reload();
        }
      });
    // .catch((err) => console.log(err));
  };

  return (
    // isLoggedIn ? <Link to={'./'}/> :
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
        <div className="login_form">
          <form className="form" onSubmit={handleSubmit}>
            <label className="input_label">
              <span className="input_title">Email</span>
              <input
                className="input"
                name="email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                // onChange={handleSubmit}
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
              <button
                type="Submit"
                className="btn btn-submit"
                // onClick={this.loginAdmin}
                // onClick={() => navigate('/')}
              >
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
