import { createContext, useState, useEffect } from "react";

interface AuthContextType {
    auth: { token: string | null; role: string | null };
    setAuth: (authData: { token: string | null; role: string | null }) => void;
}

export const AuthContext = createContext<AuthContextType>({
    auth: { token: null, role: null },
    setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<{ token: string | null; role: string | null }>(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        return { token, role };
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        setAuth({ token, role });
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
