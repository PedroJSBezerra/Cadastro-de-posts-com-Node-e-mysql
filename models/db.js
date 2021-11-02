const Sequelize = require('sequelize')

// Conexão com o banco de ddos mysql
const sequelize = new Sequelize('postapp', 'root', 'pedro1516', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}