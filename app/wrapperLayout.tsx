'use client';
import { AuthProvider } from "@/context/authContext";
import { ReduxProvider } from "@/store/providers";

interface AppProvidersProps {
    children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
    return (
        <AuthProvider>
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </AuthProvider>
    );
}