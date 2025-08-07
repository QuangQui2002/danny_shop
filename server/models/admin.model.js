const { DataTypes, Model } = require('sequelize');

const db = require('../config/connect_database.config');

const sequelize = db.getPool();
//Admin
class Admin extends Model { }
Admin.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'accounts',
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type_admin: {
        type: DataTypes.STRING,
        allowNull: true   
    },
    status: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Admin',
    tableName: 'admin',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


module.exports = Admin;