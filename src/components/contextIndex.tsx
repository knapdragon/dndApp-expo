import { createContext } from "react";
import { useTheme } from "react-native-paper";

const themeContext = createContext(false);
const themeProvider = () => {};

const homeContext = createContext("");
const sheetsContext = createContext("");
const notesContext = createContext("");
const groupsContext = createContext("");

export {
    themeContext,
    homeContext,
    sheetsContext, 
    notesContext, 
    groupsContext,
};