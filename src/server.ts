import "dotenv/config";
import express from "express";
import influencerRoutes from './routes/influencer';

const app = express();
const PORT = parseInt(process.env["PORT"] ?? "4040");

app.use(express.json());

app.use('/api/influencers', influencerRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
