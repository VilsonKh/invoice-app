import React, { useReducer } from "react";
import InvoiceContext from "./invoiceContext";
import invoiceReducer, { initialState } from "./invoiceReducer";
import { CHANGE_FILTERS, CLICK_BACK, CONFIRM_DELETE, CURRENT_INVOICE, FILTER_INVOICES, MARK_PAID, NEW_INVOICE_FORM } from "../types";

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
      type: CHANGE_FILTERS,
      payload: filter
    })
    dispatch({
      type: FILTER_INVOICES,
    })
  }

  const onClickBack = () => {
    dispatch ({
      type: CLICK_BACK,
    })
    dispatch ({
      type: FILTER_INVOICES
    })
  }

	const value = {
		invoices: state.invoices,
		filteredInvoices: state.filteredInvoices,
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
    onFilterClick,
    onClickBack
	};

	return <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>;
};

export default InvoiceState;
