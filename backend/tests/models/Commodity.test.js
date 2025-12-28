const { describe, it, expect, beforeAll, afterAll } = require('bun:test');
const mongoose = require('mongoose');
const Commodity = require('../../models/Commodity');

describe('Commodity Model', () => {
  beforeAll(async () => {
    // Connect to a test database or mock
    // For unit testing a model without a real DB, we can validate against the schema
    // But mongoose validation usually requires a connection or just `validate()`
    // We'll rely on `validate()` which is sync/async but doesn't strictly need a connected DB for basic validation
  });

  it('should be invalid if required fields are missing', async () => {
    const commodity = new Commodity({});
    try {
      await commodity.validate();
    } catch (err) {
      expect(err.errors.name).toBeDefined();
      expect(err.errors.category).toBeDefined();
      expect(err.errors.unit).toBeDefined();
      expect(err.errors.price).toBeDefined();
      expect(err.errors.region).toBeDefined();
    }
  });

  it('should validate a correct commodity', async () => {
    const validCommodity = {
      name: 'Beras Premium',
      category: 'Karbohidrat',
      unit: 'kg',
      price: 15000,
      region: 'Nasional',
      history: []
    };
    const commodity = new Commodity(validCommodity);
    const err = await commodity.validateSync();
    expect(err).toBeUndefined();
  });

  it('should have a history array', async () => {
      const validCommodity = {
        name: 'Telur',
        category: 'Protein',
        unit: 'kg',
        price: 25000,
        region: 'Jawa Barat',
        history: [{ price: 24000, date: new Date(), updatedBy: 'Admin' }]
      };
      const commodity = new Commodity(validCommodity);
      expect(commodity.history).toHaveLength(1);
      expect(commodity.history[0].price).toBe(24000);
  });

  describe('Uniqueness Constraints', () => {
      beforeAll(async () => {
          if (mongoose.connection.readyState === 0) {
              await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mbg_test');
          }
          await Commodity.deleteMany({});
          // Ensure indexes are built
          await Commodity.syncIndexes();
      });

      afterAll(async () => {
          await Commodity.deleteMany({});
          await mongoose.connection.close();
      });

      it('should allow same name in different regions', async () => {
          await Commodity.create({ name: 'Unique Rice', category: 'Carbs', price: 1000, unit: 'kg', region: 'Region A' });
          const second = await Commodity.create({ name: 'Unique Rice', category: 'Carbs', price: 1200, unit: 'kg', region: 'Region B' });
          expect(second._id).toBeDefined();
      });

      it('should NOT allow same name in SAME region', async () => {
          try {
              await Commodity.create({ name: 'Unique Rice', category: 'Carbs', price: 1500, unit: 'kg', region: 'Region A' });
              throw new Error('Should have failed');
          } catch (err) {
              expect(err.code).toBe(11000); // Duplicate key error
          }
      });
  });
});
