const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const Dps = require('./models/dps.model.js')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Running...')
})

//DPS
app.post('/api/dps', async (req, res) => {
    try {
        const dps = await Dps.create(req.body);
        res.status(200).json(dps);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/dps', async (req, res) => {
  try {
        const dps = await Dps.find({});
        res.json(dps);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/dps/:id', async (req, res) => {
  try {
    const dps = await Dps.findById(req.params.id);
    if (!dps) return res.status(404).json({ message: 'DPS not found' });
    res.status(200).json(dps);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/dps/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDps = await Dps.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDps) {
      return res.status(404).json({ message: 'DPS not found' });
    }
    res.status(200).json(updatedDps);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.delete('/api/dps/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dps = await Dps.findByIdAndDelete(id);
    if (!dps) {
      return res.status(404).json({ message: 'DPS not found' });
    }
    res.status(200).json({ message: `DPS with ID ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose.connect('mongodb+srv://syariah:portal@cluster0.9z3cf.mongodb.net/')
const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', () => console.log('Connected to MongoDB'));
