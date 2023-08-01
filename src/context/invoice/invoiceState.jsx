import React, { useReducer } from "react";
import InvoiceContext from "./invoiceContext";
import invoiceReducer, { initialState } from "./invoiceReducer";
import {
	GET_ALL_INVOICES,
	CHANGE_FILTERS,
	CURRENT_INVOICE_NUMBER,
	IS_DELETE_CONF,
	IS_EDIT_INVOICE,
	IS_NEW_INVOICE,
	IS_PREVIEW_INVOICE,
	GET_INVOICE_ITEMS,
	SET_CURRENT_INVOICE_ID,
	SET_IS_PENDING,
	SET_DEFAULT_FILTERS,
} from "../types";



const InvoiceState = ({ children }) => {
	const [state, dispatch] = useReducer(invoiceReducer, initialState);

	const getInvoiceItems = (data) => {
		dispatch({
			type: GET_INVOICE_ITEMS,
			payload: data,
		});
	};

	const setIsPending = (bool) => {
		dispatch({
			type: SET_IS_PENDING,
			payload: bool
		})
	}

	const setDefaultFilters = () => {
		dispatch({
			type: SET_DEFAULT_FILTERS
		})
	}

	const setPreviewInvoice = (boolean) => {
		dispatch({
			type: IS_PREVIEW_INVOICE,
			payload: boolean,
		});
	};

	const setIsNewInvoice = (boolean) => {
		dispatch({
			type: IS_NEW_INVOICE,
			payload: boolean,
		});
	};

	const setIsEditInvoice = (boolean) => {
		dispatch({
			type: IS_EDIT_INVOICE,
			payload: boolean,
		});
	};

	const setCurrentInvoiceNumber = (invoiceNumber) => {
		dispatch({
			type: CURRENT_INVOICE_NUMBER,
			payload: invoiceNumber,
		});
	};

	const setCurrentInvoiceId = (invoiceId) => {
		dispatch({
			type: SET_CURRENT_INVOICE_ID,
			payload: invoiceId,
		});
	};

	const setDeleteConf = (boolean) => {
		dispatch({
			type: IS_DELETE_CONF,
			payload: boolean,
		});
	};



	const changeFilters = (filter) => {
		dispatch({
			type: CHANGE_FILTERS,
			payload: filter,
		});
	};

	const getAllInvoices = (data) => {
		dispatch({
			type: GET_ALL_INVOICES,
			payload: data,
		});
	};


	const value = {
		invoices: state.invoices,
		invoiceItems: state.invoiceItems,
		visibleInvoices: state.visibleInvoices,
		currentInvoiceId: state.currentInvoiceId,
		filters: state.filters,
		isNewInvoice: state.isNewInvoice,
		isPreviewInvoice: state.isPreviewInvoice,
		isEditInvoice: state.isEditInvoice,
		formState: state.formState,
		currentInvoiceNumber: state.currentInvoiceNumber,
		isDeleteConf: state.isDeleteConf,
		isPending: state.isPending,
		setCurrentInvoiceNumber,
		setIsNewInvoice,
		setPreviewInvoice,
		setIsEditInvoice,
		changeFilters,
		setDeleteConf,
		getAllInvoices,
		getInvoiceItems,
		setCurrentInvoiceId,
		setIsPending,
		setDefaultFilters
	};

	return <InvoiceContext.Provider value={value}>
					{children}
				</InvoiceContext.Provider>;
};

export default InvoiceState;
