import { useEffect, useState } from "react";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!sessionStorage.getItem("token")
  );

  const login = () => setIsAuthenticated(true);

  const logout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(!!sessionStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};