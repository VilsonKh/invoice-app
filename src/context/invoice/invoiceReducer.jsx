import {
	ADD_NEW_FORMFIELD,
	ADD_TO_ALL_INVOICES,
	CHANGE_FILTERS,
	CONFIRM_DELETE,
	CURRENT_INVOICE_NUMBER,
	DELETE_NEW_FORMFIELD,
	GET_ALL_INVOICES,
	IS_DELETE_CONF,
	IS_EDIT_INVOICE,
	IS_NEW_INVOICE,
	IS_PREVIEW_INVOICE,
	MARK_AS_PAID,
	RESET_FORM,
	SET_VISIBLE_INVOICES,
	GET_INVOICE_ITEMS,
	SET_CURRENT_INVOICE_ID,
	SET_DEFAULT_FILTERS,
	SET_IS_PENDING,
} from "../types";

export const initialState = {
	invoices: [],
	invoiceItems: [],
	currentInvoiceId: '',
	visibleInvoices: '',
	isNewInvoice: false,
	isPreviewInvoice: false,
	isEditInvoice: false,
	isDeleteConf: false,
	confirmDeletion: false,
	currentInvoiceNumber: "",
	filters: ["paid", "pending", "draft"],
	isPending: false,
};

const invoiceReducer = (state, action) => {
	switch (action.type) {

		case GET_INVOICE_ITEMS:
			return {
				...state,
				invoiceItems: [...action.payload],
			};
		
		case SET_IS_PENDING:
			return {
				...state,
				isPending: action.payload,
			}

		case SET_VISIBLE_INVOICES:
			return {
				...state,
				visibleInvoices: action.payload
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

		case RESET_FORM:
			return {
				...state,
				formState: {
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
					items: [{}],
					description: "",
				},
			};

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

		case MARK_AS_PAID:
			const invoicesArr = [...state.invoices];
			invoicesArr.map((invoice) => {
				if (invoice.id === state.currentInvoiceNumber) {
					invoice.status = "paid";
				}
				return invoice;
			});
			return {
				...state,
				invoices: state.invoices,
			};

		case IS_DELETE_CONF:
			return {
				...state,
				isDeleteConf: action.payload,
			};

		case CONFIRM_DELETE:
			const newArr = [...state.invoices];
			const deletedInvoiceArr = newArr.filter((invoice) => {
				return invoice.id !== state.currentInvoiceNumber;
			});

			return {
				...state,
				invoices: deletedInvoiceArr,
			};

		case ADD_NEW_FORMFIELD:
			const newInvoiceItems = [...state.invoiceItems]
			newInvoiceItems.push({invoiceId: action.payload, name: '', price: '', total: '', quantity: ''});
			return {
				...state,
				incoiceItems: [...newInvoiceItems],
			};

		case DELETE_NEW_FORMFIELD:
			const formItemArr = { ...state.formState };
			formItemArr.items.pop();
			return {
				...state,
				formState: formItemArr,
			};

		case ADD_TO_ALL_INVOICES:
			const addedInvoicesArr = [...state.invoices];
			const newID = action.payload.id;

			if (state.isNewInvoice) {
				addedInvoicesArr.push(action.payload);
			} else if (state.isEditInvoice) {
				addedInvoicesArr.forEach((invoice, index) => {
					if (invoice.id === newID) {
						addedInvoicesArr.splice(index, 1, action.payload);
					}
				});
			}

			return {
				...state,
				invoices: addedInvoicesArr,
			};

		default:
			return state;
	}
};

export default invoiceReducer;
