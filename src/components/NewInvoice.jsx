import "../styles/NewInvoice.scss";
import Form from "./Form";
import ButtonBack from "./ButtonBack";
import { useContext } from "react";
import invoiceContext from "../context/invoice/invoiceContext";



const NewInvoice = (props) => {

	const {clickSaveStatus} = useContext(invoiceContext);

	const onClickButtonGroup = (e)=> {
		const currentStatus = e.target.id;
		clickSaveStatus(currentStatus)
	}

	return (
		<section className="addInvoice">
			<div className="container">
				<ButtonBack ></ButtonBack>
				<h1 className="addInvoice__heading">New Invoice</h1>
				<Form onClickButton={(e) => onClickButtonGroup(e)}></Form>
        <div className="addInvoice__groupButtons" onClick={(e)=> onClickButtonGroup(e)}>
          <button type="submit" form="newInvoice" id='discard' className="addInvoice__discard btn-status">Discard</button>
          <button type="submit" form="newInvoice" id='draft' className="addInvoice__draft btn-status">Save as Draft</button>
          <button type="submit" form="newInvoice" id="pending" className="addInvoice__send btn-status">Save & Send</button>
        </div>
			</div>
		</section>
	);
};

export default NewInvoice;
