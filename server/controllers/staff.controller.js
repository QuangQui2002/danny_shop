const db = require("../config/connect_database.config");
const logger = require("../config/logger.config");

const sequelize = db.getPool();
const fs = require('fs-extra');
const AccountService = require('../services/account.services');
const EnumServerDefinitions = require("../common/enums/enum_server_definitions");
const EnumMessage = require("../common/enums/enum_message");
const CommonService = require('../common/utils/common_service');
const StaffService = require('../services/staff/staff.services');
const ServerResponse = require("../common/utils/server_response");
const SystemConst = require("../common/consts/system_const");
const department_staffServices = require("../services/department_staff.services");
const fileServices = require("../services/file/file.services");
const file_profileServices = require("../services/file/file_profile.services");
const notificationServices = require("../services/notification/notification.services");
const moment = require('moment-timezone');
const staffServices = require("../services/staff/staff.services");
const accountServices = require("../services/account.services");
class StaffController {
    async addStaff(req, res) {
        const name = req.body.name;
        const dateOfBirth = req.body.date_of_birth;
        const gender = req.body.gender;
        const address = req.body.address;
        const phoneNumber = req.body.phone_number;
        const CCCD = req.body.CCCD;
        const working_day = req.body.working_day;
        const type_staff = req.body.type_staff;
        const department = req.body.department;
        if (!name || !CCCD || !phoneNumber || !dateOfBirth || !working_day) {
            return ServerResponse.createErrorResponse(res, SystemConst.STATUS_CODE.BAD_REQUEST, 'Chưa Đủ Thông Tin');
        }
        const role = EnumServerDefinitions.ROLE.STAFF;
        const email = req.body.email;
        try {
            const checkAccount = await AccountService.checkEmailExist(email);
            if (checkAccount) {

                return ServerResponse.createErrorResponse(res, SystemConst.STATUS_CODE.UNAUTHORIZED_REQUEST, EnumMessage.ALREADY_EXIST);
            }
            const isCheckCCCD = await CommonService.checkCCCDUserExist(CCCD, role);
            if (isCheckCCCD) {
                const errorMessage = 'CCCD đã tồn tại';
                return ServerResponse.createErrorResponse(res, SystemConst.STATUS_CODE.CONFLICT, errorMessage);
            }
            if (req.files !== undefined) {
                for (var j = 0; j < req.files.length; j++) {
                    if (req.files[j].size > 10 * SystemConst.KB * SystemConst.KB) {
                        if (req.files) {
                            req.files.forEach((file) => {
                                const filePath = file.destination + file.filename;
                                fs.removeSync(filePath);
                            });
                        }
                        return ServerResponse.createErrorResponse(res, SystemConst.STATUS_CODE.CONFLICT, 'File quá nặng vui lòng chọn file khác!');
                    }
                }
            }
            const newAccount = await AccountService.addAccount(email, CCCD, role);
            const newStaff = await StaffService.addStaff(name, dateOfBirth, gender, regular_address, temporary_residence_address, phoneNumber, relatives_phone_number, CCCD, workingday, laborcontract, typework, type_staff, newAccount.id, department_other);
            if (department) {
                for (var i = 0; i < department.length; i++) {
                    const depart = parseInt(department[i])
                    if (typeof depart === 'number' && !isNaN(depart)) {
                        await department_staffServices.addDepartmentStaff(newStaff.id, department[i]);
                    }
                }
            }
            if (req.files !== undefined) {
                for (var i = 0; i < req.files.length; i++) {
                    const filename = Buffer.from(req.files[i].originalname, 'ascii').toString('utf8');
                    const physical_name = req.files[i].filename;
                    const file_type = req.files[i].mimetype;
                    const fileNew = await fileServices.addFile(filename, physical_name, file_type);
                    await file_profileServices.addFileProfileStaff(newStaff.id, fileNew.id);
                }
            }
            const message = `đã thêm nhân viên ${name + ' với mã số NV0' + newStaff.id} vào hệ thống`;
            await notificationServices.createNotifications(req.user.account_id, message)

            return ServerResponse.createSuccessResponse(res, SystemConst.STATUS_CODE.SUCCESS, 'Thêm Thành Công');
        } catch (error) {
            logger.error(error);
            if (req.files) {
                req.files.forEach((file) => {
                    const filePath = file.destination + file.filename;
                    fs.removeSync(filePath);
                });
            }
            if (error.name === 'SequelizeValidationError') {
                return ServerResponse.createErrorResponse(res, SystemConst.STATUS_CODE.UNAUTHORIZED_REQUEST, 'Sai định dạng Email');
            } else {
                return ServerResponse.createErrorResponse(res, SystemConst.STATUS_CODE.INTERNAL_SERVER, 'Lỗi Server');
            }
        }
    }

}


module.exports = new StaffController;