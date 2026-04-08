import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import resumeRoutes from './routes/resumeRoutes.js';

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/resume', resumeRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send("AI Resume Analyzer API with MongoDB is running! 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});