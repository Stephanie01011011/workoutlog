//npm i dotenv
require('dotenv').config()
const workoutRoutes = require('./routes/workouts')
//npm i express
const express = require('express');
const cors = require('cors');

//mongoose connects to the server, and helps create structure for data
//npm i mongoose
const mongoose = require('mongoose');


const app = express();
/*{
    origin: '*'
}*/
app.use(cors());
app.use(express.json());
//middleware
app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/', workoutRoutes)
app.use('/api/workouts', workoutRoutes);

app.get('*',function (req, res) {
    res.redirect('/');
});
//connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
    //move app listen here. listen only once db is connected
    app.listen(process.env.PORT, () => {
        console.log(`Connected to db and Listening on port ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log(err)
})




