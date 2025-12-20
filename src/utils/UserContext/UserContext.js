import { createContext } from "react";

const UserContext = createContext({
    loggedInUser:"Default User" // default value
});

export default UserContext;