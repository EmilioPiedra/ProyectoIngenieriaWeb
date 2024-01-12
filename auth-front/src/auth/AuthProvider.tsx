import { useContext, createContext, useState, useEffect } from 'react';
import type { AccessTokenResponse, AuthResponse, User, OrderDetails, Bicycle, CartItem } from "../types/types";
import { API_URL } from './constants';

interface AuthProviderProps {
  children: React.ReactNode;
}


const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => { },
  saveUser: (userData: AuthResponse) => { },
  getRefreshToken: () => { },
  getUser: () => ({} as User | undefined),
  signOut: () => { },
  cart: [] as CartItem[],
  addToCart: (bicycle: Bicycle) => { },
  removeFromCart: (id: string) => { },
  saveOrderDetails: (details: OrderDetails) => { }, // Agrega saveOrderDetails
  getOrderDetails: () => ({} as OrderDetails), // Agrega getOrderDetails
  getSelectedBicycle: () => ({} as Bicycle),
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [selectedBicycle, setSelectedBicycle] = useState<Bicycle | null>(null);
  //const [refreshToken, setRefreshToken] = useState<string>("");

  useEffect(() => { checkAuth(); }, []);

  async function requestNewAccessToken(refreshToken: string) {
    try {
      const response = await fetch(`${API_URL}/refresh-Token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${refreshToken}`,
        },
      });
      if (response.ok) {
        const json = await response.json() as AccessTokenResponse;

        if (json.error) {
          throw new Error(json.error);
        }
        return json.body.accessToken;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async function getUserInfo(accessToken: string) {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const json = await response.json();

        if (json.error) {
          throw new Error(json.error);
        }
        return json.body;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  async function checkAuth() {
    if (accessToken) {
      const userInfo = await getUserInfo(accessToken);
      if (userInfo) {
        saveSessionInfo(userInfo, accessToken, getRefreshToken()!);
        setIsLoading(false);
        return;
      }
    } else {
      const token = getRefreshToken();
      if (token) {
        const newAccessToken = await requestNewAccessToken(token);
        if (newAccessToken) {
          const userInfo = await getUserInfo(newAccessToken);
          if (userInfo) {
            saveSessionInfo(userInfo, newAccessToken, token);
            setIsLoading(false);
            return;
          }

        }
      }
    }
    setIsLoading(false);
  }

  function signOut() {
    setIsAuthenticated(false);
    setAccessToken("");
    setUser(undefined);
    localStorage.removeItem("token");
  }

  function saveSessionInfo(userInfo: User, accessToken: string, refreshToken: string) {
    setAccessToken(accessToken);
    localStorage.setItem("token", JSON.stringify(refreshToken));
    setIsAuthenticated(true);
    setUser(userInfo);

  }

  function getAccessToken() {
    return accessToken;
  }
  function getRefreshToken(): string | null {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const { token } = JSON.parse(tokenData);
      return token;
    }
    return null;
  }
  function saveUser(userData: AuthResponse) {
    saveSessionInfo(userData.body.user, userData.body.accessToken, userData.body.refreshToken);
  }

  function getUser() {
    return user;
  }
  function addToCart(bicycle: Bicycle) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === bicycle.id);

      if (existingItem) {
        // Si el elemento ya existe, solo actualiza la cantidad
        return prevCart.map((item) =>
          item.id === bicycle.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Si el elemento no existe, agrégalo al carrito con cantidad 1
        const updatedCart = [...prevCart, { ...bicycle, quantity: 1 }];
        // Luego, guarda la bicicleta seleccionada
        saveSelectedBicycle(bicycle);
        return updatedCart;
      }
    });
  }


  function removeFromCart(id: string) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          return prevCart.filter((item) => item.id !== id);
        } else {
          return prevCart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
        }
      } else {
        return prevCart;
      }
    });
  }

  function saveOrderDetails(details: OrderDetails) {
    setOrderDetails(details);
  }

  function getOrderDetails() {
    return orderDetails || ({} as OrderDetails);
  }

  function saveSelectedBicycle(bicycle: Bicycle) {
    setSelectedBicycle(bicycle);
  }

  function getSelectedBicycle() {
    return selectedBicycle || ({} as Bicycle);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, getUser, signOut, cart, addToCart, removeFromCart, saveOrderDetails, getOrderDetails, getSelectedBicycle }}>
      {isLoading ? <div>cargando...</div> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
