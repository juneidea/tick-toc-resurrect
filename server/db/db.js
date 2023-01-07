const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://iordtuttwhfmez:2b4f10d0201a58cc8c689592bb5b1a14c47332e9d312f7125909f8197a877c4d@ec2-3-229-252-6.compute-1.amazonaws.com:5432/d9i8n3o5ir1eba`,
  {
    logging: false,
    dialectOptions: {
      ssl: {      /* <----- Add SSL option */
        require: true,
        rejectUnauthorized: false 
      }
    },
  }
)
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
