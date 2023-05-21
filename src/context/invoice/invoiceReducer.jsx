import {
	NEW_INVOICE_FORM,
	CHANGE_FILTERS,
	FILTER_INVOICES,
	MARK_PAID,
	CONFIRM_DELETE,
	CURRENT_INVOICE,
	CLICK_BACK,
	CURRENT_INVOICE_DATA,
	RESET_CURRENT_INVOICE,
	ADD_TO_ALL_INVOICES,
	CHOSEN_STATUS,
	CHANGED_INVOICE,
	IS_NEW_INVOICE,
	EDIT_INVOICE_FORM,
} from "../types";

import jsonData from "../../data.json";

export const initialState = {
	invoices: [...jsonData],
	initialInvoices: [...jsonData],
	isNewInvoice: false,
	newInvoiceForm: null,
	invoiceDetails: false,
	isEditInvoiceForm: false,
	confirmDelete: false,
	currentInvoice: "",
	currentInvoiceData: null,
	filters: ["paid", "pending", "draft"],
	error: null,
	currentStatus: "",
	changedInvoice: {},
};

const invoiceReducer = (state, action) => {
	switch (action.type) {
		case NEW_INVOICE_FORM:
			return {
				...state,
				newInvoiceForm: action.payload,
			};

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

		//фильтрует массив по клику на чекбокс
		case FILTER_INVOICES:
			//пробую опять добавить invoices, чтобы новые инвойсы фильтровались
			const filteredInvoices = [...state.invoices];
			const filterResult = filteredInvoices.filter((invoice) => {
				const invoiceStatus = invoice.status;
				const filters = state.filters;
				if (filters.includes(invoiceStatus)) {
					return true;
				}
				return false;
			});

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

		case CURRENT_INVOICE:
			return {
				...state,
				currentInvoice: action.payload,
			};

		case CURRENT_INVOICE_DATA:
			// ЗАМЕНИЛ initialInvoices на invoices, чтобы новые инвойсы тоже были в массиве
			const newInvoicesArr = [...state.invoices];
			const singleInvoiceData = newInvoicesArr.filter((el) => el.id === action.payload);

			return {
				...state,
				currentInvoiceData: singleInvoiceData,
			};

		case CLICK_BACK:
			console.log("click back");
			return {
				...state,
				filters: ["pending", "paid", "draft"],
				isNewInvoice: false,
				isEditInvoiceForm: false
			};

		case RESET_CURRENT_INVOICE:
			return {
				...state,
				currentInvoice: "",
				currentInvoiceData: "",
			};

		case ADD_TO_ALL_INVOICES:
			// const addedInvoiceArr = state.invoices.push(state.newInvoiceForm)
			const newID = state.newInvoiceForm.id;
			let allInvoices = [...state.invoices];

			if (state.currentStatus === "pending" || state.currentStatus === 'draft') {
				allInvoices.forEach((invoice, index) => {
					console.log(newID);
					console.log("начало поиска");
					if (invoice.id === newID) {
						console.log("совпало");
						console.log(state.newInvoiceForm);
						allInvoices.splice(index, 1, state.newInvoiceForm);
					}
					if (newID !== state.currentInvoice) {
						console.log("не совпало");
						allInvoices = [...state.invoices, state.newInvoiceForm];
						return allInvoices;
					}
				});
			}

			return {
				...state,
				invoices: allInvoices,
			};

		case CHOSEN_STATUS:
			let chosenStatus = "";
			if (action.payload === "draft" || action.payload === "pending") {
				chosenStatus = action.payload;
			}
			return {
				...state,
				currentStatus: chosenStatus,
			};

		case CHANGED_INVOICE:
			return {
				...state,
				changedInvoice: action.payload,
			};

		case IS_NEW_INVOICE:
			return {
				...state,
				isNewInvoice: action.payload,
			};
		
			case EDIT_INVOICE_FORM:
				return {
					...state,
					isEditInvoiceForm: action.payload,
				}
		default:
			return state;
	}
};

export default invoiceReducer;
