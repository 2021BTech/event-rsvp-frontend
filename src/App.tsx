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
import CreateEventPage from "./pages/Event/CreateEvent";
import LandingPage from "./pages/landing";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Router>
        <Routes>
          {/* Landing page at `/` */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LandingPage />
              )
            }
          />

          {/* Login page at `/auth` */}
          <Route
            path="/auth"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <AuthPage />
              )
            }
          />

          {/* Authenticated routes */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <DashboardLayout>
                  <DashboardHome />
                </DashboardLayout>
              ) : (
                <Navigate to="/auth" replace />
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
                <Navigate to="/auth" replace />
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
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route
            path="/create"
            element={
              isAuthenticated ? (
                <DashboardLayout>
                  <CreateEventPage />
                </DashboardLayout>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />
          <Route
            path="/create/:id"
            element={
              isAuthenticated ? (
                <DashboardLayout>
                  <CreateEventPage />
                </DashboardLayout>
              ) : (
                <Navigate to="/auth" replace />
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
