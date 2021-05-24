const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const colors = require('colors')
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(express.static('public'))
const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/.env` });

const connectDB = require('./database')

const person = require('./person')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

connectDB();
app.get('/ok', (req, res) => res.status(200).json({ name: 'okish' }))
app.post('/login', async (req, res, next) => {
    
    try { 
    	
    	const per = await person.findOne({ name: req.body.name, password: req.body.password })
		console.log(per)
	    if (per && req.body.password === per.password)
        res.status(301).redirect('http://localhost:3000/')
    	else
        res.status(200).send('Unable to login')
    
	}
    catch(err){
		res.send(500).send(err)
    }
})
app.listen(5000, () => console.log('yes listening'))