const Author = require('../models/Author');

const addAuthor = async (req, res) => {
    try {
        // Assuming req.body contains the author data
        const authorData = req.body;
        // Create a new author instance
        const author = new Author(authorData);
        // Save the author to the database
        await author.save();
        // Respond with success message and author data
        res.status(201).json({
            success: true,
            message: "Author added successfully",
            author
        });
    } catch (error) {
        console.error("Error adding author:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    addAuthor,
};