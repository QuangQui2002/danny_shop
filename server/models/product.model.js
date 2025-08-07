
const { DataTypes, Model } = require('sequelize');

const db = require('../config/connect_database.config');
const CategoriesProduct = require('./categories_product.model');
const sequelize= db.getPool();

//Nhân Viên
class Product extends Model { }
Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    detail_product: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    type_color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type_size: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'categories_product',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


Product.belongsTo(CategoriesProduct, { foreignKey: 'category_id' });
CategoriesProduct.hasMany(Product, {foreignKey: 'category_id'});

module.exports = Product;