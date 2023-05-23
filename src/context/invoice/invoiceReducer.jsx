
import jsonData from "../../data.json";
import { ADD_NEW_FORMFIELD, ADD_TO_ALL_INVOICES, CHANGE_FILTERS, CHANGE_FORM_STATE, CHANGE_SHOWN_INVOICES, CONFIRM_DELETE, CURRENT_INVOICE_NUMBER, DELETE_NEW_FORMFIELD, IS_DELETE_CONF, IS_EDIT_INVOICE, IS_NEW_INVOICE, IS_PREVIEW_INVOICE, MARK_AS_PAID, RESET_FORM } from "../types";

export const initialState = {
	invoices: [...jsonData],
	// initialInvoices: [...jsonData],
	isNewInvoice: false,
	isPreviewInvoice:false,
	isEditInvoice: false,
	isDeleteConf: false,
	confirmDeletion: false,
	// newInvoiceForm: null,
	// invoiceDetails: false,
	// isEditInvoiceForm: false,
	// confirmDelete: false,
	currentInvoiceNumber: "",
	// currentInvoiceData: null,
	 filters: ["paid", "pending", "draft"],
	
	formState: {
		status:'',
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

		case IS_EDIT_INVOICE: 
			return {
				...state,
				isEditInvoice: action.payload,
			}
		
		case CURRENT_INVOICE_NUMBER:
			return {
				...state,
				currentInvoiceNumber: action.payload,
			}

		case CHANGE_FORM_STATE:
			const newInvoicesArr = [...state.invoices];
			const currentInvoiceData = newInvoicesArr.filter((invoice) => invoice.id === state.currentInvoiceNumber)
				
			return {
				...state,
				formState: {
					senderStreet: currentInvoiceData[0].senderAddress.street,
					senderCity: currentInvoiceData[0].senderAddress.city,
					senderPostCode: currentInvoiceData[0].senderAddress.postCode,
					senderCountry: currentInvoiceData[0].senderAddress.country,
					clientName:currentInvoiceData[0].clientName,
					clientEmail:currentInvoiceData[0].clientEmail ,
					clientStreet: currentInvoiceData[0].clientAddress.street,
					clientCity: currentInvoiceData[0].clientAddress.city,
					clientPostCode: currentInvoiceData[0].clientAddress.postCode,
					clientCountry: currentInvoiceData[0].clientAddress.country,
					paymentDue: currentInvoiceData[0].paymentDue,
					paymentTerms: currentInvoiceData[0].paymentTerms,
					items: currentInvoiceData[0].items,
					description: currentInvoiceData[0].description,
					status: currentInvoiceData[0].status
				}
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
					}
				}
			
		case CHANGE_FILTERS:
			let newFilters = [...state.filters];
			const index = newFilters.indexOf(action.payload);
			if (index >= 0) {
				newFilters.splice(index, 1);
			} else {
				newFilters.push(action.payload);
			}
			console.log("изменяю фильтры");
			return {
				...state,
				filters: newFilters,
			};
		
		case CHANGE_SHOWN_INVOICES:

		const filteredInvoices = [...state.invoices];
		console.log(filteredInvoices)
		const filters = state.filters;
		console.log(filters)
		const filterResult = filteredInvoices.map((invoice) => {
			const invoiceStatus = invoice.status;
			if (!filters.includes(invoiceStatus)) {
				invoice.show = false;
			} else if(filters.includes(invoiceStatus)) {
				invoice.show = true;
			}
			return invoice;
		});

			return {
				...state,
				invoices: filterResult,
			}
	
	case MARK_AS_PAID:
		const invoicesArr = [...state.invoices];
		invoicesArr.map((invoice) => {
			console.log(invoice)
			console.log(state.currentInvoiceNumber)
			if(invoice.id === state.currentInvoiceNumber) {
				 invoice.status = 'paid'
			} 
			return invoice
		})
		return {
			...state,
			invoices:state.invoices,
		}
	
	case IS_DELETE_CONF:
		return {
			...state,
			isDeleteConf: action.payload
		}

	case CONFIRM_DELETE:
		const newArr = [...state.invoices]
		const deletedInvoiceArr = newArr.filter((invoice) => {
			return invoice.id !== state.currentInvoiceNumber;
		});

		console.log(deletedInvoiceArr)

		return {
			...state,
			invoices: deletedInvoiceArr,
		}

	case ADD_NEW_FORMFIELD:
		const newFormState = {...state.formState}
		newFormState.items.push({})
		return {
			...state,
			formState: newFormState
		}

	case DELETE_NEW_FORMFIELD:
		const formItemArr = {...state.formState}
		formItemArr.items.pop()
		return {
			...state,
			formState: formItemArr
		}

	case ADD_TO_ALL_INVOICES:
		const addedInvoicesArr = [...state.invoices];
		const newID = action.payload.id;

		if(state.isNewInvoice){
			addedInvoicesArr.push(action.payload);
		} else if (state.isEditInvoice) {
			addedInvoicesArr.forEach((invoice, index) => {
				if (invoice.id === newID) {
					addedInvoicesArr.splice(index, 1, action.payload);
				}
			})
		}
		
		return {
			...state,
			invoices: addedInvoicesArr
		}

    default: 
    return state;
  }
}

export default invoiceReducer;