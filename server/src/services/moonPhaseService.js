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

export default router;
