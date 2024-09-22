import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export default function SocketContextProvider({ children }) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io("http://localhost:4000"));
    }, []);

    // useEffect(() => {
    //     
    // }, [userDetails, socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};