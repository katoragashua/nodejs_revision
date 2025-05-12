const {Router} = require('express');
const router = Router();
const {getAllBooks, getBookById, createBook, updateBook, deleteBook} = require('../controllers/book_controllers');

router.get('/books', getAllBooks);

router.get('/books/:id', getBookById);

router.post('/books', createBook);

router.put('/books/:id', updateBook);

router.delete('/books/:id', deleteBook);


// Export the router
// This allows the router to be used in other parts of the application
module.exports = router;