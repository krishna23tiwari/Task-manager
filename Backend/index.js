const express = require('express')
const mongoose = require('mongoose')
const app = express();
const port = 2020;
const cors = require('cors')

app.use(express.json())
app.use(cors())

const mongoUrl = 'mongodb://localhost:27017/admin'

mongoose.connect(mongoUrl)
.then(() => console.log('connected'))
.catch(() => console.log('not connected'))

const userrouter = require('./Router/UserRouter')
const taskrouter = require('./Router/TaskRouter')
const emprouter = require('./Router/EmpRouter')


app.use('/user', userrouter)
app.use('/work', taskrouter)
app.use('/emp', emprouter)

app.listen(port, () => {
    console.log(`port ${port} is listning`)
})