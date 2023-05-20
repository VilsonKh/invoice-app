import Header from "./components/Header";
import InvoicesList from "./components/InvoicesList";
import NewInvoice from "./components/NewInvoice";
import InvoicePreview from "./components/InvoicePreview";
import Page404 from "./components/Page404";
import InvoiceState from "./context/invoice/invoiceState";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useContext } from "react";

import "./styles/customBootstrap.scss";
import "./App.scss";
import DarkState from "./context/dark/darkState";

function App() {
	const [openedInvoice, setOpenedInvoice] = useState("");

	return (
		<DarkState>
			<Router>
				<div className="App">
					<Header></Header>
					<InvoiceState>
						<main>
							<Routes>
								<Route path="/new" element={<NewInvoice />} />
								<Route path="/:invoiceId" element={<InvoicePreview setOpenedInvoice={setOpenedInvoice} openedInvoice={openedInvoice} />} />
								<Route path="/" element={<InvoicesList currentInvoice={openedInvoice} />} />
								<Route path="*" element={<Page404 />} />
							</Routes>
						</main>
					</InvoiceState>
				</div>
			</Router>
		</DarkState>
	);
}

export default App;
