import { useEffect } from "react";
import { useForm, FormProvider, useFieldArray, useFormContext } from "react-hook-form";

const TestForm = () => {
	const methods = useForm({
		mode: "onChange",
	});

	const { fields, append } = useFieldArray({
		control: methods.control,
		name: "items",
		rules: { maxLength: 4 },
	});

	useEffect(() => {
		append({
			name: "test",
		});
	}, []);


	const items = fields.map((item, index) => {
		return <input 
		key={item.id} 
		id="name" 
		name="name" 
		type="text" 
		defaultValue={item.name} 
		{...methods.register(`items.${index}.name`, { required: true, maxLength: 3})}></input>;
	});

	return (
		<>
			<form>
				{items}
			</form>
			<button onClick={() => append({ name: "test1" })}></button>
		</>
	);
};

export default TestForm;
