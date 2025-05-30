const {Router} = require('express');
const router = Router();
const {addProducts,
    stats
} = require('../controllers/product_controller');

// Route to add products
router.post('/', addProducts);

// Route to get product statistics
router.get('/stats', stats);

// Export the router
module.exports = router;