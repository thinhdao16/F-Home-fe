import "./login.scss";
import React, { useContext, useState } from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../../components/context/firebase";
import { DataContext } from "../DataContext";
// import toastr from "cogo-toast";
import clientId from "./client_secret_624291541261-vsnpuqvrn48tah5ju43l048ug23a3hre.apps.googleusercontent.com.json";
import axios from "axios";

const Login = () => {
  const { googleSignIn, user, accessToken } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true); // set loading to true before the API call
      await googleSignIn();
      if (accessToken !== undefined) {
        // Thêm điều kiện kiểm tra accessToken
        const user = auth.currentUser;
        if (user) {
          const idToken = await user.getIdToken();
          const accessToken = await user.getIdToken(true);
          const response = await axios.post(
            "http://localhost:3000/login",
            { accessToken: accessToken },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
              },
            }
          );
          if ((response.status = 200)) {
            // const data = await response.json();
            if (
              response.data.data.user.roleName === "admin"
            ) {
              localStorage.setItem(
                "access_token",
                JSON.stringify(response.data)
              );
              // toastr.success("Login successfully", {
              //   position: "top-right",
              //   heading: "Done",
              // });
              navigate("/home");
              //         }
            } else {
              // toastr.error("please are not admin dont enter", {
              //   position: "top-right",
              //   heading: "Done",
              // });
            }
          } else {
            // toastr.error("Response not OK", {
            //   position: "top-right",
            //   heading: "Done",
            // });
          }
        } else {
          // toastr.error("User not found", {
          //   position: "top-right",
          //   heading: "Done",
          // });
        }
      } else {
        // toastr.error("Access token not found", {
        //   position: "top-right",
        //   heading: "Done",
        // });
      }
      setIsLoading(false); // set loading to false after the API call
    } catch (error) {
      // toastr.warn(`please are not admin dont enter`, {
      //   position: "top-right",
      //   heading: "Done",
      // });
      setIsLoading(false); // set loading to false after the API call
    }
  };

  useEffect(() => {
    const accessTokenString = localStorage.getItem("access_token");
    let accessToken = null;
    if (typeof accessTokenString === "string" && accessTokenString !== "") {
      accessToken = JSON.parse(accessTokenString);
    }

    const userDataString = localStorage.getItem("user_data");
    let userData = null;
    if (typeof userDataString === "string" && userDataString !== "") {
      userData = JSON.parse(userDataString);
    }

    if (accessToken && userData && userData.user.roleName === "admin") {
      navigate("/home");
    } else {
      navigate("");
    }
  }, [navigate]);
  return (
    <div className="body">
      <div id="wrap-main-content">
        <div class="identity-tabs">
          <a href="/vi/Account/Login">
            Login
          </a>
        </div>
        <ul className="list-social-login">
          <li className="social-login-item">
            <GoogleButton className="googleButton" onClick={handleGoogleSignIn}
              data-clientid={clientId.web.client_id}
              />
          </li>
        </ul>
        <div class="d-grid form-identify">
          <button class="btn btn-primary" type="button">
            Log in
          </button>
          <Link to="/linkto" relative = "path"  className="change-rtn-home">
          Return To HomePage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
