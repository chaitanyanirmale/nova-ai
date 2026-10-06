import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import { connectDB } from './config/connect_db.js';
import authRoutes from './routes/auth.route.js'
import goalRoutes from './routes/goal.routes.js'
import aiRoutes from './services/ai.route.js'
import roadmapRoutes from './routes/roadmap.route.js'


dotenv.config()
connectDB()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/goals', goalRoutes)
app.use("/api/ai", aiRoutes);
app.use("/api/roadmap", roadmapRoutes);

app.get("/api/", (req, res) => {
  res.json({
    success: true,
    message: "NOVA API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});