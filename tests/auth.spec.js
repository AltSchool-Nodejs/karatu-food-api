const request = require('supertest');
const app = require('../index');
const { connect } = require('./database')

describe('Auth API', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    // test case 1: register user
    it('should register a user', async () => {
        const response = await request(app).post('/v1/auth/register').send({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password',
        });
        console.log(response.body);
        expect(response.status).toBe(201);
        expect(response.body.user.name).toBe('John Doe');
        expect(response.body.user.email).toBe('john.doe@example.com');
        expect(response.body.user.password).toBeUndefined();
        expect(response.body.token).toBeDefined();
        expect(response.body.message).toBe('User registered successfully');
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('token');
    });

    // test case 2: check existing user
    it('should check existing user', async () => {
        await request(app).post('/v1/auth/register').send({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password',
        });

        const response = await request(app).post('/v1/auth/register').send({
            name: 'Doe John',
            email: 'john.doe@example.com',
            password: 'password',
        });
        console.log(response.body);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User already exists');
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('message');
        expect(response.body).not.toHaveProperty('token');
    });
});     
