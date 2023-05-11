import {
	NEW_INVOICE_FORM,
	INVOICE_DETAILS,
	DELETE_CONFIRMATION,
	EDIT_INVOICE_FORM,
	DISCARD,
	FILTER_INVOICES,
	MARK_PAID,
	CANCEL_DELETE,
	CONFIRM_DELETE,
	CANCEL_EDIT,
	SAVE_CHANGES,
	INVOICE_ERROR,
	CURRENT_INVOICE,
	GET_INVOICES
} from "../types";

export const initialState = {
	invoices: [],
	newInvoiceForm: null,
	invoiceDetails: false,
	editInvoiceForm: false,
	deleteConfirmation: false,
	currentInvoice: null,
	filters: ["paid", "pending", "draft"],
	error: null,
};

const invoiceReducer = (state, action) => {
	switch (action.type) {

		case GET_INVOICES: 
		return {
			...state,
			invoices:action.payload
		}
		case NEW_INVOICE_FORM:
			return {
				...state,
				newInvoiceForm: action.payload,
			};
		case INVOICE_DETAILS:
			return {
				...state,
				currentUser: action.payload,
				invoiceDetails: true,
			};

		case EDIT_INVOICE_FORM:
			return {
				...state,
				editInvoiceForm: action.payload,
			};
		case DELETE_CONFIRMATION:
			return {
				...state,
				deleteConfirmation: action.payload,
			};
		case CANCEL_DELETE:
			return {
				...state,
				deleteConfirmation: action.payload,
			};
		case DISCARD:
			return {
				...state,
				newInvoiceForm: action.payload,
			};
		case FILTER_INVOICES:
			return {
				...state,
				filters: action.payload,
			};
		case MARK_PAID:
			return {
				...state
				
			};
		case CONFIRM_DELETE:
			return {
				...state,
				currentUser: null,
				invoiceDetails: false,
				filters: ["draft", "pending", "paid"],
				deleteConfirmation: false,
				invoices: action.payload,
			};
		case CANCEL_EDIT:
			return {
				...state,
				editInvoiceForm: action.payload,
			};
		case SAVE_CHANGES:
			return {
				...state,
				invoices: action.payloadOne,
				currentUser: action.payloadTwo,
				editInvoiceForm: false,
			};
		case INVOICE_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case CURRENT_INVOICE:
			return{
				...state,
				currentInvoice: action.payload
			}
		default:
			return state;
	}
};

export default invoiceReducer;
