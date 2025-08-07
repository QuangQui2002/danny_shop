const { DataTypes, Model } = require('sequelize');

const db = require('../config/connect_database.config');
const Admin = require('./admin.model');
const Staff = require('./staff.model');
const Customer = require('./customer.model');
const sequelize = db.getPool();
//Tài Khoản
class Account extends Model { }
Account.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
        allowNull: false
    },
    status: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
});

Account.hasOne(Admin, {foreignKey: 'account_id'});
Account.hasOne(Staff, {foreignKey: 'account_id'});
Account.hasOne(Customer, {foreignKey: 'account_id'});
Staff.belongsTo(Account, { foreignKey: 'account_id' });
Admin.belongsTo(Account, { foreignKey: 'account_id' });
Customer.belongsTo(Account, { foreignKey: 'account_id' });

module.exports = Account;