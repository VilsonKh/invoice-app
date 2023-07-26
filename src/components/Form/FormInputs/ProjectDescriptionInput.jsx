import { useContext } from "react";
import invoiceContext from "../../../context/invoice/invoiceContext";
import darkContext from "../../../context/dark/darkContext";
import { useFormContext } from "react-hook-form";

const ProjectDescriptionInput = () => {
  const { invoices, currentInvoiceNumber } = useContext(invoiceContext);
	const { dark } = useContext(darkContext);
	const {
		register,
    formState: {errors}
	} = useFormContext();

	const currentInvoice = [...invoices].filter((invoice) => {
		if (invoice.invoiceId === currentInvoiceNumber) {
			return invoice;
		}
		return false;
	});

	const { description } = currentInvoice?.[0] ?? {};
	return (
		<input
			type="text"
			className={`form__input ${dark ? "dark-input" : ""}`}
			id="description"
			name="description"
			defaultValue={description}
			{...register("description", {
				required: "can't be empty",
				maxLength: {
					value: 25,
					message: "should be shorter",
				},
				minLength: {
					value: 2,
					message: "should be longer",
				},
			})}
			aria-invalid={errors.description ? "true" : "false"}
		/>
	);
};

export default ProjectDescriptionInput;
