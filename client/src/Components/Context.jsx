import React, { useState, createContext } from "react";

const UserContext = createContext();

const Context = ({children}) => {
    const [count, setCount] = useState(0);

    return (
        <UserContext.Provider value={{ count, setCount }}>
            {children}
        </UserContext.Provider>
    );
}

export default Context;
export { UserContext };
