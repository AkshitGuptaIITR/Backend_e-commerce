//This is the main server file.
const express = require('express');
const env = require('dotenv');//To import the library
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const category = require('./routes/category');
const userRouter = require('./routes/user');
const adminRoutes = require('./routes/admin/user');
const productRoutes = require('./routes/product');
const cartRouter = require('./routes/cart');

//routes
//here we are importing the routes from the user
// Creating a .env file for the server
// we use npm install --save dotenv for the usage of the dotenv library.
//environment variable or you can say constants.

env.config();


//MongoDB Connection
//This the syntax to connect the mongoodb database here you can use the database
//mongodb+srv://root:<password>@cluster0.oskru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.oskru.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log("Database Connected!!")
});


app.use(express.json());
//Static will allow the use of the images online on your browser
app.use('/public', express.static(path.join(__dirname, 'uploads')));

//These are used to create the api.
//These are used to create user as well well as the admin login

app.use(cors());
app.use('/api', userRouter);
app.use('/api', adminRoutes);
app.use('/api', category);
app.use('/api', productRoutes);
app.use('/api', cartRouter);
// This is used for to excess the server that we have created 
//We can chech the server on the git Basin by node src/index.js
//To Create our first api
//we use get to get the information from the api.

// app.get('/',(req,res,next)=>{
// res.status(200).json({
//     message: "Hello From server"
// })
// }) ;

//We use the post to post information of the api.

app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    })
});
//req takes the information from the body that you have entered in the run time and after the req.body.<the name of the inner variable is used>
// This will Desiplay the message to the api
//Here we have created the server and the api that we can use.

app.listen(process.env.PORT, () => {
    console.log(`Server is running on the port ${process.env.PORT}`)
});