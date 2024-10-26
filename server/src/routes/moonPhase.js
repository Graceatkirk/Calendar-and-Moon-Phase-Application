import express from 'express';
import getMoonPhaseData from '../../services/moonPhaseService'; // Adjust as needed

const router = express.Router();

router.get('/moon-phase', async (req, res) => {
  try {
    const data = await getMoonPhaseData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch moon phase data' });
  }
});

const getMoonPhaseData = async () => {
  const apiKey = process.env.MOON_PHASE_API_KEY;
  const url = `https://moon-phase1.p.rapidapi.com/moonphases?date=2024-01-01`;

  const response = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "moon-phase1.p.rapidapi.com"
    }
  });
  return response.data; // Adjust based on API response structure
};

export default router;
