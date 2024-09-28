import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export default function SocketContextProvider({ children }) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://192.168.36.50:8000');
        setSocket(newSocket);
        return () => {
            newSocket.close();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};