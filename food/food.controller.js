const FoodService = require('./food.service');

const GetAllFoods = async (req, res) => {
    const queryParams = req.query;

    const foods = await FoodService.GetAllFoods({ 
        ids: queryParams.ids,
        menu: queryParams.menu 
    });

    return res.status(200).json(foods);
}

const GetFoodById = async (req, res) => {
    
    const food = await FoodService.GetFoodById(req.params.id);

    return res.status(food.status).json(food);
}

const CreateFood = async (req, res) => {
    const body = req.body;
    // generate a new id, random number greater than 10
    const newFood = await FoodService.CreateFood(body);

    console.log(newFood);
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