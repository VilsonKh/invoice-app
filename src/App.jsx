import Header from "./components/Header";
import InvoicesList from "./components/InvoicesList";
import NewInvoice from "./components/NewInvoice";
import InvoicePreview from "./components/InvoicePreview";
import Page404 from "./components/Page404";
import InvoiceState from "./context/invoice/invoiceState";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import "./App.scss";
import DarkState from "./context/dark/darkState";
import EditInvoice from "./components/EditInvoice";
import darkContext from "./context/dark/darkContext";

function App() {
	// const showInvoicePreview = (e) => {
	// 	const target = e.target.closest(["li"]).getAttribute("number");
	// 	console.log(target);
	// };

	const [openedInvoice, setOpenedInvoice] = useState("");
	const {toggleDarkMode} = useContext(darkContext)


	const onDelete = (id, someData) => {
		console.log(`deleted ${id}`);
		someData.splice(
			someData.findIndex((elem) => elem.id === id),
			1
		);
	};



	return (
		<DarkState>
			<Router>
				<div className="App">
					<Header></Header>
					<InvoiceState>
						<main>
							<Routes>
								<Route path="/new" element={<NewInvoice />} />
								<Route path="/:invoiceId" element={<InvoicePreview setOpenedInvoice={setOpenedInvoice} openedInvoice={openedInvoice} />}/>
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
