const NewInvoiceButtons = () => {

  const onSubmit = (data) => console.log(data)

	return (
		// onClick={onSaveButtonsClick}
		<div className="addInvoice__groupButtons" >
			<button type="submit" form="newInvoice" id="discard" className="addInvoice__discard btn-status">
				Discard
			</button>
			<button type="submit" form="newInvoice" id="draft" className="addInvoice__draft btn-status">
				Save as Draft
			</button>
			<button type="submit" form="newInvoice" id="pending" className="addInvoice__send btn-status">
				Save & Send
			</button>
		</div>
	);
};

export default NewInvoiceButtons;
