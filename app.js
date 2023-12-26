require('dotenv').config();
require('./databases/config')
const app = require('express')();
const http = require('http').Server(app);
const userRoute = require('./routes/userRoute.js')
app.use('/',userRoute)

// Setting up Server 

http.listen(3000,()=>{
    console.log("server is running on port 3000");
})