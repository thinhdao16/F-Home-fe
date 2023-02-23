import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { AuthContextProvider } from './components/context/AuthContext';
import Protected from './components/context/Protected';


function App() {
  return (
    <React.Fragment>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* <Route path="/home" element={<Protected><Home /></Protected>} />
            <Route path="/profile" element={<List />} /> */}
            <Route path='home' >
                <Route index element={<Protected><Home /></Protected>}/>
                <Route path='profile' element={<List />} />
              </Route>
            <Route exact path="" element={<Login />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </React.Fragment>
  
  );
}

export default App;
