import "../styles/NewInvoice.scss";
import Form from "./Form";
import ButtonBack from "./ButtonBack";
import { useContext } from "react";
import invoiceContext from "../context/invoice/invoiceContext";



const NewInvoice = ({clickButtons}) => {

	const {clickSaveStatus} = useContext(invoiceContext);

	const onClickButtonGroup = (e)=> {
		console.log('ButtonGroup click')
		const currentStatus = e.target.id;
		//передает в context "pending", "draft", "discard"
		clickSaveStatus(currentStatus);
	}

	

	return (
		<>
			<div className="addInvoice__overlay"></div>
			<section className="addInvoice">
					<div className="container">
						<ButtonBack onCloseNewInvoiceForm={clickButtons}></ButtonBack>
						<h1 className="addInvoice__heading">New Invoice</h1>
						<Form onClickButton={(e) => onClickButtonGroup(e)} onCloseNewForm={clickButtons}></Form>
		        <div className="addInvoice__groupButtons" onClick={(e)=> onClickButtonGroup(e)}>
		          <button type="submit" form="newInvoice" id='discard' className="addInvoice__discard btn-status" >Discard</button>
		          <button type="submit" form="newInvoice" id='draft' className="addInvoice__draft btn-status" >Save as Draft</button>
		          <button type="submit" form="newInvoice" id="pending" className="addInvoice__send btn-status" >Save & Send</button>
		        </div>
					</div>
			</section>
		</>
	);
};

export default NewInvoice;
