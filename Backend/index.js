const express = require('express')
const mongoose = require('mongoose')
const app = express();
const port = 2020;
const cors = require('cors')
const fileupload = require('express-fileupload')

app.use(fileupload())
app.use(express.urlencoded({extended:true}))

app.use(express.json())
app.use(cors())

const mongoUrl = 'mongodb://localhost:27017/admin'

mongoose.connect(mongoUrl)
.then(() => console.log('connected'))
.catch(() => console.log('not connected'))

const userrouter = require('./Router/UserRouter')
const taskrouter = require('./Router/TaskRouter')
// const adminRoutes = require('./Router/AdminRoutes');


// app.use('/admin', adminRoutes);
app.use('/user', userrouter)
app.use('/work', taskrouter)


app.listen(port, () => {
    console.log(`port ${port} is listning`)
})