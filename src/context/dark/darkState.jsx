import React, { useReducer } from 'react';
import DarkContext from './darkContext';
import darkReducer, { initialState } from './darkReducer';
import { DARK } from '../types';

const DarkState = (props) => {

  const [state, dispatch] = useReducer(darkReducer, initialState);

  // Set Dark State
  const toggleDarkMode = () => {
    let newMode = !state.dark;
    newMode ? (document.querySelector('.themeWrapper').style.backgroundColor = '#141625')
    : (document.querySelector('.themeWrapper').style.backgroundColor = '#f8f8f8');
    dispatch({ type: DARK, payload: newMode });
  };



  return (
    <DarkContext.Provider
      value={{
        dark: state.dark,
        toggleDarkMode,
      }}
    >
      {props.children}
    </DarkContext.Provider>
  );
};

export default DarkState;
