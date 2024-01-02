const express = require('express');
const router = express.Router();

// Import middlewares
const aiController = require('../controllers/aiController');
const aiResultController = require('../controllers/aiResultController');
const aiModelController = require('../controllers/aiModelController');
const aiModelDeleteController = require('../controllers/aiModelDeleteController');

// Routes for the API
router.post('/ai', aiController);
router.get('/ai/result/:uniqueId', aiResultController);
router.post('/create-model', aiModelController);
router.delete('/delete-model/:modelId', aiModelDeleteController);

module.exports = router;