const express = require('express');
const multer = require('multer');
const path = require('path');
const accountantController = require('../../controllers/accountant.controller');
const AccountantRouter = express.Router();
const authorize=require('../../middlewares/authorize.middlewares');
const authorizeStaff=require('../../middlewares/authorize_staff.middlewares');
const EnumServerDefinitions=require('../../common/enums/enum_server_definitions');
const procedureController = require('../../controllers/procedure.controller');
const collectController = require('../../controllers/collect.controller');
const cskhController = require('../../controllers/cskh.controller');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
  },
});
  const upload = multer({ storage: storage });

//chi tiêu
AccountantRouter.get("/spends",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
    res.render("admin/accountant/spend/spend");
  });

  AccountantRouter.get("/spends-ajax/:page",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getSpend);
  AccountantRouter.post("/spend-add",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.addSpend);
  AccountantRouter.get("/spend-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getSpendById);
  AccountantRouter.post("/spend-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.updateSpend);
  AccountantRouter.patch("/spend-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.deleteSpend);
  AccountantRouter.patch("/spend-active/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.updateSpendActive);
  AccountantRouter.patch("/spend-refuse/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.updateSpendRefuse);
  
  AccountantRouter.get("/spend-pdf/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getSpendById);

  AccountantRouter.get("/spend-statistical-month-year", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
    res.render("admin/accountant/spend/statistical_month");
  });
  AccountantRouter.get("/spend-init",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getAllInitSpend);

  AccountantRouter.get("/spend-statistical/:month/:year/:supplierId/:sourceId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),accountantController.getAllSpendMonthYear);
  
  AccountantRouter.get("/spend-statistical-year", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
    res.render("admin/accountant/spend/statistical_year");
  });
  AccountantRouter.get("/spend-statistical/:year/:supplierId/:sourceId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),accountantController.getAllSpendYear);
  
  AccountantRouter.get("/spend-statistical-between-to", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
    res.render("admin/accountant/spend/statistical_between_to");
  });
  AccountantRouter.get("/spend-statistical-between-to/:between/:to/:supplierId/:sourceId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),accountantController.getAllSpendBetweenTo);
  
// supplier
  AccountantRouter.get("/suppliers",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
    res.render("admin/accountant/supplier/supplier");
  });
  AccountantRouter.get("/supplier-ajax",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getAllSupplier);
  AccountantRouter.post("/supplier-add",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.addSupplier);
  AccountantRouter.get("/supplier-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getOneDetailSupplier);
  AccountantRouter.post("/supplier-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.updateSupplier);
  AccountantRouter.patch("/supplier-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.deleteSupplier);
  AccountantRouter.patch("/supplier-agree/:supplierId",authorize([EnumServerDefinitions.ROLE.ADMIN]), accountantController.SupplierAgree);
  AccountantRouter.patch("/supplier-refuse/:supplierId",authorize([EnumServerDefinitions.ROLE.ADMIN]), accountantController.SupplierRefuse);
  

  //doanh thu
  AccountantRouter.get("/collects", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
    res.render("admin/accountant/collect/collect");
  });
  AccountantRouter.get("/collects-ajax/:page", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),accountantController.getCollect);
  AccountantRouter.patch("/collect-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),accountantController.deleteCollect);
  AccountantRouter.get("/collect-pdf/:id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT,]),accountantController.getCollectById);
  AccountantRouter.get("/collect-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),accountantController.getCollectById);
  AccountantRouter.patch("/collect-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),accountantController.updateNoteCollect);
  
  AccountantRouter.get("/collect-statistical-month-year", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
    res.render("admin/accountant/collect/statistical_collect");
  });
  AccountantRouter.get("/collect-init",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getAllInitCollect);

  AccountantRouter.get("/collect-statistical/:month/:year/:sourceId/:staffId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),accountantController.getAllCollectMonthYear);
  
  AccountantRouter.get("/collect-statistical-year", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
    res.render("admin/accountant/collect/statistical_year");
  });
  AccountantRouter.get("/collect-statistical/:year/:sourceId/:staffId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),accountantController.getAllCollectYear);
  
  AccountantRouter.patch("/collect-agree/:collectId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),accountantController.CollectAgree);
  AccountantRouter.patch("/collect-refuse/:collectId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),accountantController.CollectRefuse);
  AccountantRouter.patch("/collect-waiting-approval/:collectId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),accountantController.CollectWaitingApproval);
  

  AccountantRouter.get("/collect-statistical-between-to", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
    res.render("admin/accountant/collect/statistical_between_to");
  });
  AccountantRouter.get("/collect-statistical-between-to/:between/:to/:sourceId/:staffId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),accountantController.getAllCollectBetweenTo);
  AccountantRouter.get("/collect-total-between-to/:between/:to", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),accountantController.getAllTotalCollectStaff);
  

  //học viên
  AccountantRouter.get("/students", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
    res.render("admin/accountant/student/students_accountant");
  });
  AccountantRouter.get("/students-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getAllStudent);
  
  AccountantRouter.get("/student-list", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
    res.render("admin/accountant/student/student_list");
  });
  AccountantRouter.get("/students-list/:startDate/:endDate", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getAllStudentList);

  AccountantRouter.get("/staff-init", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getInitStaffSales);


//quy đỏi
AccountantRouter.patch("/student-exchange-time/:classId/:studentListId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.updateTimeExchangeStudentList);
  

  //lop
  AccountantRouter.get("/classroom", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
    res.render("admin/accountant/class/class_accountant");
  });
  AccountantRouter.get("/classroom-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),accountantController.getAllClass);
  
  AccountantRouter.get("/classroom-detail-student/:classId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
    res.render("admin/accountant/class/students_class_list");
  });
  AccountantRouter.get("/classroom-detail-student-ajax/:classId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getAllStudentOfClass);
  
  AccountantRouter.get("/classroom-detail-student/:classId/:studentListId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
    res.render("admin/accountant/class/student_detail");
  });
  AccountantRouter.get("/classroom-detail-student-ajax/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getOneDetailStudentOfClass);

  AccountantRouter.post("/classroom-update-student-ajax/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.updateStudentListAdditional);

  AccountantRouter.post("/class-transfer-student-ajax/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.updateTransferStudentList);
  
  AccountantRouter.patch("/class-update-detail-student/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.UpdateStudentListClass);
  
  AccountantRouter.get("/class-course" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getCourseOfHoursSession);
  AccountantRouter.patch("/class-update-course/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.updateCourseTuition);
  
  // duyệt học viên vào lớp
  AccountantRouter.patch("/class-student-agree/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.StudentListAgree);
  AccountantRouter.patch("/class-student-refuse/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.StudentListRefuse);


// tổng điểm danh lớp
  AccountantRouter.get("/class-attendance", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
    res.render("admin/accountant/class/class_attendance_date");
  });
  // tổng điểm danh
  AccountantRouter.get("/class-attendance/:start/:end" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getTotalAttendance);
// điểm danh theo ngày
AccountantRouter.get("/class-attendance-date/:date" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getAllClassAttendanceDate);

  // điểm danh thêm học viên 
  // AccountantRouter.get("/class-teacher/:classId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getAllTeacherOfClass);
  AccountantRouter.post("/class-add-attendance/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.addAttendanceStudent);

  //chỉnh sửa điểm danh
  AccountantRouter.get("/class-attendance-student/:studentAttendanceId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getOneStudentAttendance);
  AccountantRouter.patch("/class-update-attendance/:studentListId/:studentAttendanceId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.updateStudentAttendanceDate);
  AccountantRouter.patch("/class-delete-attendance/:studentListId/:studentAttendanceId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.deleteAttendanceStudent);

  // thêm khóa học
  AccountantRouter.get("/class-add-course/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getCourseAdd);
  AccountantRouter.post("/class-add-course/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.addCourseTuition);

// nguồn chi

AccountantRouter.get("/source-spend",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
  res.render("admin/accountant/source_spend/source_spend");
});
AccountantRouter.get("/source-spend-ajax",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getAllSourceSpend);
AccountantRouter.post("/source-spend-add",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.addSourceSpend);
AccountantRouter.get("/source-spend-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.getOneDetailSourceSpend);
AccountantRouter.post("/source-spend-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.updateSourceSpend);
AccountantRouter.patch("/source-spend-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.deleteSourceSpend);
AccountantRouter.patch("/source-spend-agree/:id",authorize([EnumServerDefinitions.ROLE.ADMIN]), accountantController.SourceSpendAgree);
AccountantRouter.patch("/source-spend-refuse/:id",authorize([EnumServerDefinitions.ROLE.ADMIN]), accountantController.SourceSpendRefuse);

// nguồn thu

AccountantRouter.get("/source-collect",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),(req,res)=>{
  res.render('admin/source_collect/source_collect');
});

AccountantRouter.get("/source-collects-ajax",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),collectController.getSourceCollect);


AccountantRouter.post("/source-collect-create",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),collectController.addSourceCollectController);
  
AccountantRouter.patch("/source-collect-agree/:sourceId",authorize([EnumServerDefinitions.ROLE.ADMIN]),collectController.SourceCollectAgree);
AccountantRouter.patch("/source-collect-refuse/:sourceId",authorize([EnumServerDefinitions.ROLE.ADMIN]),collectController.SourceCollectRefuse);
  

AccountantRouter.post("/source-collect-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),collectController.deleteSourceCollect);


AccountantRouter.get("/source-collect-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),collectController.getSourceCollectOne);

AccountantRouter.post("/source-collect-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),collectController.updateSourceCollect);

// danh sách học viên cần được duyệt vào lớp
AccountantRouter.get("/student-list-accept",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
  res.render("admin/accountant/class/class_student_accept");
});
AccountantRouter.get("/student-list-accept-ajax",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.findAllStudentListAccept);

  // duyệt học viên vào lớp trong danh sách tổng
  AccountantRouter.patch("/student-list-agree/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.StudentListAcceptAgree);
  AccountantRouter.patch("/student-list-refuse/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.StudentListAcceptRefuse);
// update tuition
AccountantRouter.patch("/class-update-type-tuition/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.updateTypeTuition);


// thống kê học sinh tăng giảm nghỉ
AccountantRouter.get("/student-statistics/:between/:to" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.statisticsStudent);

// danh sách hoc viên mới
AccountantRouter.get("/student-statistics-new/:between/:to" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.ListStudentNewStatistics);
// danh sách hoc viên off
AccountantRouter.get("/student-statistics-off/:between/:to" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.ListStudentOffStatistics);
// danh sách hoc viên bảo lưu
AccountantRouter.get("/student-statistics-maintain/:between/:to" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), accountantController.ListStudentMaintainStatistics);





// quy trình bộ phận kế toán
AccountantRouter.get("/procedures",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), (req, res) => {
  res.render("admin/accountant/procedure/procedure");
});
AccountantRouter.get("/procedure-list/:department",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),procedureController.getAllProcedure);
AccountantRouter.post("/procedure-add/:department",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),procedureController.addProcedure);
AccountantRouter.patch("/procedure-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),procedureController.deleteProcedure);

// các bước quy trình bộ phận  kế toán

AccountantRouter.get("/step-procedure/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT,EnumServerDefinitions.DEPARTMENT.QC]),procedureController.getAllStepProcedure);
AccountantRouter.get("/step-procedure-detail/:stepId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),procedureController.getOneStepProcedure);

AccountantRouter.patch("/step-procedure-edit/:stepId",upload.single('file'),authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),procedureController.updateStepProcedure);
AccountantRouter.patch("/step-procedure-approval/:stepId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]),procedureController.ApprovalManage);

  module.exports = AccountantRouter;