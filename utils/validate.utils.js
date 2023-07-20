exports.validateBook = book => {
	const errors = [];
	for (let key in book) {
		if (!book[key]) {
			errors.push(`${key} is required`);
		}
	}
	if (book.price < 0) {
		errors.push(`Price cannot be negative`);
	}
	if (book.quantity < 0) {
		errors.push(`Quantity cannot be negative`);
	}
	return errors;
};
