const express = require('express');
const cors = require('cors'); // Import the CORS package
const districts = require('./districts');
const tehsils = require('./tehsils');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Route to fetch all districts
app.get('/api/districts', (req, res) => {
  res.json({ total: districts.length, districts });
});

// Route to fetch tehsils by district ID
app.get('/api/districts/:districtId/tehsils', (req, res) => {
  const districtId = parseInt(req.params.districtId);
  const districtTehsils = tehsils.filter(tehsil => tehsil.districtId === districtId);

  if (districtTehsils.length === 0) {
    return res.status(404).json({ error: 'No tehsils found for this district ID' });
  }

  res.json({ districtId, tehsils: districtTehsils });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
