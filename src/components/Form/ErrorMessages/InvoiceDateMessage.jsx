import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

const InvoiceDateMessage = () => {
  const {formState: {errors}} = useFormContext();
  return (
    <>
			<ErrorMessage errors={errors} name="createdAt" as={<p className="error-message"></p>} />

			<ErrorMessage
				errors={errors}
				name="createdAt"
				render={({ message }) => {
					<p>{message}</p>;
				}}
			/>
		</>
  )
}

export default InvoiceDateMessage