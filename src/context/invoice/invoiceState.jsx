import React, { useReducer } from "react";
import InvoiceContext from "./invoiceContext";
import invoiceReducer, { initialState } from "./invoiceReducer";
import {
	GET_ALL_INVOICES,
	ADD_NEW_FORMFIELD,
	ADD_TO_ALL_INVOICES,
	CHANGED_INVOICE,
	CHANGE_FILTERS,
	CHANGE_FORM_STATE,
	CHANGE_SHOWN_INVOICES,
	CHOSEN_STATUS,
	CLICK_BACK,
	CONFIRM_DELETE,
	CURRENT_INVOICE,
	CURRENT_INVOICE_DATA,
	CURRENT_INVOICE_NUMBER,
	DELETE_NEW_FORMFIELD,
	EDIT_INVOICE_FORM,
	FILTER_INVOICES,
	IS_DELETE_CONF,
	IS_EDIT_INVOICE,
	IS_NEW_INVOICE,
	IS_PREVIEW_INVOICE,
	MARK_AS_PAID,
	MARK_PAID,
	NEW_INVOICE_FORM,
	RESET_CURRENT_INVOICE,
	RESET_FORM,
	GET_ALL_INVOICES_ITEMS,
	SET_VISIBLE_INVOICES,
} from "../types";

const InvoiceState = ({ children }) => {
	const [state, dispatch] = useReducer(invoiceReducer, initialState);

	// const deleteButtonClick = () => {
	// 	dispatch({
	// 		type: CONFIRM_DELETE,
	//     payload: true
	// 	});
	// 	// state.invoices.splice(state.invoices.findIndex())
	// };

	const getAllInvoicesItems = (data) => {
		dispatch({
			type: GET_ALL_INVOICES_ITEMS,
			payload: data,
		});
	};

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

	const setNewInvoice = (boolean) => {
		dispatch({
			type: IS_NEW_INVOICE,
			payload: boolean,
		});
	};

	const setEditInvoice = (boolean) => {
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

	const changeShownInvoices = () => {
		dispatch({
			type: CHANGE_SHOWN_INVOICES,
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
	// const addCurrentInvoice = (number) => {
	// 	dispatch({
	// 		type: CURRENT_INVOICE,
	// 		payload: number,
	// 	});

	// 	dispatch ({
	// 		type: CURRENT_INVOICE_DATA,
	// 		payload: number
	// 	})
	// };

	// const addNewInvoice = (formData) => {
	// 	dispatch({
	// 		type: NEW_INVOICE_FORM,
	// 		payload: formData,
	// 	});
	// 	dispatch({
	// 		type: ADD_TO_ALL_INVOICES
	// 	})
	// };

	// const markAsPaid = (number) => {
	// 	dispatch({
	// 		type: MARK_PAID,
	// 		payload: number,
	// 	});
	// };

	// const onFilterClick = (filter) => {
	//   dispatch({
	//     type: CHANGE_FILTERS,
	//     payload: filter
	//   })
	//   dispatch({
	//     type: FILTER_INVOICES,
	//   })
	// }

	// const onClickBack = () => {
	//   dispatch ({
	//     type: CLICK_BACK,
	//   })
	// }

	// const onClickAdd = () => {
	// 	dispatch({
	// 		type: RESET_CURRENT_INVOICE,
	// 	})
	// }

	// const clickSaveStatus = (status) => {
	// 	dispatch({
	// 		type: CHOSEN_STATUS,
	// 		payload: status
	// 	})
	// }

	// const clickChangeInvoice = (invoice) => {
	// 	dispatch({
	// 		type: CHANGED_INVOICE,
	// 		payload: invoice
	// 	})
	// }
	// }

	const value = {
		invoices: state.invoices,
		invoiceItems: state.invoiceItems,
		visibleInvoices: state.visibleInvoices,
		// initialInvoices: state.initialInvoices,
		// newInvoiceForm: state.newInvoiceForm,
		// invoiceDetails: state.invoiceDetails,
		// isEditInvoiceForm: state.isEditInvoiceForm,
		// deleteConfirmation: state.deleteConfirmation,
		// currentInvoice: state.currentInvoice,
		// currentInvoiceData: state.currentInvoiceData,
		filters: state.filters,
		// error: state.error,
		// currentStatus: state.currentStatus,
		// changedInvoice: state.changedInvoice,
		isNewInvoice: state.isNewInvoice,
		isPreviewInvoice: state.isPreviewInvoice,
		isEditInvoice: state.isEditInvoice,
		formState: state.formState,
		currentInvoiceNumber: state.currentInvoiceNumber,
		isDeleteConf: state.isDeleteConf,
		setCurrentInvoiceNumber,
		// deleteButtonClick,
		// addCurrentInvoice,
		// addNewInvoice,
		// onFilterClick,
		// onClickBack,
		// onClickAdd,
		// clickSaveStatus,
		// clickChangeInvoice,
		setNewInvoice,
		setPreviewInvoice,
		setEditInvoice,
		resetForm,
		changeFilters,
		changeShownInvoices,
		markAsPaid,
		confirmDeletion,
		setDeleteConf,
		addNewFormfield,
		deleteNewFormfield,
		addToAllInvoices,
		getAllInvoices,
		getAllInvoicesItems,
		setVisibleInvoices,
	};

	return <InvoiceContext.Provider value={value}>
					{children}
				</InvoiceContext.Provider>;
};

export default InvoiceState;
