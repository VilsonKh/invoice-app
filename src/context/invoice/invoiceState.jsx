import React from "react";
import InvoiceContext from "./invoiceContext";
import data from '../../data.json'

const InvoiceState = (props) => {

	return (
		<InvoiceContext.Provider
			value={{
				invoices: [...data],
				newInvoiceForm: false,
				invoiceDetails: false,
				editInvoiceForm: false,
				deleteConfirmation: false,
				currentInvoice: null,
				filters: ["paid", "pending", "draft"],
				error: null,
			}}
		>
			{props.children}
		</InvoiceContext.Provider>
	);
};

export default InvoiceState;
