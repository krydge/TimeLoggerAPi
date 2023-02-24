require('dotenv').config()
var bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const Port = 3000
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Client = require("./Models/Client")

const { Pool } = require('pg')
app.use(cors())

const pool = new Pool({
    user: 'RydgeSoftware',
    host: "postgres.cw6zbbgxiti2.us-west-2.rds.amazonaws.com",
    database: 'postgres',
    password: 'Farmerslayer12',
    port: 5432,
})


app.route('/')
    .get((req, res) => {
        console.log("Get request to the '/' endpoint")
        res.status(200);
        res.send("Welcome to the Rydge Software Time Logger API.")
    });

app.route('/Clients')
    .get((req, res) => {
        console.log("Getting all clients")
        let clients = []
        pool.query('SELECT * from public.client;', (err, resp) => {
            if (err) {
                console.log(err)
                res.status(500)
                res.send(err)
            }
            else {
                resp.rows.map((client) => {
                    clients.push(client)
                })
                if (clients.length > 0) {
                    res.status(200);
                    res.json(clients)
                }
                else {
                    res.status(200);
                    res.send("No Clients")
                }
            }
        })

    })

// function addClient(clientInfo){
//     return "insert into public.client (companyname, contactname,phonenumber,email,preferredlanguage,startdate,enddate,rate,billingtimeframe,signedcontract,projectdesription) values('Rydge Software','Kaydon Stubbs','4352622247','RydgeSoftware@gmail.com','English','2/24/2023','3/3/2023',100,'BiWeekly',true,'Create a mobile app to track time worked for clients and to send out invoices and keep track of income.')"
// }

app.route('/client')
    .post((req, res) => {
        console.log("Adding a client")
        let body = req.body
        console.log(req.body.companyname)
        console.log("-----------------------------------------------------------------------------------------------------------------------------------------------------------------")
        let quarystring = `insert into public.client (companyname, contactname, phonenumber, email, preferredlanguage, startdate, enddate, rate, billingtimeframe, signedcontract, projectdesription) values('${body.companyname}','${body.contactname}','${body.phonenumber}','${body.email}','${body.preferredlanguage}','${body.startdate}','${body.enddate}', ${body.rate},'${body.billingtimeframe}',${body.signedcontract},'${body.projectdescription}')`
        console.log(quarystring)
        pool.query(quarystring, (err, resp) => {
            if (err) {
                console.log(err)
                res.status(500)
                res.send(err)
            }
            else {
                res.status(200);
                res.send("Adding a client")
            }
        })

    })
    .get((req, res) => {
        console.log("getting a client by id")
        res.status(200);
        res.send("getting a client by id")
    })

app.listen(Port, (error) => {
    if (error) {
        console.warn("Error occurred, server can't start", error)
    }
    else {
        console.log("Server is Successfully Running,and App is listening on port " + Port)
    }
})