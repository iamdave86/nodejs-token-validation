/* eslint no-console: 0 */

import app from '../app'

require('dotenv').config()

const { APP_HOST } = process.env

app.listen(APP_HOST, () => {
  console.log(`Express app listening on port ${APP_HOST}`)
})
