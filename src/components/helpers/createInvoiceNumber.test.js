test("функция createInvoiceNumber должна возвращать уникальный номер, содержащий 2 буквы в начале и 4 цифры", () => {
	const createInvoiceNumber = jest.fn(() => {
		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
		let randomLetters = alphabet[Math.floor(Math.random() * alphabet.length)];
		let newInvoiceId = "";
		while (newInvoiceId.length < 2) {
			newInvoiceId += randomLetters;
			randomLetters = randomLetters = alphabet[Math.floor(Math.random() * alphabet.length)];
		}
		let randomNumb = Math.floor(Math.random() * (9999 + 1 - 1000)) + 1000;
		newInvoiceId += randomNumb;
		return newInvoiceId;
	});
	createInvoiceNumber();
	expect(createInvoiceNumber.mock.results[0].value.match(/^[A-Z]{2}\d{4}/)).toHaveLength(1);
});
