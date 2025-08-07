const express = require('express');
const QCRouter = express.Router();
const EnumServerDefinitions = require("../../common/enums/enum_server_definitions")
const authorizeStaff = require("../../middlewares/authorize_staff.middlewares");
const authorize = require("../../middlewares/authorize.middlewares");
const planningController = require('../../controllers/planning.controller');
const academicController = require('../../controllers/academic.controller');
const qcController = require('../../controllers/qc.controller');
const cskhController = require('../../controllers/cskh.controller');

//danh sách giáo viên
QCRouter.get("/teachers", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/qc/teacher/teacher_class");
});
QCRouter.get("/teachers-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC,EnumServerDefinitions.DEPARTMENT.CSKH]), planningController.getAllAccountInfo);

//lịch dạy
QCRouter.get("/calendar-teach", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
    res.render("admin/qc/calendar_teach/calendar_teach");
});
//lịch test
QCRouter.get("/calendar-test", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/qc/calendar_test/calendar_test");
});
QCRouter.get("/calendar-test-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), planningController.getCalendartest);

    //lớp học 

  //quản lý lớp
  QCRouter.get("/classroom", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/qc/class/class_qc");
  });
  QCRouter.get("/class-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]),qcController.getAllClass);
  
  QCRouter.get("/class-detail/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/qc/class/class_detail");
  });
  QCRouter.get("/class-detail-ajax/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]),academicController.getClassDetail);
  QCRouter.patch("/class-qc/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]),qcController.updateQcClass);
  QCRouter.get("/class-detail-student/:classId/:studentListId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/qc/class/student_detail");
  });
  QCRouter.get("/class-detail-student-ajax/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), planningController.getOneDetailStudentOfClass);
  
  //học viên kết quả test
  QCRouter.get("/class-detail/:id/:studentListId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/qc/class/student_test");
  });
  QCRouter.get("/class-detail-ajax/:id/:studentListId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]),academicController.getStudentTest);
  QCRouter.get("/class-detail/:id/:studentListId/edit/:testId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]),academicController.getOneStudentTestById);
  
   //đánh giá lớp
   QCRouter.get("/class-evaluate/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/qc/class/class_evaluate");
  });
  
  QCRouter.get("/class-evaluate-ajax/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]),academicController.getClassEvaluate);
  

  // Đánh giá học viên
  QCRouter.get("/student-evaluate/:studentListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/qc/class/student_evaluate");
  });
  
  QCRouter.get("/student-evaluate-ajax/:studentListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]),academicController.getStudentEvaluate);
  

  //học viên kết quả test
  QCRouter.get("/class-detail/:id/:studentListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/qc/class/student_test");
  });
  QCRouter.get("/class-detail-ajax/:id/:studentListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]),academicController.getStudentTest);


  // tìm nhật ký giảng dạy
  QCRouter.get("/class-teaching-diary",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/qc/class/class_teaching_diary");
  });
  QCRouter.get("/class-teaching-diary/:between/:to/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]),qcController.findTeachingDiary);


  //tổng giờ trong lịch dự kiến

  QCRouter.get("/total-count-teach", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
  res.render("admin/qc/calendar_teach/calendar_total_count");
});

QCRouter.get("/total-count-teach/:month/:year/:type_programme" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), qcController.findTotalCountCalendar);



//tổng điểm danh theo nhiều ngày
QCRouter.get("/class-attendance", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
  res.render("admin/qc/class/class_attendance_total");
});
QCRouter.get("/class-all" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), cskhController.getAllClassActive);

QCRouter.get("/class-attendance/:classId/:type/:startDate/:endDate" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), cskhController.getTotalAttendanceClass);
QCRouter.get("/class-attendance-excer/:startDate/:endDate/:type" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), cskhController.getTotalAttendanceExcer);


//tổng điểm danh theo một ngày
QCRouter.get("/class-attendance-date", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
  res.render("admin/qc/class/class_attendance_date");
});

QCRouter.get("/class-attendance-date/:date/:type" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), cskhController.getAllClassAttendanceDate);

// quy trình tất cả phòng ban
QCRouter.get("/procedures", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
  res.render("admin/qc/procedure/procedure");
});

QCRouter.get("/procedures/:department" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.QC]), qcController.findAllStepProcedure);


module.exports = QCRouter;