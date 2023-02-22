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
            <Route exact path="" element={<Login />} />
              
              <Route path='home' element={<Protected><Home /></Protected>} />
              <Route path="users">
                <Route index element={<Protected>
                  <List /></Protected>} />
                <Route path=":userId" element={<Single />} />
                <Route path="new" element={<New />} />
              </Route>
              <Route path="products">
                <Route index element={<List />} />
                <Route path=":productId" element={<Single />} />
                <Route path="new" element={<New />} />
              </Route>
              <Route path='/new' element={<New />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </React.Fragment>
  );
}

export default App;
