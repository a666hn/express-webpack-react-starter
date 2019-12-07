const path = require('path')
const router = require('express').Router()

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

router.get('/about/skinnyguy', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'about', 'index.html'))
})

router.get('*', (req, res) => {
  res.send('PAGE NOT FOUND!')
})

module.exports = router
