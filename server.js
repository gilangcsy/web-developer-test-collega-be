require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.APP_PORT || 3001
const db = require('./app/models/index')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

db.sequelize.sync({ force: false })

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to RanQuotes API!'
    })
})

require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})