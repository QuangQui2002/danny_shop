
const { DataTypes, Model } = require('sequelize');

const db = require('../config/connect_database.config');
const sequelize= db.getPool();

//Nhân Viên
class Customer extends Model { }
Customer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    gender: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    type_staff: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'accounts',
            key: 'id'
        }
    },
    avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});




module.exports = Customer;