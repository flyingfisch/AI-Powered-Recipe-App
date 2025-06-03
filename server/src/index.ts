import 'dotenv/config'
import express, { Request, Response } from 'express'
import recipeRoutes from './routes/recipeRoutes'

const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 7000

app.use(cors())
app.use(express.json())
app.use('/api', recipeRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Node.js + TypeScript API!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
