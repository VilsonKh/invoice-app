import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./Form";
import invoiceContext from "../../context/invoice/invoiceContext";
import darkContext from "../../context/dark/darkContext";

function renderForm(newInvoice, editInvoice) {
	let isEditInvoice = editInvoice;
	let isNewInvoice = newInvoice;
	const currentInvoiceNumber = "FV2353";
	const setIsEditInvoice = () => (isEditInvoice = true);
	const setIsNewInvoice = () => (isNewInvoice = true);
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
			quantity: "3",
			name: "Design",
			itemId: "NCdAz7dX19w3SfP1Fgeq",
			total: 5000,
			price: "15000",
		},
    {
			quantity: "1",
			name: "Logo Re-design",
			itemId: "2983rufj34wei239084",
			total: 3102.04,
			price: "3102.04",
		},
	];

	render(
		<invoiceContext.Provider
			value={{ isNewInvoice: isNewInvoice, isEditInvoice: isEditInvoice, currentInvoiceNumber: currentInvoiceNumber, setIsEditInvoice, setIsNewInvoice, invoices, invoiceItems }}
		>
			<darkContext.Provider value={{ dark: dark }}>
				<Form />
			</darkContext.Provider>
		</invoiceContext.Provider>
	);
}

test("если isNewInvoice = true, форма должна быть пустой", async () => {
	renderForm(true, false);
	const formInput = await screen.findByTestId("testInput");
	expect(formInput.value).toBe("");
});

test("если isEditInvoice = true, форма должна быть заполненной", () => {
	renderForm(false, true);
	const formInput = screen.getByTestId("testInput");
	expect(formInput.value).not.toBe("");
});

test('кнопки редактирования формы рендерятся корректно', () => {
  renderForm(true, false);
  const saveInvoiceButton = screen.getByText("Save as Draft")
  expect(saveInvoiceButton).toBeInTheDocument();
})

test('кнопки создания новой формы ренедерятся корректно', () => {
  renderForm(false, true);
  const editInvoiceButton = screen.getByText('Save Changes');
  expect(editInvoiceButton).toBeInTheDocument();
})

test('кнопка удаления заблокирована, если в форме есть только 1 динамическое поле', () => {
  renderForm(false,true);
  const deleteItemButton = screen.getByTestId('deleteButton');
  expect(deleteItemButton.getAttribute('disabled')).toBe('')
})
