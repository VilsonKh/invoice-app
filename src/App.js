import Header from "./components/Header";
import InvoicesList from "./components/InvoicesList";
import Navigation from "./components/Navigation";
import NewInvoice from "./components/NewInvoice";
import InvoicePreview from "./components/InvoicePreview";
import { useState } from "react";

import "./styles/App.scss"

function App() {

  const [newInvoiceVisible, setnewInvoiceVisible] = useState(false);
  const [previewInvoiceVisible, setPreviewInvoiceVisible] = useState(false);

  const showInvoicePreview = (e) => {
    setPreviewInvoiceVisible(true)
    const target = e.target.closest(['li']).getAttribute("number");
    console.log(target)
  }
  
  const hideInvoicePreview = () => {
    setPreviewInvoiceVisible(false)
  }

  const showNewInvoiceForm =() => {
    setnewInvoiceVisible(true)
  }

  const hideNewInvoiceForm = () => {
    setnewInvoiceVisible(false)
  }

  return (
    <div className="App">
      <Header></Header>
      {newInvoiceVisible && <NewInvoice onHidePreview={hideNewInvoiceForm}></NewInvoice>}
      {previewInvoiceVisible && <InvoicePreview onHidePreview={hideInvoicePreview}></InvoicePreview>}
      <Navigation  onShow={showNewInvoiceForm}></Navigation>
      {!previewInvoiceVisible && <InvoicesList onShowPreview={showInvoicePreview}></InvoicesList>}

    </div>
  );
}

export default App;
