const request = require('supertest');
const app = require('../index');
const { connect } = require('./database')
const FoodModel = require('../food/food.model');

describe('Food API', () => {
    let conn;
    let token;

    beforeAll(async () => {
        conn = await connect()

        // create a new user
        const response = await request(app).post('/v1/auth/register').send({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password',
        });

        token = response.body.token;
    
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    // test case 1: get all foods
    it('should get all foods', async () => {
        // create food
        await FoodModel.insertMany([
            { name: 'Pizza', price: 100, menu: 'dinner' },
            { name: 'Burger', price: 200, menu: 'dinner' },
            { name: 'Salad', price: 300, menu: 'dinner' },
        ]);

        const response = await request(app).get('/v1/foods').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.foods.length).toBe(3);
    });
}); 
