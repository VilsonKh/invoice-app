import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import InvoicesItem from "./InvoicesItem";
import darkContext from "../../context/dark/darkContext";

function renderInvoiceItem() {
	const currentInvoiceNumber = "FV2353";
	const dark = false;

	const props = {
		id: "hMxRPU7OEu51CfdN90OI",
		name: "Anita Wainwright",
		dateDue: "2023-07-16",
		number: "FV2353",
		status: "draft",
		total: 3102.04,
	};

	render(
		<darkContext.Provider value={{ dark }}>
			<InvoicesItem {...props}/>
		</darkContext.Provider>
	);
}

test('элемент списка инойсов должен корректно рендерится', () => {
  renderInvoiceItem()
  const invoiceStatus = screen.getByText('Draft');
  expect(invoiceStatus).toBeInTheDocument()
})
