const FoodService = require('./food.service');

const GetAllFoods = (req, res) => {
    const queryParams = req.query;

    const foods = FoodService.GetAllFoods({ 
        ids: queryParams.ids,
        menu: queryParams.menu 
    });

    return res.status(200).json(foods);
}

const GetFoodById = (req, res) => {
    
    const food = FoodService.GetFoodById(req.params.id);

    return res.status(food.status).json(food);
}

const CreateFood = (req, res) => {
    const body = req.body;
    // generate a new id, random number greater than 10
    const newFood = FoodService.CreateFood(body);

    return res.status(newFood.status).json(newFood);
}

const UpdateFoodById = (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const food = FoodService.UpdateFoodById(id, body);

    return res.status(food.status).json(food);
}

const DeleteFoodById = (req, res) => {
    const { id } = req.params;

    const result = FoodService.DeleteFoodById(id);

    return res.status(result.status).json(result);
}

module.exports = {
    GetAllFoods,
    GetFoodById,
    CreateFood,
    UpdateFoodById,
    DeleteFoodById
}