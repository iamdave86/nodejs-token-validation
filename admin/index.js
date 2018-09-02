/* eslint no-console: 0 */

import path from 'path'
import express from 'express'

import routes from './routes'
import initApp from '../server/initApp'

const admin = express()
const viewsPath = path.join(__dirname, 'views')

initApp('admin', admin, viewsPath, routes)

export default admin
