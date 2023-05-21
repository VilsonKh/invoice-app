import Header from "./components/Header";
import InvoicesList from "./components/InvoicesList";
import NewInvoice from "./components/NewInvoice";
import InvoicePreview from "./components/InvoicePreview";
import Page404 from "./components/Page404";
import InvoiceState from "./context/invoice/invoiceState";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCallback, useContext, useState } from "react";

import "./styles/customBootstrap.scss";
import "./App.scss";
import DarkState from "./context/dark/darkState";
import invoiceContext from "./context/invoice/invoiceContext";

function App() {
	const [openedInvoice, setOpenedInvoice] = useState("");
	const [clickNewInvoice, setClickNewInvoice] = useState(false)

const {isNewInvoice} = useContext(invoiceContext)
	return (
		<DarkState>
			<Router>
				<div className="App">
					<Header></Header>
					<InvoiceState>
						<main>
							{clickNewInvoice ? <NewInvoice clickButtons={setClickNewInvoice}/> : ''}
							<Routes>
								
								<Route path="/:invoiceId" element={<InvoicePreview setOpenedInvoice={setOpenedInvoice} />} />
								<Route path="/" element={<InvoicesList currentInvoice={openedInvoice} setClickNewInvoice={setClickNewInvoice}/>} />
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
