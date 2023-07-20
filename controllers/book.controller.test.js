const request = require("supertest");
const app = require("../app"); // Assuming your express app is exported as 'app'
const {
	connectMongoDB,
	disconnectMongoDB,
} = require("../config/mongodb.config");
const {
	checkBookExists,
	addBookToDB,
	getAllBooksFromDb,
	getBookByIdFromDb,
	updateBookInDb,
	deleteBookFromDb,
} = require("../db/book.queries");

// Connect to MongoDB before running tests
beforeAll(async () => {
	try {
		await connectMongoDB(); // Connect to MongoDB
	} catch (err) {
		console.error({ msg: "Error connecting to MongoDB", err: err.message });
	}
});

// Disconnect from MongoDB after running tests
afterAll(async () => {
	try {
		await disconnectMongoDB(); // Disconnect from MongoDB
	} catch (err) {
		console.error({
			msg: "Error disconnecting from MongoDB",
			err: err.message,
		});
	}
});

// Mock the database functions
jest.mock("../db/book.queries", () => ({
	getAllBooksFromDb: jest.fn(),
	addBookToDB: jest.fn(),
	getBookByIdFromDb: jest.fn(),
	updateBookInDb: jest.fn(),
	deleteBookFromDb: jest.fn(),
	checkBookExists: jest.fn(),
}));

describe("Book API Endpoints", () => {
	// Test for getAllBooks endpoint
	describe("GET /api/getbooks", () => {
		it("should get all books", async () => {
			const mockBooks = [
				{ id: "123", title: "Book 1" },
				{ id: "456", title: "Book 2" },
			];
			getAllBooksFromDb.mockResolvedValue(mockBooks);

			const res = await request(app).get("/api/getbooks");

			expect(res.statusCode).toBe(200);
			expect(res.body).toHaveProperty("books", mockBooks);
		});
		it("should get all books with pagination", async () => {
			const mockBooks = [
				{ id: "123", title: "Book 1" },
				{ id: "456", title: "Book 2" },
			];
			getAllBooksFromDb.mockResolvedValue(mockBooks);

			const res = await request(app).get("/api/getbooks?page=1&limit=10");

			expect(res.statusCode).toBe(200);
			expect(res.body).toHaveProperty("books", mockBooks);
		});

		it("should catch an error", async () => {
			const mockError = "Error getting books";
			getAllBooksFromDb.mockRejectedValue(mockError);

			const res = await request(app).get("/api/getbooks");

			expect(res.statusCode).toBe(500);
			expect(res.body).toHaveProperty("msg", mockError);
		});
	});

	// Test for addBook endpoint
	describe("POST /api/addbook", () => {
		it("should add a new book", async () => {
			const mockBook = {
				title: "New Book",
				author: "John Doe",
				description: "A great book",
				price: 19.99,
				quantity: 5,
				genre: "Fiction",
				language: "English",
			};

			// Mock the addBookToDB function to return the new book
			addBookToDB.mockResolvedValue(mockBook);

			const res = await request(app).post("/api/addbook").send(mockBook);

			expect(res.statusCode).toBe(200);
			expect(res.body).toHaveProperty("newBook", mockBook);
			expect(res.body).toHaveProperty("msg", "Book added successfully");
		});

		it("should return an error if the book already exists", async () => {
			const mockBook = {
				title: "New Book",
				author: "John Doe",
				description: "A great book",
				price: 19.99,
				quantity: 5,
				genre: "Fiction",
				language: "English",
			};
			// Mock the checkBookExists function to return true
			checkBookExists.mockResolvedValue(true);

			const res = await request(app).post("/api/addbook").send(mockBook);

			expect(res.statusCode).toBe(400);
			expect(res.body).toHaveProperty("msg", "Book already exists");
		});

		it("should return an error for invalid book data", async () => {
			// Mock the validateBook function to return an error message
			const mockInvalidBook = {
				title: "Invalid Book",
				author: "",
				description: "A great book",
				price: -10,
				quantity: 5,
				genre: "Fiction",
				language: "English",
			};
			const mockError = ["author is required", "Price cannot be negative"];
			jest.mock("../utils/validate.utils", () => ({
				validateBook: jest.fn(() => mockError),
			}));

			const res = await request(app).post("/api/addbook").send(mockInvalidBook);

			expect(res.statusCode).toBe(400);
			expect(res.body).toHaveProperty("msg", mockError);
		});
	});

	// Test for getBookById endpoint
	describe("GET /api/getbooks/:id", () => {
		it("should get a book by ID", async () => {
			const mockBook = { id: "123", title: "Book 1" };
			getBookByIdFromDb.mockResolvedValue(mockBook);

			const res = await request(app).get("/api/getbooks/123");

			expect(res.statusCode).toBe(200);
			expect(res.body).toHaveProperty("book", mockBook);
			expect(res.body).toHaveProperty("msg", "Book found");
		});

		it("should return an error if the book is not found", async () => {
			getBookByIdFromDb.mockResolvedValue(null);

			const res = await request(app).get("/api/getbooks/456");

			expect(res.statusCode).toBe(404);
			expect(res.body).toHaveProperty("msg", "Book not found");
		});

		it("should catch an error", async () => {
			const mockError = "Error getting book";
			getBookByIdFromDb.mockRejectedValue(mockError);

			const res = await request(app).get("/api/getbooks/123");

			expect(res.statusCode).toBe(500);
			expect(res.body).toHaveProperty("msg", mockError);
		});
	});

	// Test for updateBook endpoint
	describe("PUT /api/updatebook/:id", () => {
		it("should update a book by ID", async () => {
			const mockBook = { id: "123", title: "Updated Book" };
			updateBookInDb.mockResolvedValue(mockBook);

			const res = await request(app).put("/api/updatebook/123").send(mockBook);

			expect(res.statusCode).toBe(200);
			expect(res.body).toHaveProperty("updatedBook", mockBook);
			expect(res.body).toHaveProperty("msg", "Book updated successfully");
		});

		it("should return an error if the book is not found", async () => {
			updateBookInDb.mockResolvedValue(null);

			const res = await request(app).put("/api/updatebook/456").send({});

			expect(res.statusCode).toBe(404);
			expect(res.body).toHaveProperty("msg", "Book not found");
		});

		it("should catch an error", async () => {
			const mockError = "Error updating book";
			updateBookInDb.mockRejectedValue(mockError);

			const res = await request(app).put("/api/updatebook/123").send({});

			expect(res.statusCode).toBe(500);
			expect(res.body).toHaveProperty("msg", mockError);
		});
	});

	// Test for deleteBook endpoint
	describe("DELETE /api/deletebook/:id", () => {
		it("should delete a book by ID", async () => {
			const mockBook = { id: "123", title: "Deleted Book" };
			deleteBookFromDb.mockResolvedValue(mockBook);

			const res = await request(app).delete("/api/deletebook/123");

			expect(res.statusCode).toBe(200);
			expect(res.body).toHaveProperty("deletedBook", mockBook);
			expect(res.body).toHaveProperty("msg", "Book deleted successfully");
		});

		it("should return an error if the book is not found", async () => {
			deleteBookFromDb.mockResolvedValue(null);

			const res = await request(app).delete("/api/deletebook/456");

			expect(res.statusCode).toBe(404);
			expect(res.body).toHaveProperty("msg", "Book not found");
		});
		it("should catch an error", async () => {
			const mockError = "Error deleting book";
			deleteBookFromDb.mockRejectedValue(mockError);

			const res = await request(app).delete("/api/deletebook/123");

			expect(res.statusCode).toBe(500);
			expect(res.body).toHaveProperty("msg", mockError);
		});
	});
});
