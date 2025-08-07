const express = require('express');
const test_type_controller = require('../../controllers/test_type_controller');
const EnumServerDefinitions=require('../../common/enums/enum_server_definitions');
const authorize=require('../../middlewares/authorize.middlewares');
const practiceController = require('../../controllers/practice.controller');
const authorizeStaff = require('../../middlewares/authorize_staff.middlewares');
const PracticeTeenRouter = express.Router();
//type test
PracticeTeenRouter.get("/practice-list",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/practice_teen/practice");
});
PracticeTeenRouter.get("/practice-ajax",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.getPracticeTeens);

PracticeTeenRouter.post("/practice-add",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.addPracticeTeens);

PracticeTeenRouter.get("/practice-student/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/practice_teen/practice_student");
});
PracticeTeenRouter.get("/practice-list-student/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.getPracticeStudentClassTeens);
PracticeTeenRouter.get("/practice-list-student-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.getOnePracticeStudent);
PracticeTeenRouter.patch("/practice-list-student-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.updatePracticeStudent);
PracticeTeenRouter.get("/practice-student-create",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.getStudentListOfClassCreateTeens);
PracticeTeenRouter.post("/practice-student-create/:practiceId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.addStudentListOfClassCreate);
PracticeTeenRouter.patch("/practice-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.destroyStudentListOfClassCreate);
PracticeTeenRouter.patch("/practice-delete-teens/:practiceId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.deletePractice);

PracticeTeenRouter.post("/practice-add-last-month/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.addPracticeTeenLastMonth);

// quét dữ liệu thêm tự động lại học viên
PracticeTeenRouter.patch("/practice-check-student/:practiceId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.checkStudentTeenDuplicatePractice);

module.exports = PracticeTeenRouter;