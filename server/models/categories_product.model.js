
const { DataTypes, Model } = require('sequelize');

const db = require('../config/connect_database.config');
const sequelize = db.getPool();

//Nhân Viên
class CategoriesProduct extends Model { }
CategoriesProduct.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'CategoriesProduct',
    tableName: 'categories_product',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});




module.exports = CategoriesProduct;