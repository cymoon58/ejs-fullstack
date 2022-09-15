require('dotenv').config()
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const path = require('path')
const mongooose = require('mongoose')
const { default: mongoose } = require('mongoose')
const app = express()

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to database'))
app.set('view engine', 'ejs')
//app.set('views', __dirname + 'views')
app.set('views', path.join(__dirname,'views'))


app.set('layout', './layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log('server running on port 3000')
})