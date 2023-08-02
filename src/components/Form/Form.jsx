//styles
import "./Form.scss";
//components
import FormPartBillFrom from "./FormParts/FormPartBillFrom";
import FormPartBillTo from "./FormParts/FormPartBillTo";
import FormPartItemsList from "./FormParts/FormPartItemsList";
import EditInvoiceButtons from "../EditInvoiceButtons/EditInvoiceButtons";
import NewInvoiceButtons from "../NewInvoiceButtons/NewInvoiceButtons";
import ButtonBack from "../ButtonBack/ButtonBack";
//hooks
import { useContext, useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
//context
import invoiceContext from "../../context/invoice/invoiceContext";
import darkContext from "../../context/dark/darkContext";
//animations
import { CSSTransition } from "react-transition-group";


const Form = () => {
	const { isEditInvoice, isNewInvoice, currentInvoiceNumber, setIsEditInvoice, setIsNewInvoice } = useContext(invoiceContext);

	const { dark } = useContext(darkContext);

	const formData = useForm({
		mode: "onChange",
		criteriaMode: "all",
		defaultValues: {
			inputs: [
				{
					name: "New Input",
					quantity: 1,
					price: 1,
					total: "",
				},
			],
		},
	});

	const [visibleEditTitle, setVisibleEditTitle] = useState(false);
	const [visibleNewTitle, setVisibleNewTitle] = useState(false);

	useEffect(() => {
		formData.clearErrors();
		formData.reset({})
		//eslint-disable-next-line
	}, [visibleEditTitle, visibleNewTitle]);


	const backdropHandler = (e) => {
		if (e.target.className === "formPage") {
			setIsNewInvoice(false);
			setIsEditInvoice(false);
		}
	};

	const nodeRef = useRef(null);

	return (
		<CSSTransition
			in={isNewInvoice || isEditInvoice}
			timeout={500}
			classNames="translate"
			nodeRef={nodeRef}
			mountOnEnter
			unmountOnExit
			onEnter={() => (isEditInvoice ? setVisibleEditTitle(true) : setVisibleNewTitle(true))}
			onExited={() => {
				setVisibleEditTitle(false);
				setVisibleNewTitle(false);
			}}
		>
			<div className={`formPage`} onClick={(e) => backdropHandler(e)}>
				<div className={`formContainer ${dark ? "dark-black" : ""}`} ref={nodeRef}>
					{window.screen.width < "767" && <ButtonBack ></ButtonBack>}
					{visibleNewTitle && <h2 className={`editInvoice__heading ${dark ? "dark-font" : ""}`}>New Invoice</h2>}
					{visibleEditTitle && (
						<h1 className={`editInvoice__heading ${dark ? "dark-font" : ""}`}>
							Edit <span className="editInvoice__hash">#</span> {currentInvoiceNumber}
						</h1>
					)}
					<FormProvider {...formData}>
						<form id="newInvoice" className={`form ${dark ? "dark-black" : ""}`} >
							<FormPartBillFrom />
							<FormPartBillTo />
							<FormPartItemsList />
						</form>
						{isEditInvoice && <EditInvoiceButtons />}
						{isNewInvoice && <NewInvoiceButtons />}
					</FormProvider>

				</div>
			</div>
		</CSSTransition>
	);
};

export default Form;
