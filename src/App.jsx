//styles
import "./App.scss";
import "./components/darkTheme.scss";
//components
import Header from "./components/Header/Header";
import InvoicesList from "./components/InvoicesList/InvoicesList";
import Form from "./components/Form/Form";
//context
import DarkState from "./context/dark/darkState";
import invoiceContext from "./context/invoice/invoiceContext";
//hooks
import { useContext, useEffect, useState } from "react";
//libs
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InvoicePreview from "./components/InvoicePreview/InvoicePreview";

function App() {
	const { isNewInvoice, isPreviewInvoice, isEditInvoice } = useContext(invoiceContext);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [isNewInvoice, isPreviewInvoice, isEditInvoice]);

	return (
		<DarkState>
			<Header></Header>
			<main>
				{isNewInvoice && <Form />}
				{isPreviewInvoice && <InvoicePreview />}
				{!isPreviewInvoice && <InvoicesList />}
			</main>
		</DarkState>
	);
}

export default App;
