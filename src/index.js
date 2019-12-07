const path = require('path')
const express = require('express')
const helmet = require('helmet')

require('dotenv/config')

const app = express()
const router = require('../router')

app.use(helmet())

app.use(express.static(path.resolve(__dirname, '..', 'public')))

app.use(router)

app.listen(process.env.PORT, () => {
  console.log('🚀 Dirname => ', __dirname)
  console.log(`🚀 Your Apps running on ${process.env.HOST}:${process.env.PORT}`)
})
