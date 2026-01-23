const FoodModel = require('./food.model');

let foods = [
    { id: 1, name: 'Pizza', price: 100, menu: 'dinner' },
    { id: 2, name: 'Burger', price: 200, menu: 'dinner' },
    { id: 3, name: 'Salad', price: 300, menu: 'dinner' },
    { id: 4, name: 'Ice Cream', price: 400, menu: 'lunch' },
    { id: 5, name: 'Coffee', price: 500, menu: 'lunch' },
    { id: 6, name: 'Tea', price: 600, menu: 'lunch' },
    { id: 7, name: 'Water', price: 700, menu: 'breakfast' },
    { id: 8, name: 'Soda', price: 800, menu: 'breakfast' },
    { id: 9, name: 'Juice', price: 900, menu: 'breakfast' },
    { id: 10, name: 'Beer', price: 1000, menu: 'breakfast' },
]
// /foods?ids=1,2,3&menu=dinner
const GetAllFoods = async ({ ids = null, menu = null, }) => {
    const query = {};

    // ids can be passed as a comma separated list
    if (ids) {
        query._id = { $in: ids.split(',') }; // [1,2,3]
    }

    // menu can be passed as a comma separated list
    if (menu) {
        query.menu = menu;
    }

    const foods = await FoodModel.find(query); // { _id: { $in: [1,2,3] }, menu: 'dinner' }

    return { foods: foods };
}

const GetFoodById = async (id) => {
    const food = await FoodModel.findById(id);

    if (!food) {
        return { message: 'Food not found', food: null, status: 404 };
    }

    return { food, status: 200, message: 'Food found successfully' };
}

const CreateFood = async (newFood) => {

        const createdFood = { 
            name: newFood.name, 
            price: newFood.price, 
            menu: newFood.menu 
        };
    
        const food = await FoodModel.create(createdFood);

        return { food, status: 201, message: 'Food created successfully' };
}

const UpdateFoodById = (id, updatedFood) => {
    const food = foods.find(food => food.id === parseInt(id));
    if (!food) {
        return { message: 'Food not found', food: null, status: 404 };
    }
    food.name = updatedFood.name;
    food.price = updatedFood.price;
    food.menu = updatedFood.menu;
    return { food, status: 200, message: 'Food updated successfully' };
}

const DeleteFoodById = (id) => {
    const food = foods.find(food => food.id === parseInt(id));
    if (!food) {
        return { message: 'Food not found', food: null, status: 404 };
    }
    foods = foods.filter(food => food.id !== parseInt(id));
    return { status: 200, message: 'Food deleted successfully' };
}

module.exports = {
    GetAllFoods,
    GetFoodById,
    CreateFood,
    UpdateFoodById,
    DeleteFoodById
}