const app = require('./index');
const database = require('./config/database');

database.connectDB();

const port = process.env.PORT || 3005;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});
