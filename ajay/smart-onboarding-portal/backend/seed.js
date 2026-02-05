import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Check if a user exists, if not create a sample one to initialize the DB
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            await User.create({
                name: 'System Admin',
                email: 'admin@example.com',
                password: 'password123',
                isAdmin: true,
            });
            console.log('Sample user created. Database "smart-onboarding-portal" should now be visible in Compass.');
        } else {
            console.log('Database already contains data.');
        }

        await mongoose.connection.close();
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedDatabase();
