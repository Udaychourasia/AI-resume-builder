import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";

import Resume from "./pages/Resume";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />


      {/* 🔥 Protected Dashboard */}

      <Route

        path="/dashboard"

        element={

          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>

        }

      />


      {/* 🔥 Protected Resume */}

      <Route

        path="/resume"

        element={

          <ProtectedRoute>

            <Resume />

          </ProtectedRoute>

        }

      />

    </Routes>

  );

}

export default App;