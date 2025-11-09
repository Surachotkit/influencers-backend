import "dotenv/config";
import express from "express";
import prisma from "./lib/prisma";
import influencerRoutes from './routes/influencer';

const app = express();
const PORT = parseInt(process.env["PORT"] ?? "4040");
console.log("🚀 ~ PORT:", PORT);
app.use(express.json());

app.use('/api/influencers', influencerRoutes);

app.get("/", (_req, res) => {
  res.send("Hello Influencers Backend!!!non");
});

app.get("/api/users", async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    console.log("🚀 ~ users:", users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/create", async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password,
        role,
      },
    });
    console.log("🚀 ~ user:", user)

    const newInfluencer = await prisma.influencer.create({
      data: {
        recordId: "INF1111",
        recordType: "influencer",
        fullName: "Lisa Kim",
        preferredName: "Lisa",
        gender: "Female",
        city: "Bangkok",
        country: "Thailand",
        influencerCategory: "Fashion",
        primaryPlatform: "Instagram",
        followersCount: 2000000,
        totalFollowersCount: 2500000,
        engagementRate: 4.5,
        engagementRateTier: "High",
        interests: ["fashion", "beauty", "travel"],
        languages: ["Thai", "English"],
        collaborationStatus: "Open",
        portfolioUrl: "https://instagram.com/lisakim",
        createdByUser: { connect: { id: user.id } },
      },
    });
    console.log("🚀 ~ newInfluencer:", newInfluencer)
    res.status(201).json(newInfluencer);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user!!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
