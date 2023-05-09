import { createContext } from "react";
import { initialState } from "./invoiceReducer";

const invoiceContext = createContext(initialState);

export default invoiceContext;