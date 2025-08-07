const SystemConst = require("../common/consts/system_const");
const server_response = require("../common/utils/server_response");
const db = require("../config/connect_database.config");
const logger = require("../config/logger.config");
const sequelize = db.getPool();
const moment = require('moment-timezone');
const accountServices = require("../services/account/account.services");
const EnumServerDefinitions = require("../common/enums/enum_server_definitions");
const adminServices = require("../services/admin/admin.services");
const EnumMessage = require("../common/enums/enum_message");

class AdminController {
    async addAdmin(req, res) {
        console.log(123);
        
        try {
            const name = 'admin';
            const email = 'admin';
            const password = 'admin';
            const type_admin = 'Quản Lý';
            const role = EnumServerDefinitions.ROLE.ADMIN;
            const newAccount = await accountServices.addAccount(email, password, role);
            if(!newAccount){
                return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.INTERNAL_SERVER, EnumMessage.DEFAULT_ERROR);
            }
            await adminServices.addAdmin(newAccount.id, name, type_admin);
                return server_response.createSuccessResponse(res, SystemConst.STATUS_CODE.SUCCESS, EnumMessage.RESPONSE.SUCCESS);
        } catch (error) {
            logger.error(error);
            return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.INTERNAL_SERVER, EnumMessage.DEFAULT_ERROR);
        }
    }
    
}

module.exports = new AdminController;