//hooks
import { useContext, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
//context
import darkContext from "../../../context/dark/darkContext";
//constant
import { item } from "../constants";
//components
import DynamicInputs from "../FormInputs/DynamicInputs";
import InputErrorMessage from "../ErrorMessage/InputErrorMessage";

//component renders dynamic inputs and error messages
const FormPartItemsList = () => {
	const { dark } = useContext(darkContext);
	const { control, 
					formState: {errors} } = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "items",
		rules: { minLength: 1, maxLength: 3 },
	});

	const [quantityErrorMessage, setQuantityErrorMessage] = useState([0]);

	const onAddButtonClick =()=> {
		append(item)
		setQuantityErrorMessage((prev) =>  [...prev, prev[prev.length - 1] + 1])
	}

	return (
		<>
			<fieldset className="form__fieldset">
				<legend className="form__legend-second">Item List</legend>
				<DynamicInputs fields={fields} remove={remove} append={append}/>
				<div className="form__submit-container">
					<button type="button" className={`form__addItem ${dark ? "dark-light" : ""}`} onClick={onAddButtonClick} disabled={fields.length === 3 ? true : ''}>
						+ Add New Item
					</button>
				</div>
				{quantityErrorMessage.map((index, i) => {
					return (
						<InputErrorMessage key={i} inputName={`items.${index}.quantity`} errors={errors}/>
					);
				})}
			</fieldset>
		</>
	);
};

export default FormPartItemsList;
