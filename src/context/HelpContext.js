import { createContext, useState } from "react";
import { SocketProvider } from "./SocketContext";

export const HelpContext = createContext();

export const HelpProvider = ({ children }) => {
  const [chats, setChats] = useState([
    {
      text: "Hello welcome to sort my college",
      user: false
    },
    {
      text: "Wo sab thk h mera, mera login nhi ho rha hai",
      user: true
    },
    {
      text: "Sorry for your inconvinience. feel free to share your problem with us.",
      user: false
    },
    {
      text: "Problem 1 baar me smjh nhi aayi? hindi nhi aati?",
      user: true
    },
    {
      text: "Sorry for your inconvinience. We will get back to you soon.",
      user: false
    },
  ]);
  return (
    <SocketProvider> {/* Wrap your existing provider with SocketProvider */}
      <HelpContext.Provider value={{ chats, setChats }}>
        {children}
      </HelpContext.Provider>
    </SocketProvider>
  );
}