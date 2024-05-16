

module.exports = (sequelize, DataTypes) =>{

    const User = sequelize.define('user',{
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        socketID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        joinTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        joined:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })

    return User;
}