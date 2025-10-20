const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/itemController');

// GET /items - Mendapatkan semua items atau filter berdasarkan status
router.get('/', ItemController.getAllItems);

// GET /items/:id - Mendapatkan detail item berdasarkan ID
router.get('/:id', ItemController.getItemById);

// POST /items - Menambahkan item baru
router.post('/', ItemController.createItem);

// PUT /items/:id - Update item
router.put('/:id', ItemController.updateItem);

// DELETE /items/:id - Hapus item
router.delete('/:id', ItemController.deleteItem);

module.exports = router;