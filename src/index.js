const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT


app.use(express.json())
app.get('/', (res, req) => {
    console.log(tes)
    res.send('hello world')
})
const authController = require('./auth/auth.controller')
const itemController = require('./item/item.controller')
const userController = require('./user/user.controller')

app.use('/api/auth', authController)
app.use('/api/items', itemController)
app.use('/api/user', userController)

app.listen(PORT, () => {
    console.log('server berjalan' + PORT)
})
