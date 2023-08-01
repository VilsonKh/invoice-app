import ConfirmDelete from "./ConfirmDelete";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import darkContext from "../../context/dark/darkContext";
import invoiceContext from "../../context/invoice/invoiceContext";



const renderDeleteConf = (deleteBool) => {
  const dark = false;
  const currentInvoiceNumber = 'FV2353';
  const currentInvoiceId = 'hMxRPU7OEu51CfdN90OI';
  const setDeleteConf = () => {};
  const setPreviewInvoice = () => {};
  const isDeleteConf = deleteBool;

  render(
    <darkContext.Provider value={{dark}}>
      <invoiceContext.Provider value={{currentInvoiceNumber, currentInvoiceId, setDeleteConf, setPreviewInvoice, isDeleteConf}}>
        <ConfirmDelete/>
      </invoiceContext.Provider>
    </darkContext.Provider>
  )
}

test('конмпонент должен рендерится, когда стейт isDeleteConf установлен в true', () => {
  renderDeleteConf(true);

  const deleteHeading = screen.getByRole('heading');
  expect(deleteHeading).toBeInTheDocument()
})

