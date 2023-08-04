import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { AuthContextProvider } from './components/context/AuthContext';
import Protected from './components/context/Protected';
import "./App.css"
import TranstionReject from './pages/transactionHistory/TranstionReject';
import TranstionApproved from './pages/transactionHistory/TranstionApproved';
import UserLandlord from './pages/list/UserLandlord';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route exact path="" element={<Login />} />
              <Route path='/home'>
                {/* <Route index element={<Protected><Home /></Protected>} /> */}
                <Route index element={<Protected><Home /></Protected>} />
                <Route path='users' index element={<Protected><List /></Protected>} />
                <Route path='usersLand' index element={<Protected><UserLandlord /></Protected>} />
                <Route path='products' index element={<Protected><Single /></Protected>} />
                <Route path='points' index element={<Protected><New /></Protected>} />
                <Route path='transRes' index element={<Protected><TranstionReject /></Protected>} />
                <Route path='transApps' index element={<Protected><TranstionApproved /></Protected>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
