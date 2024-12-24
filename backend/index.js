




const express = require('express');
const connectDb = require('./libs/db');
const app = express();
const cors = require('cors');
const authRoutes = require("./routes/auth");
const bikeRoutes = require('./routes/bike');
const path = require('path');
const bodyParser = require('body-parser');
const forgotPasswordRoute = require('./routes/auth');
const rentals = require("./routes/rentals");
const rentalRoutes = require('./routes/Rental');
const bookingRoutes = require("./routes/bookings")
const http = require('http');
const socketIo = require('socket.io');  // Import socket.io
const dotenv = require('dotenv')
const listedBikesRoute = require('./routes/ListedBikes'); // Correct path to your ListedBikes route
const morgan = require('morgan')
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config()
app.use(cors());

// app.use(bodyParser.json());
app.use(morgan("common"))
app.use(express.json({ limit: '10mb' })); // Adjust the limit as per your need
app.use(express.urlencoded({ limit: '10mb', extended: true })); // For URL-encoded data

app.use('/api/reviews', reviewRoutes); // Register review routes

app.use('/api/auth', authRoutes);
app.use("/api/bookings",bookingRoutes)

app.use('/api/bikes', bikeRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth/forgot-password', forgotPasswordRoute);
app.use("/api/rentals", rentals);
app.use(rentalRoutes);
app.use('/api', listedBikesRoute);  // Ensure you're using the correct base path

const server = http.createServer(app);
const io = socketIo(server);

// On rent event, notify the bike owner
io.on('connection', (socket) => {
  socket.on('rentBike', (bikeOwnerId) => {
    io.to(bikeOwnerId).emit('notification', 'Your bike has been rented!');
  });
});

connectDb(app);



