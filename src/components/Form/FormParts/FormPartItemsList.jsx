import { useContext } from "react";
import darkContext from "../../../context/dark/darkContext";

import { useFieldArray, useFormContext } from "react-hook-form";
import { item } from "../constants";
import DynamicInputs from "../FormInputs/DynamicInputs";

const FormPartItemsList = (formData) => {
	const { dark } = useContext(darkContext);
	const { control } = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "items",
		rules: { minLength: 1, maxLength: 3 },
	});

	// console.log(errors?.["items"]?.[0]?.quantity?.message)

	return (
		<>
			<DynamicInputs fields={fields} remove={remove} append={append}/>
			<div className="form__submit-container">
				<button type="button" className={`form__submit ${dark ? "dark-light" : ""}`} onClick={() => append(item)}>
					+ Add New Item
				</button>
			</div>
		</>
	);
};

export default FormPartItemsList;
