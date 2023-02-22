import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();
    setAccessToken(token);
    setUser(user);
  };
  const accessTokens = localStorage.getItem("access_token");
  console.log(accessTokens);
  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser.email.endsWith("@fpt.edu.vn")) {
        if (
          currentUser.email.endsWith(
            "thinhddse151086@fpt.edu.vn" ||
            "vinhthse151179@fpt.edu.vn" ||
            "tungdmse151168@fpt.edu.vn &&" ||
            "hungmnhse151102@fpt.edu.vn" ||
            "tuanndse151153@fpt.edu.vn"
          )
        ) {
          currentUser.getIdToken().then((token) => {
            setAccessToken(token);
          });
        } else {
          logOut();
          setTimeout(() => {
            alert("you are fpt but you dont are admin");
          }, 1000);
        }
      } else {
        logOut();
        setTimeout(() => {
          alert("Please Login by account FPT University");
        }, 1000);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
};
