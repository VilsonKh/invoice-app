import { DARK } from '../types';

export const initialState = {
  dark: false,
};

const darkReducer = (state, action) => {
  switch (action.type) {
    case DARK:
      return {
        ...state,
        dark: action.payload,
      };
  
    default:
      return state;
  }
};

export default darkReducer;
