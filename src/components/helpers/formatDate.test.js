test("функция должна корректно конвертировать дату", () => {
	const formatDate = jest.fn((date) => {
		let day = date.getDate();
		if (day < 10) day = "0" + day;
		let month = date.getMonth() + 1;
		if (month < 10) month = "0" + month;
		const year = date.getFullYear();
		return year + "-" + month + "-" + day;
	});

	formatDate(new Date());
	expect(formatDate.mock.results[0].value.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g)).toHaveLength(1);
});
