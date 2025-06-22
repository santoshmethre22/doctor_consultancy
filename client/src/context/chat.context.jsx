import { useState } from "react";

import { createContext } from "react";

const ChatContext=createContext();

export const ChatProvider=({children})=>{

    const [chatHistorty,setChathistory]=useState("NULL");

    return(


        <ChatContext.Provider value={{chatHistorty}} >

            {children}
        </ChatContext.Provider>
    )
}