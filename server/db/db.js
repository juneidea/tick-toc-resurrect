const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DB_HOST ? `postgres://postgres:password@${process.env.DB_HOST}:5432/${databaseName}`: `postgres://postgres:password@postgres-0:5432/${databaseName}`,
  {
    logging: false,
    dialectOptions: process.env.DATABASE_URL ? {
      ssl: {      /* <----- Add SSL option */
        require: true,
        rejectUnauthorized: false 
      }
    } : undefined,
  }
)
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
