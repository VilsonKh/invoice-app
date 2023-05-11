import React, { useReducer } from "react";
import InvoiceContext from "./invoiceContext";
import data from '../../data.json'
import invoiceReducer, { initialState } from "./invoiceReducer";
import { CURRENT_INVOICE, DELETE_CONFIRMATION, GET_INVOICES, NEW_INVOICE_FORM } from "../types";


const InvoiceState = ({children}) => {


  const [state, dispatch] = useReducer(invoiceReducer, initialState);



  const getInvoices = () => {
    dispatch (
      {
        type: GET_INVOICES,
        payload: data
      }
    )
  }

  const deleteButtonClick = () => {
     dispatch(
      {
      type: DELETE_CONFIRMATION,
      payload: true, 
      })
      // state.invoices.splice(state.invoices.findIndex())
  }

  const addCurrentInvoice = () => {
    dispatch (
      {
        type: CURRENT_INVOICE,
        payload: state.payload
      }
    )
  }

  const addNewInvoice = (formData) => {
    dispatch (
      {
        type: NEW_INVOICE_FORM,
        payload: formData
      }
    )
  }

  

  // const markPaid = (index) => {
  //   state.invoices[index].status = 'paid'
  // }

  const value = {
        invoices: state.invoices,
				newInvoiceForm: state.newInvoiceForm,
				invoiceDetails: state.invoiceDetails,
				editInvoiceForm: state.editInvoiceForm,
				deleteConfirmation: state.deleteConfirmation,
				currentInvoice: state.currentInvoice,
				filters: state.filters,
				error: state.error,
        deleteButtonClick,
        addCurrentInvoice,
        addNewInvoice,
        getInvoices,
   
  }

	return (
		<InvoiceContext.Provider
			value={value}
		>
			{children}
		</InvoiceContext.Provider>
	);
};

export default InvoiceState;
