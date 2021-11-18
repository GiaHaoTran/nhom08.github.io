const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const mongoClient = require('mongoose')

// setup connect mongodb by mongoose
const URL = 'mongodb+srv://doadmin:17F3aH68U0t9gLO4@db-mongodb-sgp1-13649-ec8f6987.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=db-mongodb-sgp1-13649&tls=true&tlsCAFile=ca-certificate.crt'
mongoClient.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('✅ Connected database from mongodb.'))
    .catch((error) => console.error(`❌ Connect database is failed with error which is ${error}`))

const app = express()

const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
//const cartitemRoute = require('./routes/cartitem')

// Middlewares
app.use(logger('dev'))
app.use(bodyParser.json())

// Routes
app.use('/users', userRoute)
app.use('/categories', categoryRoute)
app.use('/products', productRoute)
app.use('/cart', cartRoute)
//app.use('/cartitem', cartitemRoute)

// Routes
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Server is OK!'
    })
})

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    // response to client
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

// Start the server
const port = app.get('port') || 3200
app.listen(port, () => console.log(`Server is listening on port ${port}`))