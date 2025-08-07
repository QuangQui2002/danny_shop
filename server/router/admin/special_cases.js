const express = require('express');
const test_type_controller = require('../../controllers/test_type_controller');
const EnumServerDefinitions=require('../../common/enums/enum_server_definitions');
const authorize=require('../../middlewares/authorize.middlewares');
const authorizeStaff = require('../../middlewares/authorize_staff.middlewares');
const SpecialCasesController = require('../../controllers/special_cases');
const SpecialCasesRouter = express.Router();
//type test
SpecialCasesRouter.get("/",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
    res.render("admin/special_cases/special_cases");
});
SpecialCasesRouter.get("/list-special",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),SpecialCasesController.getStudentSpecialCases);

SpecialCasesRouter.get("/special-cases-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),SpecialCasesController.getOneTutoringById);
SpecialCasesRouter.patch("/special-cases-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),SpecialCasesController.updateTutoring);
SpecialCasesRouter.patch("/special-cases-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),SpecialCasesController.destroyTutoring);

module.exports = SpecialCasesRouter;