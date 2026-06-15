'use client';

import { createContext, useContext, useState, ReactNode } from "react";

interface Usuario {
    id: string;
    nome: string;
    email: string;
}

// tipos q vão estar disponíveis no Context
interface AuthContextType {
    usuario: Usuario | null;
    estaAutenticado: boolean;
    login: (email: string) => Promise<void>;
    logout: () => void;
}

// criar o context propriamente dito
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// criando o Provider
export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const login = async (email: string) => {
        // simulando uma chamada de API de login
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUsuario({ id: '1', nome: 'Ana Banana', email});
    };

    const logout = () => {
        setUsuario(null);
    };

    const estaAutenticado = !!usuario;
    
    return (
        <AuthContext.Provider value={{ usuario, estaAutenticado, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// criando o hook personalizado
export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
    }
    return context;
    }
