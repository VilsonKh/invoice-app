import Header from "./components/Header";
import InvoicesList from "./components/InvoicesList";
import Navigation from "./components/Navigation";
import NewInvoice from "./components/NewInvoice";
import InvoicePreview from "./components/InvoicePreview";
import { useState } from "react";

import "./styles/App.scss"

function App() {

  const [newInvoiceVisible, setnewInvoiceVisible] = useState(false)

  const showNewInvoiceForm =() => {
    setnewInvoiceVisible(true)
  }

  const hideNewInvoiceForm = () => {
    setnewInvoiceVisible(false)
  }

  return (
    <div className="App">
      <Header></Header>
      {newInvoiceVisible && <NewInvoice onHide={hideNewInvoiceForm}></NewInvoice>}
      <InvoicePreview></InvoicePreview>
      <Navigation  onShow={showNewInvoiceForm}></Navigation>
      <InvoicePreview></InvoicePreview>

    </div>
  );
}

export default App;
