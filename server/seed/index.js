const mongoose = require('mongoose');
const seedProblems = require('./problems');

// Hardcoded MongoDB URI
const MONGODB_URI = 'mongodb+srv://parastyagi1105:DmUkrpcVXbqEb0Ww@cluster0.cfqu8w5.mongodb.net/?retryWrites=true&w=majority&';

const seed = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        
        await seedProblems();
        
        console.log('Seeding completed');
        process.exit(0);
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
};

seed(); 