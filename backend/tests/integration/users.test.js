const request = require('supertest');
const { describe, it, expect, beforeAll, afterAll } = require('bun:test');
const mongoose = require('mongoose');
const User = require('../../models/User');
const app = require('../../server');

// MOCK AUTH MIDDLEWARE if needed, but users route typically needs no auth for 'GET /' in this app based on previous code?
// Let's check auth.js. It says "router.get('/', ...)" without middleware in the file I read earlier?
// Wait, I read auth.js earlier:
// router.get('/', async (req, res) => { ... }) // No middleware!
// That's a security risk but out of scope for this task unless I'm asked to fix it.
// I will assume it's public for now or mock if it changes.

describe('GET /api/auth (Users)', () => {
    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
             await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mbg_test');
        }
        await User.deleteMany({});
        await User.create([
            { username: 'Alice', password: 'pw', role: 'admin' },
            { username: 'Bob', password: 'pw', role: 'kitchen', kitchenId: new mongoose.Types.ObjectId() },
            { username: 'Charlie', password: 'pw', role: 'kitchen', kitchenId: new mongoose.Types.ObjectId() }
        ]);
    });

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    it('should search users by username', async () => {
        const res = await request(app).get('/api/auth?q=Ali');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].username).toBe('Alice');
    });

    it('should sort users by username desc', async () => {
        const res = await request(app).get('/api/auth?sortBy=username&order=desc');
        expect(res.status).toBe(200);
        expect(res.body[0].username).toBe('Charlie');
        expect(res.body[2].username).toBe('Alice');
    });
});
