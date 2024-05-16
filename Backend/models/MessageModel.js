module.exports = (sequelize, DataTypes) =>{

    const Message = sequelize.define('user_message',{
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        messageBy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        messageTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        socketID: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Message;
}