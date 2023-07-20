const mongoose = require("mongoose");
const {
	connectMongoDB,
	disconnectMongoDB,
} = require("../config/mongodb.config");

jest.mock("mongoose", () => ({
	connect: jest.fn(),
	disconnect: jest.fn(),
}));

describe("MongoDB Configuration", () => {
	// Test for connectMongoDB()
	describe("connectMongoDB()", () => {
		it("should connect to MongoDB", async () => {
			await connectMongoDB();
			expect(mongoose.connect).toHaveBeenCalledTimes(1);
		});
	});

	// Test for disconnectMongoDB()
	describe("disconnectMongoDB()", () => {
		it("should disconnect from MongoDB", async () => {
			await disconnectMongoDB();

			expect(mongoose.disconnect).toHaveBeenCalledTimes(1);
		});
	});
});
