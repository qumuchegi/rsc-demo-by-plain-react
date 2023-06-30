const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const serverActionRouter = require('./routers/server-actions.js')
const serverComponentRouter = require('./routers/server-component/index.server')
const cors = require('cors')

const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/component', express.static('dist'));

app.engine('html', ejs.renderFile)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
  origin: '*'
}))

app.use('/action', serverActionRouter)
app.use('/component', serverComponentRouter)

app.listen(3000, () => {
    console.log('server start on port 3000')
  })
