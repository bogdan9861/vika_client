import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Character from "./pages/Character/Character";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Sign from "./pages/Register/Sign";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/character" element={<Character />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/sign" element={<Sign />} />
      </Routes>
    </Router>
  );
}

export default App;
