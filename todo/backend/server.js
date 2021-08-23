const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const cors = require('cors');
const errorHandler = require('./middleware/error');



//Routes files_directories
const todo = require('./routes/todo');
const auth = require('./routes/auth');

// load env files
dotenv.config({path:'./config/config.env'});

//connect the DB
connectDB()

const app = express();


//body parser

app.use(express.json());
app.use(express.urlencoded())
app.use(cors());

//Mount routes files

app.use('/api/v1/todo',todo);
app.use('/api/v1/auth',auth);

//Middleware

app.use(errorHandler);



const PORT = process.env.PORT || 5000; //
app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV}`));