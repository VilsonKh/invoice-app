import Header from "./components/Header";
import InvoicesList from "./components/InvoicesList";
import NewInvoice from "./components/NewInvoice";
import InvoicePreview from "./components/InvoicePreview";
import Page404 from "./components/Page404";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import "./styles/App.scss";

function App() {
	// const showInvoicePreview = (e) => {
	// 	const target = e.target.closest(["li"]).getAttribute("number");
	// 	console.log(target);
	// };

	const [openedInvoice, setOpenedInvoice] = useState("");

	console.log(openedInvoice);

	
	return (
		<Router>
			<div className="App">
				<Header></Header>
				<main>
					<Routes>
						<Route path="/new" element={<NewInvoice />} />
						<Route path="/:invoiceId" element={<InvoicePreview setOpenedInvoice={setOpenedInvoice} />} />
						<Route path="/" element={<InvoicesList currentInvoice={openedInvoice} />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
