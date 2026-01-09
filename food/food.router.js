const { Router } = require('express');
const FoodController = require('./food.controller');
const FoodMiddleware = require('./food.middleware');
const router = Router();

// GET all foods
router.get('/',FoodController.GetAllFoods);

// GET a single food
router.get('/:id', FoodController.GetFoodById);

// CREATE a new food
router.post('/', FoodMiddleware.ValidateFood, FoodController.CreateFood);

// UPDATE a food
router.put('/:id', FoodController.UpdateFoodById);

// DELETE a food
router.delete('/:id', FoodController.DeleteFoodById);

module.exports = router;