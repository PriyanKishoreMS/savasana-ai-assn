const Book = require("../models/book.model");

exports.addBookToDB = async book => {
	try {
		const newBook = new Book(book);
		await newBook.save();
		return newBook;
	} catch (err) {
		throw new Error(err.message);
	}
};

exports.checkBookExists = async title => {
	try {
		const book = await Book.findOne({ title });
		if (book) {
			return true;
		}
		return false;
	} catch (err) {
		throw new Error(err.message);
	}
};

exports.getAllBooksFromDb = async (page, limit, search, sort, order) => {
	try {
		const books = await Book.find({ title: { $regex: search, $options: "i" } })
			.sort({ [sort]: order })
			.skip(page * limit)
			.limit(limit);

		const totalBooks = await Book.countDocuments({
			title: { $regex: search, $options: "i" },
		});
		const totalPages = Math.ceil(totalBooks / limit);

		const response = {
			page: page + 1,
			books,
			totalPages,
		};

		return response;
	} catch (err) {
		throw new Error(err.message);
	}
};

exports.getBookByIdFromDb = async id => {
	try {
		const book = await Book.findById(id);
		if (!book) {
			throw new Error("Book not found");
		}
		return book;
	} catch (err) {
		throw new Error(err.message);
	}
};

exports.updateBookInDb = async (id, book) => {
	try {
		const updatedBook = await Book.findByIdAndUpdate(
			id,
			{ $set: book },
			{ new: true }
		);
		if (!updatedBook) {
			throw new Error("Book not found");
		}
		return updatedBook;
	} catch (err) {
		throw new Error(err.message);
	}
};

exports.deleteBookFromDb = async id => {
	try {
		const deletedBook = await Book.findByIdAndDelete(id);
		if (!deletedBook) {
			throw new Error("Book not found");
		}
		return deletedBook;
	} catch (err) {
		throw new error(err.message);
	}
};
