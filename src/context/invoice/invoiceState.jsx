import React from 'react';
import InvoiceContext from './invoiceContext';

const invoiceState = (props) => {
  return (
    <InvoiceContext.Provider
      value={{
        
      }}>
      {props.children}
    </InvoiceContext.Provider>
  )
}

export default invoiceState