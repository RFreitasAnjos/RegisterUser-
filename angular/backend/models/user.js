const {DataTypes } = require('sequelize');

const sequelize = require('../db');

const User = sequelize.define('User', {
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    }
});

module.exports = User;