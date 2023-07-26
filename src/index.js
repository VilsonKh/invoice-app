import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import InvoiceState from "./context/invoice/invoiceState";

import "bootstrap/dist/js/bootstrap.bundle.min";
import "./components/customBootstrap.scss";
import DarkState from "./context/dark/darkState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<InvoiceState>
			<DarkState>
				<App />
			</DarkState>
		</InvoiceState>
	</React.StrictMode>
);
