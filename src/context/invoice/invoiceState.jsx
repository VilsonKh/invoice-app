import React, { useReducer } from "react";
import InvoiceContext from "./invoiceContext";
import invoiceReducer, { initialState } from "./invoiceReducer";
import {
	GET_ALL_INVOICES,
	ADD_NEW_FORMFIELD,
	ADD_TO_ALL_INVOICES,
	CHANGE_FILTERS,
	CONFIRM_DELETE,
	CURRENT_INVOICE_NUMBER,
	DELETE_NEW_FORMFIELD,
	IS_DELETE_CONF,
	IS_EDIT_INVOICE,
	IS_NEW_INVOICE,
	IS_PREVIEW_INVOICE,
	MARK_AS_PAID,
	RESET_FORM,
	GET_INVOICE_ITEMS,
	SET_VISIBLE_INVOICES,
	SET_CURRENT_INVOICE_ID,
	SET_DEFAULT_FILTERS,
	SET_IS_PENDING,
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

	const setVisibleInvoices = (numb) => {
		dispatch({
			type: SET_VISIBLE_INVOICES,
			payload: numb,
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

	const confirmDeletion = () => {
		dispatch({
			type: CONFIRM_DELETE,
		});
	};


	const resetForm = () => {
		dispatch({
			type: RESET_FORM,
		});
	};

	const changeFilters = (filter) => {
		dispatch({
			type: CHANGE_FILTERS,
			payload: filter,
		});
	};


	const markAsPaid = () => {
		dispatch({
			type: MARK_AS_PAID,
		});
	};

	const addNewFormfield = (invoiceNumber) => {
		dispatch({
			type: ADD_NEW_FORMFIELD,
			payload: invoiceNumber
		});
	};

	const deleteNewFormfield = () => {
		dispatch({
			type: DELETE_NEW_FORMFIELD,
		});
	};

	const addToAllInvoices = (data) => {
		dispatch({
			type: ADD_TO_ALL_INVOICES,
			payload: data,
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
		resetForm,
		changeFilters,
		markAsPaid,
		confirmDeletion,
		setDeleteConf,
		addNewFormfield,
		deleteNewFormfield,
		addToAllInvoices,
		getAllInvoices,
		getInvoiceItems,
		setVisibleInvoices,
		setCurrentInvoiceId,
		setDefaultFilters,
		setIsPending
	};

	return <InvoiceContext.Provider value={value}>
					{children}
				</InvoiceContext.Provider>;
};

export default InvoiceState;
