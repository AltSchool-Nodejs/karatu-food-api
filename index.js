const express = require('express'); // import express
const foodRouter = require('./food/food.router');

const app = express(); // create an express application
const port = 3005;

app.use(express.json()); // parse the body of the request as JSON

// GET method
app.get('/', (req, res) => {
    res.send('Food API is running!')
})

app.use('/v1/foods', foodRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});

