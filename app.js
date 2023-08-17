/**
 * Express server config
 */
const express   = require('express'); // import express package

const userRoute = require('./modules/userModule/route/index'); // import userModule route

const app       = express(); // call express function middleware

const port      = 5001; // Define available PORT to use

app.use(express.json()); // to use the form BODY json format

app.use(express.urlencoded({ extended: true })); // to use form URLENCODED format

app.use(userRoute); // To use the user route index.js





app.listen(port, () =>{
    console.log("Server is running on port:" + port);
})

