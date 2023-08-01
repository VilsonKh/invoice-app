import { useContext, useState } from "react";
import darkContext from "../../../context/dark/darkContext";

import { useFieldArray, useFormContext } from "react-hook-form";
import { item } from "../constants";
import DynamicInputs from "../FormInputs/DynamicInputs";
import { ErrorMessage } from "@hookform/error-message";

const FormPartItemsList = (formData) => {
	const { dark } = useContext(darkContext);
	const { control } = useFormContext();
	const {formState: {errors}} = useFormContext();

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
				{quantityErrorMessage.map((index) => {
					return (
						<>
							<ErrorMessage errors={errors} name={`items.${index}.quantity`} as={<p className="error-message"></p>} />

							<ErrorMessage
								errors={errors}
								name={`items.${index}.quantity`}
								render={({ message }) => {
									<p>{message}</p>;
								}}
							/>
						</>
					);
				})}
			</fieldset>
		</>
	);
};

export default FormPartItemsList;
