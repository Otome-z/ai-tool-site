import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import apiRouter from './routes/index.js'
import { env } from './utils/env.js'
import { errorHandler } from './middleware/error-handler.js'

const app = express()

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())
app.use('/api', apiRouter)
app.use(errorHandler)

export default app
