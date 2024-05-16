
const dbConfig = require('../config/dbConfig');
const {Sequelize, DataTypes}= require('sequelize');
const Users = require('./UserModel');
const Messages = require('./MessageModel');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port : dbConfig.port,
    operatorsAliases: false
}
)

const sequelizeAuth = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
sequelizeAuth();

 const db = {};
 db.Sequelize = Sequelize;
 db.sequelize = sequelize;

 db.users = Users(sequelize, DataTypes);
 db.messages = Messages(sequelize, DataTypes)



async function synchronizeDatabase() {
    try {
        await db.sequelize.sync({ force: false });
        console.log('Database synchronization completed successfully');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
}

// Call the function to synchronize the database
synchronizeDatabase();


// One to Many Relationship
db.users.hasMany(db.messages,{
    foreignKey: 'user_id',
    as: 'user_message',
    onDelete: 'CASCADE',
     hooks:true
})

db.messages.belongsTo(db.users, {
    foreignKey: 'user_id',
    as: 'user',
    onDelete: 'CASCADE',
    hooks: true
})

module.exports = db;