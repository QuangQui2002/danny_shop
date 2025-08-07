const EnumMessage = require("../../common/enums/enum_message");
const EnumServerDefinitions = require("../../common/enums/enum_server_definitions");
const bcrypt_utilsConfig = require("../../config/bcrypt_utils.config");
const Account = require("../../models/account.model");

class AccountService {
    async FindOneAccountById(id) {
        try {
            const account = await Account.findOne({
                where: {
                    id: id,
                    status: EnumServerDefinitions.STATUS.ACTIVE
                },
                attributes: ['id', 'password', 'role']
            });
            return account;
        } catch (error) {
            throw error;
        }
    }

    async findAccountByIdAndRole(id, role) {
        try {
            const account = await Account.findOne({
                where: {
                    id: id,
                    status: EnumServerDefinitions.STATUS.ACTIVE
                },
                include: [{
                    model: role === EnumServerDefinitions.ROLE.TEACHER ? Teacher : role === EnumServerDefinitions.ROLE.STAFF ? Staff : role === EnumServerDefinitions.ROLE.STUDENT ? Student : Admin,
                    where: {
                        status: EnumServerDefinitions.STATUS.ACTIVE
                    },
                }],
                attributes: ['id', 'password', 'role']
            });
            return account;
        } catch (error) {
            throw error;
        }
    }

    async findAccountByEmail(email) {
        try {
            const account = await Account.findOne({
                where: {
                    email: email,
                    status: EnumServerDefinitions.STATUS.ACTIVE
                },
            });
            return account;
        } catch (error) {
            throw error;
        }
    }
    async checkEmailExist(email) {
        try {
            const isCheck = await Account.findOne({
                where: {
                    email: email
                }
            });
            return !!isCheck;
        } catch (error) {
            throw error;
        }
    }
    async addAccount(email, password, role) {
        try {
            const hashedPassword = await bcrypt_utilsConfig.hashPassword(password);
            const newAccount = await Account.create({
                email: email,
                password: hashedPassword,
                role: role
            });
            return newAccount;
        } catch (error) {
            throw error;
        }
    }

    async updatePass(accountId, password) {
        try {
            const newAccount = await Account.update({
                password: password,
            }, {
                where: {
                    id: accountId,
                }
            });
            return newAccount;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new AccountService;