import "./login.scss";
import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../components/context/AuthContext";
import { auth } from "../../components/context/firebase";

const Login = () => {
  const navigate = useNavigate();
  const { googleSignIn, user, accessToken } = UserAuth();
  console.log(user)
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    console.log(fullName); // log the updated value of fullName after it has been updated
  }, [fullName]);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      if (accessToken) {
        const user = auth.currentUser;
        if (user) {
          const idToken = await user.getIdToken();
          const response = await fetch(
            "http://178.128.223.115:8080/api/v1/auth/sign-in",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
              },
              body: JSON.stringify({ accessToken: accessToken }),
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
  
  

  return (
    <div className="body">
      <h1 id="site-logo">
        <img
          src="https://fuidentity.edunext.vn/images/logo-login-new.png"
          alt="f-home"
        />
      </h1>
      <div id="wrap-main-content">
        <div class="identity-tabs">
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
        <div class="wrap-form-field">
          <div class="form-group group-width-icon">
            <i class="fa-solid fa-user"></i>
            <input
              type="email"
              class="form-control input-validation-error"
              placeholder="Email"
              autocomplete="off"
              data-val="true"
              data-val-required="Password is required"
              id="Password"
              name="Password"
            />
          </div>
        </div>
        <div class="wrap-form-field">
          <div class="form-group group-width-icon">
            <i class="fa-solid fa-lock"></i>
            <input
              type="password"
              class="form-control input-validation-error"
              placeholder="Password"
              autocomplete="off"
              data-val="true"
              data-val-required="Password is required"
              id="Password"
              name="Password"
            />
          </div>
        </div>
        <div class="d-grid form-identify">
          <button class="btn btn-primary" type="button">
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
