import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { backend_url } from "../config";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io(backend_url);

    // Set the socket in the state
    setSocket(newSocket);

    // Clean up by closing the socket when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []); // This effect runs once when the component mounts

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
