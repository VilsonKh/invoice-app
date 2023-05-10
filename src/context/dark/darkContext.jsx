import { createContext } from 'react';
import initialState from './darkReducer';

const darkContext = createContext(initialState);

export default darkContext;
