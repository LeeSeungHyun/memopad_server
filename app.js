/* =======================
    LOAD THE DEPENDENCIES
==========================*/

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

// const allowCORS = function(req, res, next) {
//     res.header('Acess-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');;
//     (req.method === 'OPTIONS') ?
//       res.send(200) :
//       next();
//   };

/* =======================
    LOAD THE CONFIG
==========================*/
const config = require('./config');
const port = process.env.PORT || 3000 

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express()
app.use(cors({credentials: true, origin: true}))
// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// configure api router
app.use('/api', require('./routes/api'));

// print the request log on console
app.use(morgan('dev'))

// set the secret key variable for jwt
app.set('jwt-secret', config.secret)

// index page, just for testing
app.get('/', (req, res) => {
    res.send('Hello JWT')
})

// open the server
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})

mongoose.connect(config.mongodbUri)
const db = mongoose.connection
db.on('error', console.error)
db.once('open', ()=>{
    console.log('connected to mongodb server')
})