const app = require('./index');
const database = require('./config/database');

database.connectDB();

app.listen(3005, () => {
    console.log('Server is running on port 3005');
    console.log('http://localhost:3005');
});
