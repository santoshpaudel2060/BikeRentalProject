
// const express = require('express');
// const connectDb = require('./libs/db');
// const app = express();
// const cors = require('cors');
// const authRoutes = require("./routes/auth");
// const bikeRoutes = require('./routes/bike')
// const path = require('path');
// const bodyParser = require('body-parser');
// const forgotPasswordRoute = require('./routes/auth')

// const rentals = require("./routes/rentals");
// const rentalRoutes = require('./routes/Rental'); 
// const http = require('http');




// app.use(cors()); 
// app.use(express.json());
// app.use(bodyParser.json()); 
// app.use('/api/auth', authRoutes)
// app.use('/api/bikes', bikeRoutes)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/auth/forgot-password', forgotPasswordRoute);
// app.use("/api/rentals", rentals);
// app.use(rentalRoutes);

// const server = http.createServer(app);
// const io = socketIo(server);

// // On rent event, notify the bike owner
// io.on('connection', (socket) => {
//   socket.on('rentBike', (bikeOwnerId) => {
//     io.to(bikeOwnerId).emit('notification', 'Your bike has been rented!');
//   });
// });


// connectDb(app)

// require('dotenv').config();







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

dotenv.config()
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use("/api/bookings",bookingRoutes)
app.use('/api/bikes', bikeRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth/forgot-password', forgotPasswordRoute);
app.use("/api/rentals", rentals);
app.use(rentalRoutes);

const server = http.createServer(app);
const io = socketIo(server);

// On rent event, notify the bike owner
io.on('connection', (socket) => {
  socket.on('rentBike', (bikeOwnerId) => {
    io.to(bikeOwnerId).emit('notification', 'Your bike has been rented!');
  });
});

connectDb(app);

require('dotenv').config();


