import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../context/firebase";
import axios from "axios";
import { DataContext } from "../../pages/DataContext";
// const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [buildings, setBuildings] = useState([]);
  const buildingsData = buildings.data;
  const [accountStart, setAccountStart] = useState([]);
  const [posting, setPosting] = useState([]);
  const [imgPostDraft, setImgPostDraft] = useState(null)
  const [allCmt, setAllCmt] = useState([])
  const [isLiked, setIsLiked] = useState([]);
  const [chooseWant, setChooseWant] = useState([])
  const [dataUser, setDataUser] = useState([]);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();
    setAccessToken(token);
    setUser(user);
  };
  const logOut = () => {
    signOut(auth);
    localStorage.clear();
    window.location.reload();
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email) {
        currentUser.getIdToken().then((token) => {
          setAccessToken(token);
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <DataContext.Provider
      value={{
        googleSignIn,
        logOut,
        user,
        accessToken,
        buildingsData,
        posting,
        setPosting,
        imgPostDraft,
        setImgPostDraft,
        allCmt,
        setAllCmt,
        isLiked,
        setIsLiked,
        chooseWant,
        setChooseWant,
        dataUser, setDataUser
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };
