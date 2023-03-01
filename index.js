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
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
})

//TODO: add a client's info
//TODO: get a client's info
//TODO: add a clients time worked
//TODO: get a clients worked time
//TODO: get all clients
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

app.route('/client')
    .post((req, res) => {
        console.log("Adding a client")
        let body = req.body.data
        console.log(req.body.data)
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
        const clientID = req.body.id;
        console.log("getting a client by id")
        let quarystring = `SELECT * FROM public.client where id = ${clientID};`
        console.log(quarystring)
        pool.query(quarystring, (err, resp) => {
            if (err) {
                console.log(err)
                res.status(500)
                res.send(err)
            }
            else {
                console.log(resp.rows)
                res.status(200);
                res.send(resp.rows)
            }
        })
    })

app.route('/clienttime')
    .post((req, res) => {
        const clientID = req.body.id;
        const start = req.body.start;
        const end = req.body.end;
        const completed = req.body.completed
        let quarystring = `INSERT INTO public.timelog
        (clientid, starttime, endtime, completed)
        VALUES(${clientID}, ${start}, ${end}, ${completed});
        `
        pool.query(quarystring, (err, resp) => {
            if (err) {
                console.log(err)
                res.status(500)
                res.send(err)
            }
            else {
                console.log("Adding a clients Time")
                res.status(200);
                res.send("Adding a clients Time")
            }
        })

    })
    .get((req, res) => {
        const clientID = req.body.id;
        console.log("getting a clients time by id")
        let quarystring = `SELECT id, clientid, starttime, endtime, completed
        FROM public.timelog where clientid = ${clientID};`
        pool.query(quarystring, (err, resp) => {
            if (err) {
                console.log(err)
                res.status(500)
                res.send(err)
            }
            else {
                console.log(resp.rows)
                res.status(200);
                res.send(resp.rows)
            }
        })
    })

app.listen(Port, (error) => {
    if (error) {
        console.warn("Error occurred, server can't start", error)
    }
    else {
        console.log("Server is Successfully Running,and App is listening on port " + Port)
    }
})