
const mongoose = require('mongoose');

function connectDb (app){
  
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connected to database");
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    })
    .catch((error) => {
        console.error("Connection failed:", error.message);
    });

}


module.exports = connectDb