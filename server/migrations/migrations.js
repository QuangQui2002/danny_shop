const logger = require('../config/logger.config');
const Account = require('../models/account.model');
const Admin = require('../models/admin.model');
const CategoriesProduct = require('../models/categories_product.model');
const Customer = require('../models/customer.model');
const Product = require('../models/product.model');
const Staff = require('../models/staff.model');

//Nếu muốn thay đổi bảng thì sử dung after hoặc force.
( async() => {
    try {
        await Account.sync();
        await Admin.sync();
        await Staff.sync();
        await Customer.sync();
        await CategoriesProduct.sync();
        await Product.sync();
        console.log("Bảng đã được tạo thành công!");
    } catch (error) {
        logger.error(error);
        console.log(error);
        console.log('Không thể tạo được bảng');
    }
})();
