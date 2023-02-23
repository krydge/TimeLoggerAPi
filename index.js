const express = require('express')
const cors = require('cors')
const Port = 3000
const app = express()
app.use(cors())


app.route('/')
.get((req, res)=>{
    console.log("Get request to the '/' endpoint")
    res.status(200);
    res.send("Welcome to the Rydge Software Time Logger API.")
});


app.listen(Port, (error)=>{
    if(error){
        console.warn("Error occurred, server can't start", error)
    }
    else{
        console.log("Server is Successfully Running,and App is listening on port " + Port)
    }
})