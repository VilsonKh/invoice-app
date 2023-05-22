//styles
import "./App.scss";
//components
import Header from "./components/Header/Header";
import InvoicesList from "./components/InvoicesList/InvoicesList";
import Form from "./components/Form/Form";
//context
import DarkState from "./context/dark/darkState";
import InvoiceState from "./context/invoice/invoiceState";
import invoiceContext from "./context/invoice/invoiceContext";
//hooks
import { useContext, useState } from "react";
//libs
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InvoicePreview from "./components/InvoicePreview/InvoicePreview";

function App() {
	const { isNewInvoice, isPreviewInvoice } = useContext(invoiceContext);
	// const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
	// const [isPreviewOpen, setIsPreviewOpen] = useState(false);

	// //можно использовать prev = !prev
	// const onClickOpenNewInvoiceForm = () => {
	// 	setIsNewInvoiceOpen(true);
	// };

	// const onClickOpenPreview = () => {
	// 	setIsPreviewOpen(true);
	// };

	// const onClickCloseInvoiceForm = () => {
	// 	setIsPreviewOpen(prev => !prev);
	// 	// setIsNewInvoiceOpen((prev) => {
	// 	// 	if (prev === true) {
	// 	// 		return false
	// 	// 	} 
	// 	// });
	// };

	return (
		<DarkState>
			<InvoiceState>
				<Header></Header>
				<main>
					{isNewInvoice && <Form  />}
					{isPreviewInvoice && <InvoicePreview />}
					{<InvoicesList />}
				</main>
			</InvoiceState>
		</DarkState>
	);
}

export default App;
