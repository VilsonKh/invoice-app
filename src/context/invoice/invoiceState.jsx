import React, { useReducer } from "react";
import InvoiceContext from "./invoiceContext";
import invoiceReducer, { initialState } from "./invoiceReducer";
import { CONFIRM_DELETE, CURRENT_INVOICE, FILTER_INVOICES, MARK_PAID, NEW_INVOICE_FORM } from "../types";

const InvoiceState = ({ children }) => {
	const [state, dispatch] = useReducer(invoiceReducer, initialState);

	const deleteButtonClick = () => {
		dispatch({
			type: CONFIRM_DELETE,
      payload: true
		});
		// state.invoices.splice(state.invoices.findIndex())
	};

	const addCurrentInvoice = (number) => {
		dispatch({
			type: CURRENT_INVOICE,
			payload: number,
		});
	};

	const addNewInvoice = (formData) => {
		dispatch({
			type: NEW_INVOICE_FORM,
			payload: formData,
		});
	};

	const markAsPaid = (number) => {
		dispatch({
			type: MARK_PAID,
			payload: number,
		});
	};

  const onFilterClick = (filter) => {
    dispatch({
      type: FILTER_INVOICES,
      payload: filter
    })
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
		markAsPaid,
    onFilterClick
	};

	return <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>;
};

export default InvoiceState;
