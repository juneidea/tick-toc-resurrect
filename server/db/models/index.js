const User = require('./user')
const Game = require('./game')

User.hasMany(Game)
Game.belongsTo(User)

module.exports = {
  User,
  Game
}
