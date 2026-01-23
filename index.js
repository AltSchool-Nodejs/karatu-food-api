const express = require('express'); // import express
const foodRouter = require('./food/food.router');
const authRouter = require('./auth/auth.router'); // auth router
const path = require('path');
const foodService = require('./food/food.service');
// const database = require('./config/database');

const app = express(); // create an express application
// const port = 3005;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json()); // parse the body of the request as JSON

app.use(express.urlencoded({ extended: true })); // parse the body of the request as URL encoded data


// views
app.get('/home', (req, res) => {
    const name = req.query.name;
    res.render('home', { name: name || 'John Doe' });
})


// GET method
app.get('/', (req, res) => {
    res.send('Food API is running!')
})

app.use('/v1/foods', foodRouter);
app.use('/v1/auth', authRouter); // register auth routes

app.get('/views/foods', (req, res) => {
    const { foods } = foodService.GetAllFoods({ });
    console.log(foods);
    res.render('foods', { foods: foods }  );
})

app.post('/views/foods', (req, res) => {
    const { name, price, menu } = req.body;
    foodService.CreateFood({ name, price, menu });
    const { foods } = foodService.GetAllFoods({ });
    res.render('foods', { foods: foods });
})

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error', status: 500 });
}

app.use(errorHandler);



// database.connectDB()
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//     console.log(`http://localhost:${port}`);
// });

module.exports = app;

