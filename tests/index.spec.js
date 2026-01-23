const request = require('supertest');
const app = require('../index');

describe('Food API', () => {
    // test case 1
    it('should return a 200 status code', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});
