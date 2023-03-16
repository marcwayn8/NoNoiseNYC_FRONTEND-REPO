import {useContext} from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Signup from "./pages/signup/Signup.jsx";
import SeverityMeterComponent from "./components/complaint form/complaint";
import LandingPage from "./pages/landingPage/landingPage";
import AppContext from "./context/appContext.jsx";

function App() {
  const {theme} = useContext(AppContext)
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile/:id" element={<Profile id={theme} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<SeverityMeterComponent />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

