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
import TestForm from "./components/Form/TestForm";
import TestComponent from "./components/TestComponent";


function App() {
	const { isNewInvoice, isPreviewInvoice, isEditInvoice } = useContext(invoiceContext);

	const [animate, setAnimate] = useState(false)

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [isNewInvoice, isPreviewInvoice, isEditInvoice]);

	return (
		<DarkState>
			<Header></Header>
			<main>
				<Form/>
				{isPreviewInvoice ? <InvoicePreview /> : <InvoicesList />}
				<button style={{marginLeft: "100px"}} onClick={() => setAnimate(!animate)}>ANIMATE</button>
				<TestComponent setAnimate={setAnimate} animate={animate}></TestComponent>
			</main>
		</DarkState>
	);
}

export default App;
