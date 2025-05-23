require('dotenv').config();
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./models'); // Import the centralized db object
const parkingSlotRoutes = require('./routes/parkingSlot');
const carRoutes = require('./routes/car');
const parkingRecordRoutes = require('./routes/parkingRecord');
const paymentRoutes = require('./routes/payment');
const reportRoutes = require('./routes/report');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/parking-slots', parkingSlotRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/parking-records', parkingRecordRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportRoutes);

// Sync database and start server
const PORT = process.env.PORT || 3000;
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => console.log('Error: ' + err));