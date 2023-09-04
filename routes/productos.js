const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productController');

router.post('/', productoController.create);

module.exports = router;
