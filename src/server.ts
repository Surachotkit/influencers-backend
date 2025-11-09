import 'dotenv/config';
import express from 'express';
import prisma from './lib/prisma'

const app = express();
const PORT = parseInt(process.env['PORT'] ?? '4040');
console.log("🚀 ~ PORT:", PORT)
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello Influencers Backend!!!');
});

app.get('/api/users', async (_req, res) => {
  try {
    const users = await prisma.user.findMany()
    console.log("🚀 ~ users:", users)
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
