const jwt = require('jsonwebtoken');
const logger = require('../config/logger.config');
const EnumServerDefinitions = require('../common/enums/enum_server_definitions');
const EnumMessage = require('../common/enums/enum_message');
const AccountService = require('../services/account.services');
const server_response = require('../common/utils/server_response');
const SystemConst = require('../common/consts/system_const');


const secretToken = process.env.ACCESS_TOKEN_SECRET;
const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token == null) {
            throw new Error(EnumMessage.TOKEN.TOKEN_NOT_PROVIDE); // Ném một lỗi nếu token không được cung cấp
        }
        let decodedUser;
        jwt.verify(token, secretToken, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    throw new Error(EnumMessage.TOKEN.TOKEN_EXPIRED);
                } else {
                    throw new Error(EnumMessage.TOKEN.TOKEN_NOT_INVALID); // Ném lỗi nếu token không hợp lệ
                }
            }
            decodedUser = user;
        });
        const account = await AccountService.findAccountById(decodedUser.account_id, decodedUser.role);
        if (!account) {
                // const errorMessage = decodedUser.role === EnumServerDefinitions.ROLE.TEACHER ? 'Giáo Viên Không Tồn Tại' : 'Nhân Viên Không Tồn Tại';
                // return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.UNAUTHORIZED_REQUEST, errorMessage);
            // return res.redirect('/404');
            return res.render('admin/error/404');
        }
        req.user = decodedUser;
        next();
    } catch (error) {
        logger.error(error);
        // const errorMessage = 'Vui Lòng Đăng Nhập';
            // return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.UNAUTHORIZED_REQUEST, errorMessage);
            return res.render('admin/error/404');
    }
}

module.exports = authenticateToken;