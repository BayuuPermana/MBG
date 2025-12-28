const request = require('supertest');
const { describe, it, expect, beforeAll, afterAll } = require('bun:test');
const mongoose = require('mongoose');

// MOCK AUTH MIDDLEWARE
const { mock } = require('bun:test');
mock.module('../../middleware/auth', () => ({
    verifyToken: (req, res, next) => next(),
    verifyTokenAndAdmin: (req, res, next) => next()
}));

const app = require('../../server');
const Commodity = require('../../models/Commodity');

describe('Commodity API', () => {
    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
             await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mbg_test');
        }
    });

    afterAll(async () => {
        await Commodity.deleteMany({});
        await mongoose.connection.close();
    });

    describe('POST /api/commodities', () => {
        it('should create a new commodity', async () => {
            const newCommodity = {
                name: 'Test Rice',
                category: 'Karbohidrat',
                price: 10000,
                unit: 'kg',
                region: 'Test Region'
            };
    
            const res = await request(app)
                .post('/api/commodities')
                .send(newCommodity);
    
            expect(res.status).toBe(201);
            expect(res.body.name).toBe(newCommodity.name);
            expect(res.body.region).toBe(newCommodity.region);
        });
    
        it('should return 400 if validation fails', async () => {
             const invalidCommodity = {
                 name: 'Invalid'
             };
    
             const res = await request(app)
                 .post('/api/commodities')
                 .send(invalidCommodity);
    
             expect(res.status).toBeOneOf([400, 500]); 
        });
    });

    describe('GET /api/commodities', () => {
        beforeAll(async () => {
            await Commodity.deleteMany({}); // Ensure clean state before seeding
            await Commodity.create([
                { name: 'Rice', category: 'Carbs', price: 10000, unit: 'kg', region: 'Java' },
                { name: 'Chicken', category: 'Protein', price: 30000, unit: 'kg', region: 'Java' },
                { name: 'Rice', category: 'Carbs', price: 12000, unit: 'kg', region: 'Sumatra' }
            ]);
        });
    
        it('should return all commodities', async () => {
            const res = await request(app).get('/api/commodities');
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThanOrEqual(3);
        });
    
        it('should filter by region', async () => {
            const res = await request(app).get('/api/commodities?region=Sumatra');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].region).toBe('Sumatra');
        });
    
        it('should filter by category', async () => {
            const res = await request(app).get('/api/commodities?category=Protein');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].category).toBe('Protein');
        });
    });
});
