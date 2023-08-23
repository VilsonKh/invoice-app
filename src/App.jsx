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
import { useContext, useEffect, useLayoutEffect } from "react";
//libs
import InvoicePreview from "./components/InvoicePreview/InvoicePreview";
import darkContext from "./context/dark/darkContext";
import { tabWidth } from "./components/helpers/const";

function App() {
	const { isNewInvoice, isPreviewInvoice, isEditInvoice, isDeleteConf, isInvoicesListVisible } = useContext(invoiceContext);
	const {toggleDarkMode} = useContext(darkContext)

	useEffect(() => {
		window.scrollTo(0, 0);
		if ((isNewInvoice || isEditInvoice || isDeleteConf) && window.screen.width > tabWidth) {
			window.document.body.className = "blockScroll";
		} else {
			window.document.body.className = "";
		}
		//eslint-disable-next-line
	}, [isNewInvoice, isPreviewInvoice,isDeleteConf]);

	useLayoutEffect(() => {
		if (localStorage.getItem("dark") === null) {
			if (window.matchMedia("(prefers-color-scheme: dark").matches) {
				toggleDarkMode();
			}
		} else if (localStorage.getItem("dark") === 'true') {
			toggleDarkMode()
		} else {
			return
		}
		//eslint-disable-next-line
	}, []);

	return (
		<>
			<div className="themeWrapper">
				<Header></Header>
				<main>
					{<Form />}
					<InvoicePreview/>
					{isInvoicesListVisible && <InvoicesList/>}
				</main>
			</div>
		</>
	);
}

export default App;
