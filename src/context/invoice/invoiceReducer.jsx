import {
	CHANGE_FILTERS,
	CURRENT_INVOICE_NUMBER,
	GET_ALL_INVOICES,
	IS_INCOICESLIST_VISIBLE,
	IS_DELETE_CONF,
	IS_EDIT_INVOICE,
	IS_NEW_INVOICE,
	IS_PREVIEW_INVOICE,
	GET_INVOICE_ITEMS,
	SET_CURRENT_INVOICE_ID,
	SET_IS_PENDING,
	SET_DEFAULT_FILTERS,
} from "../types";

export const initialState = {
	invoices: [],
	invoiceItems: [],
	currentInvoiceId: '',
	isNewInvoice: false,
	isPreviewInvoice: false,
	isEditInvoice: false,
	isDeleteConf: false,
	isInvoicesListVisible: true,
	confirmDeletion: false,
	currentInvoiceNumber: "",
	filters: ["paid", "pending", "draft"],
	isPending: false,
};

const invoiceReducer = (state, action) => {
	switch (action.type) {

		case GET_INVOICE_ITEMS:
			const updateInvoiceItems = [...action.payload]
			return {
				...state,
				invoiceItems: [...updateInvoiceItems],
			};
		
		case SET_IS_PENDING:
			return {
				...state,
				isPending: action.payload,
			}

		case GET_ALL_INVOICES:
			return {
				...state,
				invoices: [...action.payload],
			};

		case IS_NEW_INVOICE:
			return {
				...state,
				isNewInvoice: action.payload,
			};

		case IS_PREVIEW_INVOICE:
			return {
				...state,
				isPreviewInvoice: action.payload,
			};

		case IS_EDIT_INVOICE:
			return {
				...state,
				isEditInvoice: action.payload,
			};

		case CURRENT_INVOICE_NUMBER:
			return {
				...state,
				currentInvoiceNumber: action.payload,
			};

		case SET_CURRENT_INVOICE_ID:
			return {
				...state,
				currentInvoiceId: action.payload,
			}

		case CHANGE_FILTERS:
			let newFilters = [...state.filters];
			const index = newFilters.indexOf(action.payload);
			if (index >= 0) {
				newFilters.splice(index, 1);
			} else {
				newFilters.push(action.payload);
			}
			return {
				...state,
				filters: newFilters,
			};

			case SET_DEFAULT_FILTERS:
			return {
				...state,
				filters: ["paid", "pending", "draft"]
			}

		case IS_DELETE_CONF:
			return {
				...state,
				isDeleteConf: action.payload,
			};
		case IS_INCOICESLIST_VISIBLE:
			return {
				...state,
				isInvoicesListVisible: action.payload,
			}

		default:
			return state;
	}
};

export default invoiceReducer;
