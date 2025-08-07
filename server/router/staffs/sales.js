const express = require('express');
const multer = require('multer');
const path = require('path');
const SalesRouter = express.Router();
const EnumServerDefinitions = require("../../common/enums/enum_server_definitions")
const authorizeStaff = require("../../middlewares/authorize_staff.middlewares");
const authorize = require("../../middlewares/authorize.middlewares");
const SalesController = require('../../controllers/sales.controller');
const academicController = require('../../controllers/academic.controller');
const accountantController = require('../../controllers/accountant.controller');
const student_templateController = require('../../controllers/student_template.controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
});
//quản lý kh
SalesRouter.get("/total-customer", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.findCountCustomer);


SalesRouter.get("/customers", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render('admin/sales/cool/customer_cool');
});
SalesRouter.get("/cools-ajax/:type/:page", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getCustomerCoolSales);

SalesRouter.get("/cool-create", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getStaff);

SalesRouter.post("/cool-create", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.addSales);

SalesRouter.get("/edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getCustomerById);

SalesRouter.post("/cool-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.updateCustomerCool);

SalesRouter.post("/cool-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.deleteCustomerSalesCool);

//search customer
SalesRouter.get("/customer-search/:input_search", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getSearchCustomerSales);

// note kh
SalesRouter.get("/notes/:customerId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render('admin/sales/note/note');
});
SalesRouter.get("/notes-ajax/:customerId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getNoteCustomer);

SalesRouter.post("/note-add/:customerId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.addCustomerNote);

SalesRouter.get("/note-edit/:noteId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getNoteCustomerById);
SalesRouter.post("/note-edit/:customerId/:noteId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.updateCustomerNote);
SalesRouter.patch("/note-edit-customer/:customerId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.updateCustomerSalesInNote);


SalesRouter.get("/notes-date", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render('admin/sales/note/note_date');
});
SalesRouter.get("/notes-date/:date", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getNoteDate);


//quản lý học viên
SalesRouter.get("/students", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render("admin/sales/student/students_sales");
});
SalesRouter.post("/students-create", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.addStudent);

SalesRouter.get("/students-wait", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render("admin/sales/student/student_waiting");
});

SalesRouter.get("/students", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render("admin/sales/student/students_sales");
});
SalesRouter.get("/students-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getStudentAll);
SalesRouter.get("/student-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getStudentById);
SalesRouter.post("/student-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.updateStudent);
SalesRouter.post("/student-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.deleteStudent);
SalesRouter.get("/student-class-detail/:studentId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), SalesController.getDetailClassOfStudent);
SalesRouter.patch("/student-update-staff/:studentId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.updateStaffOfStudent);
SalesRouter.get("/staff-student/:studentId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getStaffIdStudent);

SalesRouter.patch("/student-exist-add-test", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.addTestOfStudentExist);

//học viên chờ
SalesRouter.get("/students-waiting", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render("admin/sales/student/student_waiting");
});
SalesRouter.get("/students-wait-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getStudentWait);
SalesRouter.post("/student-wait-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.updateStudentWait);


//học viên test
SalesRouter.get("/students-test", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render("admin/sales/student/student_test");
});
SalesRouter.get("/students-test-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getStudentTest);
SalesRouter.get("/student-test-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getStudentTestById);
SalesRouter.post("/student-test-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.updateStudentTest);
SalesRouter.post("/student-test-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.deleteStudentTest);
SalesRouter.patch("/student-test-edit-note/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.updateStudentTestNote);


//thông tin giáo viên
SalesRouter.get("/teachers-info", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render("admin/sales/teacher/teacher_info");
});
SalesRouter.get("/teachers-info-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getTeacherInfo);

//phiếu thu
SalesRouter.get("/receipt-collect", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render("admin/sales/collect/receipt_collect");
});
SalesRouter.get("/receipt-collect-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH]), SalesController.getSalesCollect);
SalesRouter.get("/receipt-collect-init", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH]), SalesController.getInitAddCollect);
SalesRouter.get("/receipt-collect-filter", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH]), SalesController.getSourceCollectActive);

SalesRouter.get("/receipt-collect-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH]), SalesController.getSalesCollectById);
SalesRouter.post("/receipt-collect-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH]), SalesController.updateReceiptCollectSales);
SalesRouter.post("/receipt-collect-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH]), SalesController.addReceiptCollectSales);

SalesRouter.get("/receipt-collect-pdf/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH]), SalesController.getPDF);

SalesRouter.patch("/receipt-collect-update/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH]), SalesController.updateReceiptCollectSalesPayMoney);
//thống kê phiếu thu
SalesRouter.get("/collect-statistical-between-to", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render("admin/sales/collect/statistical_between_to");
});
SalesRouter.get("/collect-statistical-between-to/:between/:to/:sourceId/:staffId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]),SalesController.getAllCollectBetweenTo);

SalesRouter.get("/collect-statistical-month-year", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render("admin/sales/collect/statistical_collect");
});
SalesRouter.get("/collect-init",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getAllInitCollect);

SalesRouter.get("/collect-statistical/:month/:year/:sourceId/:staffId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]),SalesController.getAllCollectMonthYear);

SalesRouter.get("/collect-statistical-year", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render("admin/sales/collect/statistical_year");
});
SalesRouter.get("/collect-statistical/:year/:sourceId/:staffId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]),SalesController.getAllCollectYear);
SalesRouter.get("/collect-total-between-to/:between/:to", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]),SalesController.getAllTotalCollectStaff);




//class
SalesRouter.get("/class-list", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render("admin/sales/class/class");
});
SalesRouter.get("/class-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getAllClass);
SalesRouter.get("/class/:classId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render("admin/sales/class/class_student");
});
SalesRouter.get("/class-ajax/:classId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getDetailClass);
SalesRouter.get("/class-init/:classId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.getClassAddInit);
SalesRouter.post("/class-create",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.addStudentToClass);

// student test
SalesRouter.get("/class-detail/:id/:studentListId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render("admin/sales/class/student_test");
});
SalesRouter.get("/class-detail-ajax/:id/:studentListId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]),SalesController.getStudentTestOfClass);

//nhập file import excel
// SalesRouter.post("/import-excel-customer/:page",upload.single('file'),authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), SalesController.importDataExcelCustomerSales);


// student evaluate
SalesRouter.get("/student-evaluate/:studentListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]), (req, res) => {
  res.render("admin/sales/class/student_evaluate");
});

SalesRouter.get("/student-evaluate-ajax/:studentListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]),academicController.getStudentEvaluate);


// thống kê số lượng khách hàng theo từng sales
SalesRouter.get("/statistical-customer",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]),SalesController.findCountCustomerOfSales);

//update template category of student
SalesRouter.patch("/update-student-template",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES]),student_templateController.updateStudentTemplatePrivate);

module.exports = SalesRouter;