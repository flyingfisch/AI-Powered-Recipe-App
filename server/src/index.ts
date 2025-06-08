import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import recipeRoutes from './routes/recipeRoutes'
import { auth } from 'express-oauth2-jwt-bearer'
import cors from 'cors'
import bodyParser from 'body-parser'

// Setup
const app = express()

const port = process.env.PORT || 7000

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: 'RS256',
})

// Middleware
// TODO: move to a separate file
const jsonErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).send({ error: err })
}

app.use(cors())
app.use(jwtCheck)
app.use(bodyParser.json())
app.use(express.json())

// Routes
app.use('/api', recipeRoutes)

app.get('/authorized', (req: Request, res: Response) => {
  res.send('Secured resource.')
})

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the AI Recipes API.')
})

app.use(jsonErrorHandler)

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
