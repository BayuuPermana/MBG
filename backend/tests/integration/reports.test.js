const request = require('supertest');
const { describe, it, expect, beforeAll, afterAll } = require('bun:test');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Report = require('../../models/Report');
const Kitchen = require('../../models/Kitchen');
const app = require('../../server');

require('dotenv').config({ path: '../../.env' });

describe('GET /api/reports', () => {
    let token;
    let kitchenId;

    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
             await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mbg_test');
        }
        await Report.deleteMany({});
        await Kitchen.deleteMany({});

        const kitchen = await Kitchen.create({ name: 'Kitchen Test', location: { city: 'Jakarta' } });
        kitchenId = kitchen._id;

        await Report.create([
            { kitchen: kitchenId, date: new Date('2025-01-01'), totalExpenditure: 10000, status: 'verified' },
            { kitchen: kitchenId, date: new Date('2025-01-02'), totalExpenditure: 15000, status: 'pending' },
            { kitchen: kitchenId, date: new Date('2025-01-03'), totalExpenditure: 12000, status: 'rejected' }
        ]);

        const secret = process.env.JWT_SECRET || 'fallback_secret';
        token = jwt.sign(
            { id: 'testuserid', role: 'admin' },
            secret,
            { expiresIn: '1h' }
        );
    });

    afterAll(async () => {
        await Report.deleteMany({});
        await Kitchen.deleteMany({});
        await mongoose.connection.close();
    });

    it('should filter reports by status', async () => {
        const res = await request(app)
            .get('/api/reports?status=pending')
            .set('token', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].status).toBe('pending');
    });

    it('should sort reports by totalExpenditure desc', async () => {
        const res = await request(app)
            .get('/api/reports?sortBy=totalExpenditure&order=desc')
            .set('token', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body[0].totalExpenditure).toBe(15000);
        expect(res.body[2].totalExpenditure).toBe(10000);
    });

    it('should search reports by kitchen name', async () => {
        const res = await request(app)
            .get('/api/reports?q=Kitchen Test')
            .set('token', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3); // All reports belong to 'Kitchen Test'
        expect(res.body[0].kitchen.name).toBe('Kitchen Test');
    });
});
