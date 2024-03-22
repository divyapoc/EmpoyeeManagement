import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginForm from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import {PrivateRoute} from "./components/ProtectedRoute/ProtectedRoute";
// import HomePage from './components/Layout/header/Header';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
