const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const sequelize = require('./helpers/sequelize')

const {PORT} = process.env

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(morgan('dev'))
app.use('/', require('./routes'))

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`)
  sequelize.sync()
})
