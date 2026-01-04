
const assert = require('assert');
const path = require('path');

// Mock dependencies
const mockExpress = {
    Router: () => ({
        get: () => {},
        post: () => {},
        put: () => {},
        use: () => {}
    })
};

const mockMongoose = {
    Schema: class {},
    model: () => {}
};

// Mock require
const originalRequire = require('module').prototype.require;
require('module').prototype.require = function(id) {
    if (id === 'express') return mockExpress;
    if (id === 'mongoose') return mockMongoose;
    if (id.includes('../middleware/auth')) return { verifyToken: () => {}, verifyTokenAndAdmin: () => {} };
    if (id.includes('../models/Report')) return {};
    if (id.includes('../models/Kitchen')) return {};
    return originalRequire.call(this, id);
};

try {
    const reportsRoute = require('../routes/reports.js');
    console.log("✅ backend/routes/reports.js syntax check passed.");
} catch (error) {
    console.error("❌ backend/routes/reports.js syntax check failed:", error);
    process.exit(1);
}
