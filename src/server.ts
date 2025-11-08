import 'dotenv/config';
import express from 'express';
const app = express();
const PORT = process.env['PORT'] ?? 4000;
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello Node + Express + SQL!!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
