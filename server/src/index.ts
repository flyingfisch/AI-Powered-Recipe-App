import 'dotenv/config'
import express, { Request, Response } from 'express'
import recipeRoutes from './routes/recipeRoutes'
import { auth } from 'express-oauth2-jwt-bearer'
import cors from 'cors'

// Setup
const app = express()

const port = process.env.PORT || 7000

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: 'RS256',
})

app.use(cors())
app.use(jwtCheck)
app.use(express.json())

// Routes
app.use('/api', recipeRoutes)

app.get('/authorized', (req: Request, res: Response) => {
  res.send('Secured resource.')
})

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Node.js + TypeScript API!')
})

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
