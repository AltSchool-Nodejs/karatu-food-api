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

const GetAllFoods = ({ ids = null, menu = null, }) => {
    let filteredFoods = foods;

    // ids can be passed as a comma separated list
    if (ids) {
        const idsArray = ids.split(','); // convert the string to an array
        filteredFoods = foods.filter(food => idsArray.includes(food.id.toString()));
    }

    // menu can be passed as a comma separated list
    if (menu) {
        const menuArray = menu.split(','); // convert the string to an array
        filteredFoods = foods.filter(food => menuArray.includes(food.menu));
    }

    return { foods: filteredFoods };
}

const GetFoodById = (id) => {
    const food = foods.find(food => food.id === parseInt(id));

    if (!food) {
        return { message: 'Food not found', food: null, status: 404 };
    }

    return { food, status: 200, message: 'Food found successfully' };
}

const CreateFood = (newFood) => {
        // generate a new id, random number greater than 10
        const newId = Math.floor(Math.random() * 1000000);

        const createdFood = { 
            id: newId, 
            name: newFood.name, 
            price: newFood.price, 
            menu: newFood.menu 
        };
    
        foods.push(createdFood);

        return { food: createdFood, status: 201, message: 'Food created successfully' };
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