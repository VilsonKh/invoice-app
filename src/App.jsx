//styles
import "./App.scss";
import "./components/darkTheme.scss";
//components
import Header from "./components/Header/Header";
import InvoicesList from "./components/InvoicesList/InvoicesList";
import Form from "./components/Form/Form";
//context
import invoiceContext from "./context/invoice/invoiceContext";
//hooks
import { useContext, useEffect } from "react";
//libs
import InvoicePreview from "./components/InvoicePreview/InvoicePreview";

function App() {
	const { isNewInvoice, isPreviewInvoice, isEditInvoice, isDeleteConf } = useContext(invoiceContext);

	useEffect(() => {
		window.scrollTo(0, 0);
		if ((isNewInvoice || isEditInvoice || isDeleteConf) && window.screen.width > 767) {
			window.document.body.className = "blockScroll";
		} else {
			window.document.body.className = "";
		}
	}, [isNewInvoice, isPreviewInvoice, isEditInvoice, isDeleteConf]);




	return (
		<>
			<Header></Header>
			<main>
				<Form />
				{isPreviewInvoice ? <InvoicePreview /> : <InvoicesList />}
			</main>
		</>
	);
}

export default App;
