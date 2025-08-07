const { Op } = require('sequelize');
const moment = require('moment-timezone');
const Staff = require('../../models/staff.model');
const EnumServerDefinitions = require('../../common/enums/enum_server_definitions');
class StaffServices {
    async findOneStaffById(id) {
        try {
            const admin = await Staff.findOne({
                where:{
                    id: id,
                }
            },);
            return admin;
        } catch (error) {
            throw error;
        }
    }
    async findOneStaffByAccountId(account_id) {
        try {
            const admin = await Staff.findOne({
                where:{
                    account_id: account_id,
                }
            },);
            return admin;
        } catch (error) {
            throw error;
        }
    }

    async addStaff(account_id, name, date_of_birth , gender,address,phone_number, CCCD, working_day, type_staff, transaction) {
        try {
            const addAdmin = await Staff.create({
                account_id: account_id,
                name: name,
                date_of_birth: date_of_birth,
                gender: gender,
                address: address,
                phone_number: phone_number,
                CCCD: CCCD,
                working_day: working_day,
                type_staff: type_staff,
            }, { transaction: transaction });
            return addAdmin;
        } catch (error) {
            throw error;
        }
    }

    async updateStaff(id, name, date_of_birth , gender,address,phone_number, CCCD, working_day, type_staff, transaction) {
        try {
            const isUpdate = await Staff.update({
                name: name,
                date_of_birth: date_of_birth,
                gender: gender,
                address: address,
                phone_number: phone_number,
                CCCD: CCCD,
                working_day: working_day,
                type_staff: type_staff,
            }, {
                where: {
                    id: id,
                }
            }, { transaction: transaction });
            return isUpdate > EnumServerDefinitions.EMPTY;
        } catch (error) {
            throw error;
        }
    }
    
    async deleteStaff(id,acid) {
        try {
            const staff = await Staff.findOne({
            where: {
                id: id,
            }
        });
        if(staff.status == EnumServerDefinitions.STATUS.ACTIVE){
            const isDelete = await Staff.update({
                status: EnumServerDefinitions.STATUS.NO_ACTIVE
            }, {
                where: {
                    id: id,
                    status: EnumServerDefinitions.STATUS.ACTIVE
                },
            });
            const message =`đã đóng nhân viên ${staff.name}`;
            await notificationServices.createNotifications(acid,message)
            return isDelete > EnumServerDefinitions.EMPTY;
        }else{
            const isDelete = await Staff.update({
                status: EnumServerDefinitions.STATUS.ACTIVE
            }, {
                where: {
                    id: id,
                    status: EnumServerDefinitions.STATUS.NO_ACTIVE
                }, 
            });
            const message =`đã mở nhân viên ${staff.name}`;
            await notificationServices.createNotifications(acid,message)
            return isDelete > EnumServerDefinitions.EMPTY;
        }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new StaffServices;