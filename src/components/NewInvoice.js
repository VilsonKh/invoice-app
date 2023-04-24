import { useState} from "react";

import "../styles/NewInvoice.scss";
import leftArrow from "../assets/icon-arrow-left.svg";
import Form from "./Form";
import ButtonBack from "./ButtonBack";



const NewInvoice = (props) => {

  const[formData,setFormData] = useState();



	return (
		<section className="addInvoice">
			<div className="container">
				<ButtonBack onHide={props.onHide}></ButtonBack>
				<h1 className="addInvoice__heading">New Invoice</h1>
				<Form></Form>
        <div className="addInvoice__groupButtons">
          <button type="submit" form="newInvoice" id='discard' className="addInvoice__discard btn-status">Discard</button>
          <button type="submit" form="newInvoice" id='draft' className="addInvoice__draft btn-status">Save ad Draft</button>
          <button type="submit" form="newInvoice" id="pending" className="addInvoice__send btn-status">Save & Send</button>
        </div>
			</div>
		</section>
	);
};

export default NewInvoice;
