
const mongoose = require('mongoose');

// Mock Kitchen Schema Structure (based on models/Kitchen.js)
const fullKitchen = {
    _id: new mongoose.Types.ObjectId(),
    name: "Dapur Berkah Jakarta Selatan",
    location: {
        address: "Jl. RS Fatmawati No. 39, Cilandak",
        city: "Jakarta Selatan",
        province: "DKI Jakarta"
    },
    capacity: 500,
    operatorName: "Budi Santoso",
    contactNumber: "081234567890",
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0
};

// Optimized Kitchen Structure (what we want)
const optimizedKitchen = {
    _id: fullKitchen._id,
    name: fullKitchen.name
};

// Measure JSON size
const fullSize = JSON.stringify(fullKitchen).length;
const optimizedSize = JSON.stringify(optimizedKitchen).length;
const saving = fullSize - optimizedSize;
const percent = ((saving / fullSize) * 100).toFixed(2);

console.log("⚡ Bolt Measurement: Payload Size Simulation");
console.log("-------------------------------------------");
console.log(`Full Kitchen Object Size:      ${fullSize} bytes`);
console.log(`Optimized Kitchen Object Size: ${optimizedSize} bytes`);
console.log(`Savings per Record:            ${saving} bytes`);
console.log(`Reduction:                     ${percent}%`);
console.log("-------------------------------------------");
console.log(`Estimated savings for 1000 reports: ${(saving * 1000 / 1024).toFixed(2)} KB`);
