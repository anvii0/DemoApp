// backend/routes/items.js

const express = require('express');
const router = express.Router();

// In-memory array to hold items (temporary; for development only)
let items = [];

// GET all items
router.get('/', (req, res) => {
  res.json(items);
});

// POST new item
router.post('/', (req, res) => {
  const item = req.body;
  items.push(item);
  res.json({ message: 'Item added', item });
});

// PUT (update) item by index
router.put('/:id', (req, res) => {
  const index = parseInt(req.params.id);
  if (isNaN(index) || index < 0 || index >= items.length) {
    return res.status(400).json({ message: 'Invalid item index' });
  }

  items[index] = req.body;
  res.json({ message: 'Item updated', item: items[index] });
});

// DELETE item by index
router.delete('/:id', (req, res) => {
  const index = parseInt(req.params.id);
  if (isNaN(index) || index < 0 || index >= items.length) {
    return res.status(400).json({ message: 'Invalid item index' });
  }

  const deletedItem = items.splice(index, 1);
  res.json({ message: 'Item deleted', item: deletedItem });
});

module.exports = router;