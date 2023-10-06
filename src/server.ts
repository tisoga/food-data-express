import express from 'express';
import { foodRouter } from './routes'

const app = express()
const PORT = 8080

app.use(express.json())

app.use('/api/v1', foodRouter)

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`)
})