/** Returns a string of random invoice number, example : NV8304 */
export const createRandomInvoiceNumber = () => {
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
};
