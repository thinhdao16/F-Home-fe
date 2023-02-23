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
      if (
        currentUser.email.endsWith("thinhddse151086@fpt.edu.vn") ||
        currentUser.email.endsWith("vinhthse151179@fpt.edu.vn") ||
        currentUser.email.endsWith("tungdmse151168@fpt.edu.vn") ||
        currentUser.email.endsWith("hungmnhse151102@fpt.edu.vn") ||
        currentUser.email.endsWith("tuanndse151153@fpt.edu.vn") ||
        currentUser.email.endsWith("taivtse151030@fpt.edu.vn")
      ) {
        currentUser.getIdToken().then((token) => {
          setAccessToken(token);
        });
      } else {
        logOut();
        setTimeout(() => {
          alert("Please you dont admin please dont enter");
        }, 1000);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     console.log("first", currentUser);
  //     setUser(currentUser);
  //     if (!currentUser.email.endsWith("vinhthse151179@fpt.edu.vn") ||
  //     !currentUser.email.endsWith("tungdmse151168@fpt.edu.vn") ||
  //     !currentUser.email.endsWith("hungmnhse151102@fpt.edu.vn") ||
  //     !currentUser.email.endsWith("tuanndse151153@fpt.edu.vn") ||
  //     !currentUser.email.endsWith("thinhddse151086@fpt.edu.vn") ||
  //     !currentUser.email.endsWith("taivtse151030@fpt.edu.vn")){
  //       logOut();
  //       setTimeout(() => {
  //         alert("Please Login by account FPT University");
  //       }, 1000);
  //     } else {
  //       currentUser.getIdToken().then((token) => {
  //         setAccessToken(token);
  //       });
  //     }
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [user]);
  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
};
