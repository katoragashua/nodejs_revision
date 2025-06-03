const {Router} = require('express');
const router = Router();

const {addBook,
    getBook
} = require('../controllers/book_controllers');

// Route to add a book
router.post('/', addBook);
// Route to get a book by ID
router.get('/:id', getBook);

// Export the router
module.exports = router;