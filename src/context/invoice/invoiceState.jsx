import React, { useReducer } from "react";
import InvoiceContext from "./invoiceContext";
import data from '../../data.json'
import invoiceReducer, { initialState } from "./invoiceReducer";
import { DELETE_CONFIRMATION } from "../types";
import { useParams } from "react-router";

const InvoiceState = ({children}) => {


  const [state, dispatch] = useReducer(invoiceReducer, initialState);

  const deleteButtonClick = () => {
     dispatch(
      {
      type: DELETE_CONFIRMATION,
      payload: true, 
      })
      console.log()
      // state.invoices.splice(state.invoices.findIndex())

  }

  const value = {
        invoices: [...data],
				newInvoiceForm: state.newInvoiceForm,
				invoiceDetails: state.invoiceDetails,
				editInvoiceForm: state.editInvoiceForm,
				deleteConfirmation: state.deleteConfirmation,
				currentInvoice: state.currentInvoice,
				filters: state.filters,
				error: state.error,
        deleteButtonClick,
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
