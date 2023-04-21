import Header from "./components/Header";
import InvoicesList from "./components/InvoicesList";
import Navigation from "./components/Navigation";


import "./styles/App.scss"
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Navigation></Navigation>
      <InvoicesList></InvoicesList>

    </div>
  );
}

export default App;
