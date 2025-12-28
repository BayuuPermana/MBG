const request = require('supertest');
const { describe, it, expect, beforeAll, afterAll } = require('bun:test');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' }); // Adjust path to root of backend
const Kitchen = require('../../models/Kitchen');
const app = require('../../server');

describe('GET /api/kitchens', () => {
    let token;

    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
             await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mbg_test');
        }
        await Kitchen.deleteMany({});
        await Kitchen.create([
            { name: 'Kitchen Alpha', location: { city: 'Jakarta' }, capacity: 1000 },
            { name: 'Kitchen Beta', location: { city: 'Bandung' }, capacity: 500 },
            { name: 'Kitchen Gamma', location: { city: 'Jakarta' }, capacity: 2000 }
        ]);

        // Generate a test token
        const secret = process.env.JWT_SECRET || 'fallback_secret';
        token = jwt.sign(
            { id: 'testuserid', role: 'admin' },
            secret,
            { expiresIn: '1h' }
        );
    });

    afterAll(async () => {
        await Kitchen.deleteMany({});
        await mongoose.connection.close();
    });

    it('should search kitchens by name', async () => {
        const res = await request(app)
            .get('/api/kitchens?q=Alpha')
            .set('token', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe('Kitchen Alpha');
    });

    it('should search kitchens by location', async () => {
        const res = await request(app)
            .get('/api/kitchens?q=Jakarta')
            .set('token', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    });

    it('should sort kitchens by capacity desc', async () => {
        const res = await request(app)
            .get('/api/kitchens?sortBy=capacity&order=desc')
            .set('token', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body[0].name).toBe('Kitchen Gamma');
        expect(res.body[2].name).toBe('Kitchen Beta');
    });
});
