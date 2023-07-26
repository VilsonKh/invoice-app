import React, { useReducer } from 'react';
import DarkContext from './darkContext';
import darkReducer, { initialState } from './darkReducer';
import { DARK, SET_DARK } from '../types';

const DarkState = (props) => {

  const [state, dispatch] = useReducer(darkReducer, initialState);

  // Set Dark State
  const toggleDarkMode = () => {
    let newMode = !state.dark;
    newMode
      ? (document.body.style.backgroundColor = '#141625')
      : (document.body.style.backgroundColor = '#f8f8f8');
    dispatch({ type: DARK, payload: newMode });
  };

  const setDarkMode = (boolean) => {
    dispatch({
      type: SET_DARK, 
      payload: boolean})
  }

  return (
    <DarkContext.Provider
      value={{
        dark: state.dark,
        toggleDarkMode,
        setDarkMode
      }}
    >
      {props.children}
    </DarkContext.Provider>
  );
};

export default DarkState;
