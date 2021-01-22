const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')

//Database connection
//const url = 'mongodb://vidhi-shard-00-00.bxchf.mongodb.net:27017/pizza';

mongoose.connect('mongodb+srv://vidhi7:Vidhi7127@vidhi.bxchf.mongodb.net/pizza?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

const connection = mongoose.connection;
connection.once('open',() =>{
    console.log('Database connected...');
}).catch(err =>{
    console.log('Connection failed...')
});

//Assets
app.use(express.static('public'))


//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs')

app.listen(PORT, () => {
    console.log(`Listening on port test ${PORT}`)
})

require('./routes/web')(app)

