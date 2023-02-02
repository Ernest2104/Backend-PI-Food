const { Router } = require('express');
// importar routers;
const recipeRouter = require('./recipe');
const dietRouter = require('./diet');

const router = Router();

// Configurar los routers
router.use('/recipes', recipeRouter);
router.use('/diets', dietRouter);

module.exports = router;
