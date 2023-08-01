import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import darkContext from "../../context/dark/darkContext";
import invoiceContext from "../../context/invoice/invoiceContext";
import InvoicesList from "./InvoicesList";

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
	{
		id: "hMxRPU7OEu51CfdN90O",
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
const filters = ['paid', 'pending', 'draft']

function renderInvoiceList(invoices, filters) {
	const currentInvoiceNumber = "FV2353";
	const dark = false;
	
	const invoiceItems = [
		{
			quantity: "1",
			name: "Logo Re-design",
			itemId: "NCdAz7dX19w3SfP1Fgeq",
			total: 3102.04,
			price: "3102.04",
		},
	];
  const setCurrentInvoiceNumber = () =>{};
  const setPreviewInvoice = () => {};
  const getInvoiceItems = () => {};
  const isPending = false;

  const setIsPending = () => {};
	render(
		<invoiceContext.Provider
			value={{  currentInvoiceNumber: currentInvoiceNumber, invoices, invoiceItems, setCurrentInvoiceNumber, setPreviewInvoice, getInvoiceItems, isPending, filters, setIsPending}}
		>
			<darkContext.Provider value={{ dark: dark }}>
				<InvoicesList/>
			</darkContext.Provider>
		</invoiceContext.Provider>
	);
}

test('InvoiceList рендерит корректное количество элементов списка', () => {
  renderInvoiceList(invoices, filters);

  const listItems = screen.getAllByTestId('invoiceItem') 
  expect(listItems.length).toEqual(2)
})

test('если массив инвойсов пуст, то на странице рендерится заглушка', () => {
	renderInvoiceList([], filters);

	const noInvoiceImage = screen.getByAltText('noInvoiceImage');
	expect(noInvoiceImage).toBeInTheDocument()
})

test("если массив фильтров пуст, то на странице рендерится заглушка", () => {
	renderInvoiceList(invoices, []);

	const noInvoiceImage = screen.getByAltText('noInvoiceImage');
	expect(noInvoiceImage).toBeInTheDocument()
})