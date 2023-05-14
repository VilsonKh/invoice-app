import {
	NEW_INVOICE_FORM,
	INVOICE_DETAILS,
	EDIT_INVOICE_FORM,
	DISCARD,
	CHANGE_FILTERS,
	FILTER_INVOICES,
	MARK_PAID,
	CANCEL_DELETE,
	CONFIRM_DELETE,
	CANCEL_EDIT,
	SAVE_CHANGES,
	INVOICE_ERROR,
	CURRENT_INVOICE,
	CLICK_BACK
} from "../types";

import jsonData from "../../data.json";

export const initialState = {
	invoices: [...jsonData],
	filteredInvoices: [...jsonData],
	newInvoiceForm: null,
	invoiceDetails: false,
	editInvoiceForm: false,
	confirmDelete: false,
	currentInvoice: null,
	filters: ["paid", "pending", "draft"],
	error: null,
};

const invoiceReducer = (state, action) => {
	switch (action.type) {
		case NEW_INVOICE_FORM:
			return {
				...state,
				newInvoiceForm: action.payload,
			};
		// case INVOICE_DETAILS:
		// 	return {
		// 		...state,
		// 		currentUser: action.payload,
		// 		invoiceDetails: true,
		// 	};

		// case EDIT_INVOICE_FORM:
		// 	return {
		// 		...state,
		// 		editInvoiceForm: action.payload,
		// 	};
		// case CANCEL_DELETE:
		// 	return {
		// 		...state,
		// 		deleteConfirmation: action.payload,
		// 	};
		// case DISCARD:
		// 	return {
		// 		...state,
		// 		newInvoiceForm: action.payload,
		// 	};
		case CHANGE_FILTERS:
			let newFilters = [...state.filters];
			const index = newFilters.indexOf(action.payload);
			if (index >= 0) {
				newFilters.splice(index, 1);
			} else {
				newFilters.push(action.payload);
			}
			console.log('изменяю фильтры')
			return {
				...state,
				filters: newFilters,
			};
			
		case FILTER_INVOICES: //
		const filteredInvoices = [...state.filteredInvoices]; 
		const filterResult = filteredInvoices.filter((invoice) => {
			const invoiceStatus = invoice.status;
			const filters = state.filters;
			// return filters.includes(invoiceStatus)
			if (filters.includes(invoiceStatus)) {
				return true;
			}
			return false
		});
		console.log("filtring")
			return {
				...state,
				invoices: filterResult,
			};

		case MARK_PAID:
			const newInvoices = [...state.invoices];
			const newInvoiceArr = newInvoices.map((invoice) => {
				if (invoice.id === action.payload) {
					return { ...invoice, status: "paid" };
				} else {
					return invoice;
				}
			});
			return {
				...state,
				invoices: [...newInvoiceArr],
			};
		case CONFIRM_DELETE:
			const deletedInvoice = [...state.invoices];
			const deletedInvoiceArr = deletedInvoice.filter((invoice) => {
				return invoice.id !== state.currentInvoice;
			});
			return {
				...state,
				confirmDelete: action.payload,
				invoices: deletedInvoiceArr,
			};
		// case CANCEL_EDIT:
		// 	return {
		// 		...state,
		// 		editInvoiceForm: action.payload,
		// 	};
		// case SAVE_CHANGES:
		// 	return {
		// 		...state,
		// 		invoices: action.payloadOne,
		// 		currentUser: action.payloadTwo,
		// 		editInvoiceForm: false,
		// 	};
		// case INVOICE_ERROR:
		// 	return {
		// 		...state,
		// 		error: action.payload,
		// 	};
		case CURRENT_INVOICE:
			return {
				...state,
				currentInvoice: action.payload,
			};
		case CLICK_BACK:
			console.log('click back')
			return {
				...state,
				filters: ['pending', 'paid', 'draft']
			};
		default:
			return state;
	}
	

};

export default invoiceReducer;
