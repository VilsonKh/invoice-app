import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
import InvoicePreview from "./InvoicePreview";
import invoiceContext from "../../context/invoice/invoiceContext";
import darkContext from "../../context/dark/darkContext";

function renderPreview() {
	const currentInvoiceNumber = "FV2353";
	const dark = false;
	const invoices = [
		{
			id: "hMxRPU7OEu51CfdN90OI",
			clientEmail: "anitaw@gmail.com",
			clientPostCode: "604597",
			fromCountry: "England",
			clientName: "Anita Wainwright",
			clientCity: "Gotham",
			description: "Logo re-design",
			clientStreet: "3964  Queens Lane",
			createdAt: "2023-07-16",
			total: 3102.04,
			senderPostCode: "23423 4",
			fromStreet: "Street",
			clientCountry: "United States of America",
			paymentDue: "2023-07-23",
			invoiceId: "FV2353",
			status: "draft",
			fromCity: "City",
			paymentTerms: "7",
		},
	];
	const invoiceItems = [
		{
			quantity: "1",
			name: "Logo Re-design",
			itemId: "NCdAz7dX19w3SfP1Fgeq",
			total: 3102.04,
			price: "3102.04",
		},
	];

	render(
		<invoiceContext.Provider
			value={{currentInvoiceNumber: currentInvoiceNumber, invoices, invoiceItems }}
		>
			<darkContext.Provider value={{ dark: dark }}>
				<InvoicePreview/>
			</darkContext.Provider>
		</invoiceContext.Provider>
	);
}

test('превью должен корректно рендериться',() => {
  renderPreview();

  const invoicePreview = screen.getByTestId("invoicePreview");
  expect(invoicePreview).toBeInTheDocument()
  
  const invoiceNumber = screen.getByText('FV2353');
  expect(invoiceNumber).not.toBe('')
})