require('express-async-errors')
const express = require('express')
const app = express()

const studentsRoute = require('./students/routes')

const port = process.env.PORT||3000
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world Israel')
})

app.use('/api/v1/students', studentsRoute)

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()