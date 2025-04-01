import express from "express"

const app = express()

//Routing
app.get('/', (req, res) => {
    res.send('Hola con typescript')
})

export default app