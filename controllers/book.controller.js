const {
	checkBookExists,
	addBookToDB,
	addRatingInDb,
	getAllBooksFromDb,
	getBookByIdFromDb,
	updateBookInDb,
	deleteBookFromDb,
} = require("../db/book.queries");

const { validateBook } = require("../utils/validate.utils");

exports.getAllBooks = async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 10;
		const search = req.query.search || "";
		const sort = req.query.sort || "title";
		const order = req.query.order || "asc";

		const books = await getAllBooksFromDb(page, limit, search, sort, order);

		res.json({ books });
	} catch (err) {
		console.log(err.message);
		res.status(500).send({ msg: "Error getting books", err: err.message });
	}
};

exports.addBook = async (req, res) => {
	try {
		const { title, author, description, price, quantity, genre, language } =
			req.body;

		const book = {
			title,
			author,
			description,
			price,
			quantity,
			genre,
			language,
		};

		const error = validateBook(book);

		if (error.length > 0) {
			return res.status(400).send({ msg: error });
		}

		if (await checkBookExists(title)) {
			return res.status(400).send({ msg: "Book already exists" });
		}

		const newBook = await addBookToDB(book);
		res.json({ newBook, msg: "Book added successfully" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send({ msg: "Error adding book", err: err.message });
	}
};

exports.addRating = async (req, res) => {
	try {
		const { id } = req.params;
		const { rating } = req.body;
		const book = await getBookByIdFromDb(id);
		if (!book) {
			return res.status(404).send({ msg: "Book not found" });
		}
		const newRating = await addRatingInDb(id, rating);
		res.json({ newRating, msg: "Rating added successfully" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send({ msg: "Error adding rating", err: err.message });
	}
};

exports.getBookById = async (req, res) => {
	try {
		const { id } = req.params;
		const book = await getBookByIdFromDb(id);
		if (!book) {
			return res.status(404).send({ msg: "Book not found" });
		}
		res.json({ book, msg: "Book found" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send({ msg: "Error getting book", err: err.message });
	}
};

exports.updateBook = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, author, description, price, quantity, genre, language } =
			req.body;

		const book = {
			title,
			author,
			description,
			price,
			quantity,
			genre,
			language,
		};
		const updatedBook = await updateBookInDb(id, book);
		if (!updatedBook) {
			return res.status(404).send({ msg: "Book not found" });
		}
		res.json({ updatedBook, msg: "Book updated successfully" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send({ msg: "Error updating book", err: err.message });
	}
};

exports.deleteBook = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedBook = await deleteBookFromDb(id);
		if (!deletedBook) {
			return res.status(404).send({ msg: "Book not found" });
		}
		res.json({ deletedBook, msg: "Book deleted successfully" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send({ msg: "Error deleting book", err: err.message });
	}
};