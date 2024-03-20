import { User } from "lucia";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserInfoContext = createContext<User | null>(null);

type UserInfoProviderProps = {
  children: React.ReactNode;
};

export const UserInfoProvier = ({ children }: UserInfoProviderProps) => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUserAndSession() {
      try {
        const res = await axios.get<User>("/api/user");

        if (res.data) {
          setUserInfo(res.data);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.log(error);
        setUserInfo(null);
      } finally {
        setIsAuthenticating(false);
      }
    }

    fetchUserAndSession();
  }, []);

  return (
    <UserInfoContext.Provider value={userInfo}>
      {children}
    </UserInfoContext.Provider>
  );
};
