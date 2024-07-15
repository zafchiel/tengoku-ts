import { User } from "lucia";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

type UserContextType = {
	userInfo: User | null;
	isAuthenticating: boolean;
	cleanUserInfo: () => void;
};

export const UserInfoContext = createContext<UserContextType>({
	userInfo: null,
	isAuthenticating: true,
	cleanUserInfo: () => {},
});

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
			} catch {
				setUserInfo(null);
			} finally {
				setIsAuthenticating(false);
			}
		}

		fetchUserAndSession();
	}, []);

	const value = {
		userInfo,
		isAuthenticating,
		cleanUserInfo: () => setUserInfo(null),
	};

	return (
		<UserInfoContext.Provider value={value}>
			{children}
		</UserInfoContext.Provider>
	);
};
