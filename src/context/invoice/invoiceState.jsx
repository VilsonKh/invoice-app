import React, { useReducer } from "react";
import InvoiceContext from "./invoiceContext";
import invoiceReducer, { initialState } from "./invoiceReducer";
import { ADD_TO_ALL_INVOICES, CHANGED_INVOICE, CHANGE_FILTERS, CHOSEN_STATUS, CLICK_BACK, CONFIRM_DELETE, CURRENT_INVOICE, CURRENT_INVOICE_DATA, FILTER_INVOICES, MARK_PAID, NEW_INVOICE_FORM, RESET_CURRENT_INVOICE } from "../types";

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

		dispatch ({
			type: CURRENT_INVOICE_DATA,
			payload: number
		})
	};

	const addNewInvoice = (formData) => {
		dispatch({
			type: NEW_INVOICE_FORM,
			payload: formData,
		});
		dispatch({
			type: ADD_TO_ALL_INVOICES
		})
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
  }

	const onClickAdd = () => {
		dispatch({
			type: RESET_CURRENT_INVOICE,
		})	
	}

	const clickSaveStatus = (status) => {
		dispatch({
			type: CHOSEN_STATUS,
			payload: status 
		})
	}

	const clickChangeInvoice = (invoice) => {
		dispatch({
			type: CHANGED_INVOICE,
			payload: invoice
		})
	}

	const value = {
		invoices: state.invoices,
		initialInvoices: state.initialInvoices,
		newInvoiceForm: state.newInvoiceForm,
		invoiceDetails: state.invoiceDetails,
		editInvoiceForm: state.editInvoiceForm,
		deleteConfirmation: state.deleteConfirmation,
		currentInvoice: state.currentInvoice,
		currentInvoiceData: state.currentInvoiceData,
		filters: state.filters,
		error: state.error,
		currentStatus: state.currentStatus,
		changedInvoice: state.changedInvoice,
		deleteButtonClick,
		addCurrentInvoice,
		addNewInvoice,
		markAsPaid,
    onFilterClick,
    onClickBack,
		onClickAdd,
		clickSaveStatus,
		clickChangeInvoice
	};

	return <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>;
};

export default InvoiceState;
