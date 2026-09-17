import { createContext, useContext, useState } from "react";
import { authApi } from "../api/authApi";
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("ecom-user") || "null"),
  );
  const save = (session) => {
    localStorage.setItem("ecom-token", session.token);
    localStorage.setItem("ecom-user", JSON.stringify(session));
    setUser(session);
    return session;
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login: async (values) => save(await authApi.login(values)),
        register: async (values) => save(await authApi.register(values)),
        logout: () => {
          localStorage.removeItem("ecom-token");
          localStorage.removeItem("ecom-user");
          setUser(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
