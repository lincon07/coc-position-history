// server/sheets.ts
import express from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();
const router = express.Router();

router.get('/sheets-data', async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, '../key.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const range = 'Current CoC History!B5:D25';
    const adminRange = 'Current CoC History!B4:G26';

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: "1Sgw08rt036WqVwga2crB75BHPY1HjOGASmcz9eh72sE",
      range: adminRange,
    });

    res.json(result.data.values);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch sheet data' });
  }
});

export default router;
