import { useContext, createContext, useState, useEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

// Define a custom type for the context value
interface AuthContextValue {
  isAuthenticated: boolean;
}

// Create the context with the custom type
const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Use the custom type for the context value
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
