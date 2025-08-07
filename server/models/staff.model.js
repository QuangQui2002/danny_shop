
const { DataTypes, Model } = require('sequelize');

const db = require('../config/connect_database.config');
const sequelize= db.getPool();

//Nhân Viên
class Staff extends Model { }
Staff.init({
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
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    CCCD: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    working_day: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
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
    modelName: 'Staff',
    tableName: 'staffs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});




module.exports = Staff;