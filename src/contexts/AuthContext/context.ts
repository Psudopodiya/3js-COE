import { USER_KEY } from "@/constants";
import { createContext, useContext } from "react";

const USER = localStorage.getItem(USER_KEY);
export const PARSED_USER: User = USER ? JSON.parse(USER) : null;
export const IS_AUTHENTICATED = PARSED_USER !== null;

export type User = {
    email: string;
};

type Context = {
    user: User | null;
    isAuthenticated: boolean;
    login: (newUser: User) => void;
    logout: () => void;
};

export const authContext = createContext<Context>({
    user: null,
    isAuthenticated: IS_AUTHENTICATED,
    login: () => {},
    logout: () => {},
});

export const useAuth = () => useContext(authContext);
