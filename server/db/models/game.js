const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  moduleTotal: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 5,
    validate: {
      notEmpty: true
    }
  },
  modulesFailed: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true
    }
  },
  startTime: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 300
  },
  finishTime: {
    type: Sequelize.INTEGER
  },
  solveTime: {
    type: Sequelize.INTEGER
  },
  strikesAllowed: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 3,
    validate: {
      notEmpty: true
    }
  },
  strikeCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 3,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.ENUM('diffused', 'failed'),
    allowNull: false
  }
})

module.exports = Game
