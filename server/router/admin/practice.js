const express = require('express');
const test_type_controller = require('../../controllers/test_type_controller');
const EnumServerDefinitions=require('../../common/enums/enum_server_definitions');
const authorize=require('../../middlewares/authorize.middlewares');
const practiceController = require('../../controllers/practice.controller');
const authorizeStaff = require('../../middlewares/authorize_staff.middlewares');
const PracticeRouter = express.Router();
//type test

PracticeRouter.get("/page-practice",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.PLANNING,EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
    res.render("admin/practice/page_practice");
});
PracticeRouter.get("/practice-list",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/practice/practice");
});
    PracticeRouter.get("/practice-ajax",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.getPractice);

    PracticeRouter.post("/practice-add",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.addPractice);
    
    PracticeRouter.get("/practice-student/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
        res.render("admin/practice/practice_student");
    });
    PracticeRouter.get("/practice-list-student/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.getPracticeStudentClass);
    PracticeRouter.get("/practice-list-student-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.getOnePracticeStudent);
    PracticeRouter.patch("/practice-list-student-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.updatePracticeStudent);
    PracticeRouter.get("/practice-student-create",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.getStudentListKidsOfClassCreate);
    PracticeRouter.post("/practice-student-create/:practiceId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.addStudentListOfClassCreate);
    PracticeRouter.patch("/practice-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.destroyStudentListOfClassCreate);
    PracticeRouter.patch("/practice-delete-kids/:practiceId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.deletePractice);
    PracticeRouter.post("/practice-add-last-month/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.addPracticeKidsLastMonth);


    //danh sách thss cho học viên nghỉ hè
    PracticeRouter.get("/practice-event",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.getInitEventSummer);
    PracticeRouter.patch("/practice-event/:practiceId/:eventId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.addPracticeStudentOffSummer);

    // quét dữ liệu thêm tự động lại học viên
    PracticeRouter.patch("/practice-check-student/:practiceId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.checkStudentKidsDuplicatePractice);

    // thống kế số lượng
    PracticeRouter.get("/statistical-practice/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.statisticalPracticeKidsInStudentSystem);
    
    module.exports = PracticeRouter;