const express = require('express');
const test_type_controller = require('../../controllers/test_type_controller');
const EnumServerDefinitions=require('../../common/enums/enum_server_definitions');
const authorize=require('../../middlewares/authorize.middlewares');
const authorizeStaff = require('../../middlewares/authorize_staff.middlewares');
const test_linkController = require('../../controllers/test_link.controller');
const TestTypeRouter = express.Router();
//type test
TestTypeRouter.get("/",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
  res.render("admin/type_test/page_test");
});

TestTypeRouter.get("/type",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
    res.render("admin/type_test/test");
  });
  TestTypeRouter.get("/test-type-ajax",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.CSKH]),test_type_controller.getTestType);
  TestTypeRouter.post("/test-type-add",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.CSKH]),test_type_controller.addTestType);
  TestTypeRouter.get("/test-type-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.CSKH]),test_type_controller.getTestTypeById);
  TestTypeRouter.post("/test-type-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.CSKH]),test_type_controller.updateTestType);
  TestTypeRouter.patch("/test-type-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN]),test_type_controller.deleteTestType);
  TestTypeRouter.patch("/test-type-agree/:id",authorize([EnumServerDefinitions.ROLE.ADMIN]),test_type_controller.testTypeAgree);
  TestTypeRouter.patch("/test-type-refuse/:id",authorize([EnumServerDefinitions.ROLE.ADMIN]),test_type_controller.testTypeRefuse);


  //lịch test
  TestTypeRouter.get("/calendar-test/:month/:year",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
    res.render("admin/type_test/calendar_test");
  });
  TestTypeRouter.get("/calendar-test-ajax/:month/:year",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.CSKH]),test_type_controller.getAllCalendarTestClass);
  TestTypeRouter.post("/calendar-test-add",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.CSKH]),test_type_controller.addCalendarTestClass);
  TestTypeRouter.get("/calendar-test-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.CSKH]),test_type_controller.getOneCalendarTestClass);
  TestTypeRouter.patch("/calendar-test-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.CSKH]),test_type_controller.updateCalendarTestClass);
  TestTypeRouter.patch("/calendar-test-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.CSKH]),test_type_controller.deleteCalendarTestClass);
  
  TestTypeRouter.get("/calendar-test-init",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.CSKH]),test_type_controller.getAllInit);
  
  TestTypeRouter.get("/student-test/:classId/:testTypeId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.CSKH]),test_type_controller.getAllStudentTestOfClassTest);


  // class test deadline
  TestTypeRouter.get("/calendar-test-deadline",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),test_type_controller.getClassTestCalendarDashBoard);



  // test link
  TestTypeRouter.get("/test-link",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
    res.render("admin/type_test/link_test");
  });
  TestTypeRouter.get("/get-test-link-active",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),test_linkController.getAllTestLinkActive);
  TestTypeRouter.get("/get-test-link",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),test_linkController.getAllTestLink);
  TestTypeRouter.post("/test-link-add",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),test_linkController.addTestLink);
  TestTypeRouter.get("/test-link-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),test_linkController.getOneTestLink);
  TestTypeRouter.patch("/test-link-edit",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),test_linkController.updateTestLink);
  TestTypeRouter.put("/test-link-delete",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),test_linkController.deleteTestLink);

  module.exports = TestTypeRouter;