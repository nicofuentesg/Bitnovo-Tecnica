import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { websocketService, WebSocketStatus } from '../services/websocket';

// Definimos el tipo para nuestro contexto
interface WebSocketContextType {
    status: WebSocketStatus;
    lastMessage: any | null;
    connect: (identifier: string) => void;
    disconnect: () => void;
}

// Creamos el contexto
const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

// Props para el provider
type WebSocketProviderProps = {
    children: ReactNode;
};

// Provider component
export function WebSocketProvider({ children }: WebSocketProviderProps) {
    const [status, setStatus] = useState<WebSocketStatus>('disconnected');
    const [lastMessage, setLastMessage] = useState<any | null>(null);

    useEffect(() => {
        // Suscribirse a los cambios de estado
        const unsubscribeStatus = websocketService.onStatusChange((newStatus) => {
            setStatus(newStatus);
        });

        // Suscribirse a los mensajes
        const unsubscribeMessage = websocketService.onMessage((message) => {
            setLastMessage(message);
        });

        // Limpieza de suscripciones
        return () => {
            unsubscribeStatus();
            unsubscribeMessage();
            websocketService.disconnect();
        };
    }, []);

    const connect = (identifier: string) => {
        websocketService.connect(identifier);
    };

    const disconnect = () => {
        websocketService.disconnect();
        websocketService.clearMessage();
        setLastMessage(null);
    };

    return (
        <WebSocketContext.Provider value={{
            status,
            lastMessage,
            connect,
            disconnect
        }}>
            {children}
        </WebSocketContext.Provider>
    );
}

// Hook personalizado para usar el contexto
export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
}; 