/* eslint no-console: 0 */

import path from 'path'
import express from 'express'

import admin from '../admin'
import routes from './routes'
import initApp, { initDb } from '../server/initApp'

const app = express()
const viewsPath = path.join(__dirname, 'views')

initDb(app)

app.use('/admin', admin)

initApp('app', app, viewsPath, routes)

export default app
