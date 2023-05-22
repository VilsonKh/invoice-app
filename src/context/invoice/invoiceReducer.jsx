
import jsonData from "../../data.json";
import { CURRENT_INVOICE_NUMBER, IS_NEW_INVOICE, IS_PREVIEW_INVOICE } from "../types";

export const initialState = {
	invoices: [...jsonData],
	// initialInvoices: [...jsonData],
	isNewInvoice: false,
	isPreviewInvoice:false,
	// newInvoiceForm: null,
	// invoiceDetails: false,
	// isEditInvoiceForm: false,
	// confirmDelete: false,
	currentInvoiceNumber: "",
	// currentInvoiceData: null,
	 filters: ["paid", "pending", "draft"],
	// error: null,
	// currentStatus: "",
	// changedInvoice: {},
	
	initialFormState: {
		senderStreet: "",
		senderCity: "",
		senderPostCode: "",
		senderCountry: "",
		clientName: "",
		clientEmail: "",
		clientStreet: "",
		clientCity: "",
		clientPostCode: "",
		clientCountry: "",
		paymentDue: "",
		paymentTerms: "",
		items: "",
		description: "",
	}
};

const invoiceReducer = (state, action) => {
  switch (action.type) {
		case IS_NEW_INVOICE:
			console.log('isNewInvoice: true')
			return {
				...state,
				isNewInvoice: action.payload,
			};

		case IS_PREVIEW_INVOICE:
			console.log('isPreviewInvoice: true')
			return {
				...state,
				isPreviewInvoice: action.payload,
			}
		
		case CURRENT_INVOICE_NUMBER:
			return {
				...state,
				currentInvoiceNumber: action.payload,
			}
    default: 
    return state;
  }
}

export default invoiceReducer;