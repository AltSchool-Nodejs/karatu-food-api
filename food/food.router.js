const { Router } = require('express');
const router = Router();

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


// GET all foods
router.get('/', (req, res) => {
    const queryParams = req.query;

    let filteredFoods = foods;

    // ids can be passed as a comma separated list
    const ids = queryParams.ids;
    if (ids) {
        const idsArray = ids.split(','); // convert the string to an array
        filteredFoods = foods.filter(food => idsArray.includes(food.id.toString()));
    }

    // menu can be passed as a comma separated list
    const menu = queryParams.menu;
    if (menu) {
        const menuArray = menu.split(','); // convert the string to an array
        filteredFoods = foods.filter(food => menuArray.includes(food.menu));
    }

    return res.status(200).json({foods: filteredFoods});
})

// GET a single food
router.get('/:id', (req, res) => {
    const parameters = req.params;
    
    const food = foods.find(food => food.id === parseInt(parameters.id));

    if (!food) {
        return res.status(404).json({ message: 'Food not found' });
    }

    return res.status(200).json(food);
})

// CREATE a new food
router.post('/', (req, res) => {
    const body = req.body;
    // generate a new id, random number greater than 10
    const newId = Math.floor(Math.random() * 1000000);

    const newFood = { 
        id: newId, 
        name: body.name, 
        price: body.price, 
        menu: body.menu 
    };

    foods.push(newFood);

    return res.status(201).json({message: 'Food created successfully', food: newFood});
})

// UPDATE a food
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const food = foods.find(food => food.id === parseInt(id));

    if (!food) {
        return res.status(404).json({ message: 'Food not found' });
    }


    if (body.name) {
        food.name = body.name;
    }

    if (body.price) {
        food.price = body.price;
    }

    if (body.menu) {
        food.menu = body.menu;
    }

    return res.status(200).json({message: 'Food updated successfully', food: food});
})

// DELETE a food
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const food = foods.find(food => food.id === parseInt(id));

    if (!food) {
        return res.status(404).json({ message: 'Food not found' });
    }

    foods = foods.filter(food => food.id !== parseInt(id));

    return res.status(200).json({message: 'Food deleted successfully' });
})

module.exports = router;