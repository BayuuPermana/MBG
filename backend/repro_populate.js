
// Mock Data (simulating Mongoose objects)
// Kitchen Schema has: name, location (nested), capacity, operatorName, contactNumber, images, staff, timestamps

const mockKitchen = {
    _id: "kitchen123",
    name: "Dapur Berkah Jakarta Selatan",
    location: {
        address: "Jl. Fatmawati Raya No. 123",
        city: "Jakarta Selatan",
        province: "DKI Jakarta",
        coordinates: {
            lat: -6.123456,
            lng: 106.123456
        }
    },
    capacity: 1000,
    operatorName: "Budi Santoso",
    contactNumber: "081234567890",
    images: ["url1.jpg", "url2.jpg", "url3.jpg"],
    staff: ["Staff 1", "Staff 2", "Staff 3", "Staff 4", "Staff 5"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
};

// Report Schema has: kitchen (ref), date, items (array), totalExpenditure, etc.
const reportBase = {
    _id: "report123",
    date: new Date().toISOString(),
    totalExpenditure: 1500000,
    status: "verified",
    items: [
        { commodity: "Rice", quantity: 100, unit: "kg", pricePerUnit: 12000, totalPrice: 1200000 },
        { commodity: "Oil", quantity: 20, unit: "liter", pricePerUnit: 15000, totalPrice: 300000 }
    ]
};

// Scenario 1: Full Population
const reportWithFullKitchen = {
    ...reportBase,
    kitchen: mockKitchen // Full document
};

// Scenario 2: Optimized Population (name only)
const reportWithOptimizedKitchen = {
    ...reportBase,
    kitchen: {
        _id: mockKitchen._id,
        name: mockKitchen.name
    }
};

// Measure Payload Size
const sizeFull = JSON.stringify(reportWithFullKitchen).length;
const sizeOpt = JSON.stringify(reportWithOptimizedKitchen).length;

console.log("--- Payload Size Comparison ---");
console.log(`Full Kitchen Population: ${sizeFull} bytes`);
console.log(`Optimized Population:    ${sizeOpt} bytes`);
const diff = sizeFull - sizeOpt;
const percent = ((1 - sizeOpt/sizeFull)*100).toFixed(1);
console.log(`Reduction:               ${diff} bytes (${percent}%)`);

// Hypothetical impact for 50 reports
console.log(`\nImpact for list of 50 reports:`);
console.log(`Original:  ${(sizeFull * 50 / 1024).toFixed(2)} KB`);
console.log(`Optimized: ${(sizeOpt * 50 / 1024).toFixed(2)} KB`);
