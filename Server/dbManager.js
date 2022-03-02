let sql = require("mysql");
require('dotenv').config();
let con = sql.createConnection({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    database: process.env.database,
    port: process.env.port
})

const port = 80;

let clc = require("cli-color")
const axios = require('axios'); 
const cheerio = require("cheerio")
const express = require('express')
const app = express()
const cors = require("cors")

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())
app.get('/', function (req, res) {
    console.log(clc.redBright(`Got request from: ${req.hostname}`))
  res.send('Welcome to intercamp84 staff app')
})
app.get("/sectors", (req, res)=>{
    con.query("SELECT * FROM sectors WHERE symbol = ? AND number = ?", [req.query.symbol, req.query.number], (err, res2)=>{
        res.send(res2[0])
    })
})

app.post("/sectors", (req, res)=>{
    if(req.body.symbol == undefined || req.body.number == undefined || req.body.commentData == undefined) {console.log("Dajcie dane"); return}
    else{
        con.query("UPDATE sectors SET comment = ? WHERE symbol = ? AND number = ?", [req.body.commentData, req.body.symbol, req.body.number], (err, Sqlres)=>{
            if(!err) res.status(200)
        })
    }
})

app.post("/sectorState", (req, res)=>{
    if(req.body.symbol == undefined || req.body.number == undefined || req.body.state == undefined) {console.log("Dajcie dane"); return}
    else{
        con.query("UPDATE sectors SET state = ? WHERE symbol = ? AND number = ?", [req.body.state, req.body.symbol, req.body.number], (err, Sqlres)=>{
            if(!err) res.status(200)
        })
    }
})


app.get("/sectorsAll", (req, res)=>{
    con.query("SELECT * FROM sectors", (err, SqlRes)=>{
        res.send(SqlRes)
    })
})

/*WebScraper*/


app.get("/AmazonScrape", async (req, res)=>{
    axios.get(encodeURI(process.env.url)) 
	.then(({ data }) => {
        const $ = cheerio.load(data);
        res.send({
            price: `${$(".a-section.a-spacing-micro").text().split("zł")[0].replace(/\s/g, '')}PLN`,
            name: $("#productTitle").text(),
            time: `${new Date().getHours()}:${new Date().getMinutes()}`
        })
    });

})

app.listen(port, () =>{
    console.log(clc.green(`App listening on port: ${port}`))
})