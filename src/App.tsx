import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AuthPage from "./pages/Auth/AuthPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import { useAuth } from "./context/auth-context";
import UserPage from "./pages/Users/User";
import EventPage from "./pages/Event/Event";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <AuthPage />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <DashboardLayout>
                  <DashboardHome />
                </DashboardLayout>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/users"
            element={
              isAuthenticated ? (
                <DashboardLayout>
                  <UserPage />
                </DashboardLayout>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

           <Route
            path="/events"
            element={
              isAuthenticated ? (
                <DashboardLayout>
                  <EventPage />
                </DashboardLayout>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
