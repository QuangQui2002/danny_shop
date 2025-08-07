const { Op } = require('sequelize');
const moment = require('moment-timezone');
const Admin = require('../../models/admin.model');
class AdminService {
    async findOneAdminById(id) {
        try {
            const admin = await Admin.findOne({
                where:{
                    id: id,
                }
            },);
            return admin;
        } catch (error) {
            throw error;
        }
    }
    async findOneAdminByAccountId(account_id) {
        try {
            const admin = await Admin.findOne({
                where:{
                    account_id: account_id,
                }
            },);
            return admin;
        } catch (error) {
            throw error;
        }
    }

    async addAdmin(account_id, name, type_admin) {
        try {
            const addAdmin = await Admin.create({
                account_id: account_id,
                name: name,
                type_admin : type_admin
            });
            return addAdmin;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AdminService;