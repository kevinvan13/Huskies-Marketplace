import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import CreateAd from "./pages/CreateAd.jsx";
import Verification from "./pages/Verification.jsx";
import Profile from "./pages/Profile.jsx";
import DetailPage from "./pages/DetailPage";
import { useAuth0 } from "@auth0/auth0-react";

import './styles/App.css';



const RequireAuth = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/verify" element={<Verification />} />
          <Route path="/details/:id" element={<DetailPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/sell" element={<CreateAd />} />
            <Route path="/profile/:username" element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
