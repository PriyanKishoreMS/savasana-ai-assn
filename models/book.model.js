const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			// required: true,
		},
		author: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		quantity: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		genre: {
			type: String,
			enum: ["Fiction", "Non-Fiction"],
		},
		language: {
			type: String,
			default: "English",
		},
		// Can be used if users are created and allowed to rate books
		// ratings: [
		// 	{
		// 		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		// 		rating: { type: Number, required: true, min: 1, max: 5 },
		// 	},
		// ],
	},
	{ timestamps: true }
);

// Get average rating of a book
// bookSchema.virtual("averageRating").get(() => {
// 	if (this.ratings.length === 0) return 0;
// 	const totalRatings = this.ratings.reduce(
// 		(sum, rating) => sum + rating.rating,
// 		0
// 	);
// 	return totalRatings / this.ratings.length;
// });

bookSchema.index({ title: "text" });

module.exports = mongoose.model("Book", bookSchema);
