const express = require('express');
const mongoose = require('mongoose');
const apiroute = require('./Routes/ContactUs');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contact', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// API Routes
app.use('/api', apiroute);

// Example GET route
app.get('/', (req, res) => {
  res.json({ message: 'API data response' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
