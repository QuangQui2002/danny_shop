const db = require("../config/connect_database.config");
const logger = require("../config/logger.config");
const sequelize = db.getPool();
const createToken = require("../config/create_token.config");
const EnumServerDefinitions = require("../common/enums/enum_server_definitions");
const server_response = require("../common/utils/server_response");
const SystemConst = require("../common/consts/system_const");
const bcrypt_utilsConfig = require("../config/bcrypt_utils.config");
const accountServices = require("../services/account/account.services");


class AuthController {
    // async register(req, res) {
    //     const { name, email, password } = req.body;
    //     const transaction = await sequelize.transaction();
    //     try {
    //         const checkAccount = await .checkEmailExist(email);
    //         if (checkAccount) {
    //             const errorMessage = "Email đã được sử dụng!";
    //             return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.BAD_REQUEST, errorMessage);
    //         } else {
    //             const newAccount = await AccountService.addAccount(email, password, role, transaction);
    //             await AdminService.addAdmin(newAccount.id, name, transaction);
    //             await transaction.commit();
    //             return server_response.createSuccessResponse(res, SystemConst.STATUS_CODE.SUCCESS, 'Thành Công');
    //         }
    //     } catch (error) {
    //         logger.error(error);
    //         if (error.name === 'SequelizeValidationError') {
    //             // Xử lý lỗi xác nhận từ Sequelize
    //             // Trả về lỗi xác nhận cho client với mã trạng thái 422 Unprocessable Entity
    //             return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.BAD_REQUEST, 'Sai định dạng Email');
    //         } else {
    //             return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.INTERNAL_SERVER, 'Lỗi Server');
    //         }
    //     }
    // }

    async login(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const account = await accountServices.findAccountByEmail(email);
            if (account != null) {
                const isMatch = await bcrypt_utilsConfig.comparePassword(password, account.password);
                if (isMatch) {
                    const accessToken = createToken({ account_id: account.id, role: account.role });
                    const result = {
                        token: accessToken,
                        role: account.role,
                        account_id: account.id,
                    }
                    res.cookie('acid', account.id);
                    res.cookie('role', result.role);
                    res.cookie('token', result.token, { httpOnly: true });
                    const dataUser  ={
                        role: result.role,
                        token: result.token,
                        account_id:account.id
                    }
                    return server_response.createSuccessResponse(res, SystemConst.STATUS_CODE.SUCCESS, dataUser);
                } else {
                    const errorMessage = "Mật Khẩu Không Hợp Lệ!";
                    return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.UNAUTHORIZED_REQUEST, errorMessage);
                }
            } else {
                const errorMessage = 'Email Không Tồn Tại!'
                return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.BAD_REQUEST, errorMessage);
            }
        } catch (error) {
            logger.error(error);
            return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.INTERNAL_SERVER, 'Lỗi Server');
        }
    }

    async updatePassword(req, res) {
        try {
            const account_id = req.params.id;
            const currentPassword = req.body.current_pass;
            const newPassword = req.body.new_pass;
            if (!account_id || !currentPassword || !newPassword) {
                return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.BAD_REQUEST, 'Vui Lòng Nhập Đủ Thông Tin!')
            } else {
                const user = await AccountService.findAccountChangePass(account_id);
                if (!user) {
                    return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.UNAUTHORIZED_REQUEST, 'Người dùng không tồn tại!')
                } else {
                    const passwordMatch = await BcryptUtils.comparePassword(currentPassword, user.password);
                    if (!passwordMatch) {
                        return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.UNAUTHORIZED_REQUEST, 'Mật khẩu không chính xác!')
                    }
                    const hashedPassword = await BcryptUtils.hashPassword(newPassword);
                    await AccountService.updatePass(account_id, hashedPassword)
                    const messageNew = `đã đổi mật khẩu tài khoản`;
                    await notificationServices.createNotifications(account_id, messageNew);
                    return server_response.createSuccessResponse(res, SystemConst.STATUS_CODE.SUCCESS, 'Đổi Mật Khẩu Thành Công!')
                }
            }
        } catch (error) {
            logger.error(error);
            return server_response.createErrorResponse(res, SystemConst.STATUS_CODE.INTERNAL_SERVER, 'Lỗi Server')
        }
    }


}


module.exports = new AuthController;