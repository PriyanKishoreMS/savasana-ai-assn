const express = require("express");
const router = express.Router();

const {
	getAllBooks,
	addBook,
	getBookById,
	updateBook,
	deleteBook,
} = require("../controllers/book.controller");

router.get("/getbooks", getAllBooks);
router.get("/getbooks/:id", getBookById);
router.post("/addbook", addBook);
router.put("/updatebook/:id", updateBook);
router.delete("/deletebook/:id", deleteBook);

module.exports = router;
