const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow both frontend origins
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
//   credentials: true, // Allow sending cookies with requests
// }));

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlparser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('mongodb connection err:', err));
  
app.use('/api/auth', authRoutes);
app.use('/images', express.static(path.join(__dirname, './images')));

app.get('/test-db', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.status(200).json({ message: 'Database connected', collections });
  } catch (error) {
    res.status(500).json({ message: 'Error interacting with the database', error });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));



