const {Router} = require('express');
const router = Router();
const {addAuthor} = require('../controllers/author_controllers');

// Route to add an author
router.post('/', addAuthor);

// Export the router
module.exports = router;