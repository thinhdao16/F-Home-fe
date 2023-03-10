import "./login.scss";
import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../components/context/AuthContext";
import { auth } from "../../components/context/firebase";

const Login = () => {
  const navigate = useNavigate();
  const { googleSignIn, user, accessToken } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      if (accessToken !== undefined) { // Thêm điều kiện kiểm tra accessToken
        const user = auth.currentUser;
        if (user) {
          const idToken = await user.getIdToken();
          const body = JSON.stringify({ accessToken: accessToken });
          const response = await fetch(
            "http://178.128.223.115:8080/api/v1/auth/sign-in",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Content-Length": body.length.toString(),
                Authorization: `Bearer ${idToken}`,
              },
              body,
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            if (data !== undefined) {
              localStorage.setItem("access_token", data.token);
              console.log(data);
              navigate("/home");
            } else {
              console.log("No data returned from server");
            }
          } else {
            console.log("Response not OK");
          }
        } else {
          console.log("User not found");
        }
      } else {
        console.log("Access token not found");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  
  // rest of the component code

  

  return (
    <div className="body">
      <h1 id="site-logo">
        <img
          src="https://fuidentity.edunext.vn/images/logo-login-new.png"
          alt="f-home"
        />
      </h1>
      <div id="wrap-main-content">
        <div className="identity-tabs">
          <a href="/vi/Account/Login">Login</a>
        </div>
        <ul className="list-social-login">
          <li className="social-login-item">
            <GoogleButton
              className="googleButton"
              onClick={handleGoogleSignIn}
            />
          </li>
        </ul>
        <div className="wrap-form-field">
          <div className="form-group group-width-icon">
            <i className="fa-solid fa-user"></i>
            <input
              type="email"
              className="form-control input-validation-error"
              placeholder="Email"
              autoComplete="off"
              data-val="true"
              data-val-required="Password is required"
              id="Password"
              name="Password"
            />
          </div>
        </div>
        <div className="wrap-form-field">
          <div className="form-group group-width-icon">
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              className="form-control input-validation-error"
              placeholder="Password"
              autoComplete="off"
              data-val="true"
              data-val-required="Password is required"
              id="Password"
              name="Password"
            />
          </div>
        </div>
        <div className="d-grid form-identify">
          <button className="btn btn-primary" type="button">
            Log in
          </button>
          <Link to="/linkto" relative="path" className="change-rtn-home">
            Return To Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
