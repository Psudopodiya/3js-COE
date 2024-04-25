import { useCallback, useState } from "react";

import { USER_KEY } from "@/constants";
import {
    authContext,
    IS_AUTHENTICATED,
    PARSED_USER,
    User,
} from "@/contexts/AuthContext/context";

type AuthContextProps = {
    children: React.ReactNode;
};

const AuthContext = ({ children }: AuthContextProps) => {
    const [user, setUser] = useState<User | null>(PARSED_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(IS_AUTHENTICATED);

    const login = useCallback((newUser: User) => {
        setIsAuthenticated(true);
        setUser(newUser);
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem(USER_KEY);
    }, []);

    return (
        <authContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthContext;
