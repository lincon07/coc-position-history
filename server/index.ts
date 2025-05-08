// server/index.ts
import express from 'express';
import cors from 'cors';
import sheetsRoute from './sheets';

const app = express();
const PORT = 5000;

app.use(cors());
app.use('/api', sheetsRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
