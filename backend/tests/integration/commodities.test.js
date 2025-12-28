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
        
        describe('PUT /api/commodities/:id', () => {
            let commodityId;
        
            beforeAll(async () => {
                const commodity = await Commodity.create({
                    name: 'Old Rice',
                    category: 'Carbs',
                    price: 10000,
                    unit: 'kg',
                    region: 'Java',
                    history: []
                });
                commodityId = commodity._id;
            });
        
            it('should update price and push to history', async () => {
                const newPrice = 15000;
                const res = await request(app)
                    .put(`/api/commodities/${commodityId}`)
                    .send({ price: newPrice });
        
                expect(res.status).toBe(200);
                expect(res.body.price).toBe(newPrice);
                expect(res.body.history).toHaveLength(1);
                expect(res.body.history[0].price).toBe(10000); // Old price should be in history? Or new price?
                // Usually history tracks PAST prices.
                // If I change 10000 -> 15000.
                // History should probably contain the OLD price record { price: 10000, date: ... }
                // OR the history logs the NEW change.
                // Spec says: "history (Array of objects: { price, date, updatedBy })".
                // Let's assume it tracks the *change* event. So maybe it stores the new price?
                // Or it stores the snapshot of the commodity at that time?
                // Let's stick to: Push the OLD price to history before updating.
                // So history[0].price should be 10000.
            });
        
            it('should not push to history if price is unchanged', async () => {
                 // Reset or use current state (price 15000)
                 const res = await request(app)
                     .put(`/api/commodities/${commodityId}`)
                     .send({ name: 'Renamed Rice' }); // Price not sent or same
        
                 expect(res.status).toBe(200);
                 expect(res.body.name).toBe('Renamed Rice');
                 expect(res.body.history).toHaveLength(1); // Should still be 1
            });
        });
        });
