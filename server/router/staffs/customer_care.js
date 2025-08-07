const express = require('express');
const multer = require('multer');
const path = require('path');

const CustomerCareRouter = express.Router();
const EnumServerDefinitions = require("../../common/enums/enum_server_definitions")
const authorizeStaff = require("../../middlewares/authorize_staff.middlewares");
const authorize = require("../../middlewares/authorize.middlewares");
const cskhController = require('../../controllers/cskh.controller');
const academicController = require('../../controllers/academic.controller');
const qcController = require('../../controllers/qc.controller');
const class_private_templateController = require('../../controllers/class_private_template.controller');
const adminController = require('../../controllers/admin.controller');
const studentController = require('../../controllers/student.controller');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
  },
});
  const upload = multer({ storage: storage });
//học viên hiện tại
CustomerCareRouter.get("/students-current",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
    res.render("admin/customer_care/student/students_current");
  });
  CustomerCareRouter.get("/students-current-ajax",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getStudentAll);
  CustomerCareRouter.get("/student-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getStudentById);
  CustomerCareRouter.post("/student-add", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.addStudentCurrent);
 
  CustomerCareRouter.post("/student-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.updateStudent);
  CustomerCareRouter.patch("/student-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.deleteStudent);
  

 //học viên bảo lưu và nghỉ 
  CustomerCareRouter.get("/students-frozen", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
    res.render("admin/customer_care/student/students_frozen");
  });
  CustomerCareRouter.get("/students-frozen-ajax",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getStudentFrozen);
  CustomerCareRouter.post("/student-frozen-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.deleteStudentFrozen);
  CustomerCareRouter.post("/student-frozen-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.updateStudentFrozen);

  
  CustomerCareRouter.get("/student-profile/:studentId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
    res.render("admin/customer_care/student/student_profile");
  });
  CustomerCareRouter.get("/student-profile-ajax/:studentId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getAllProfileStudent);
  
  //quản lý lớp
  CustomerCareRouter.get("/class",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
    res.render("admin/customer_care/class/class_list");
  });
  CustomerCareRouter.get("/class-ajax",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getClassCSKH);
  CustomerCareRouter.patch("/class-update-study/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.updateStudyClass);
  
  CustomerCareRouter.get("/class-detail/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
    res.render("admin/customer_care/class/class_detail");
  });
  CustomerCareRouter.get("/class-detail-ajax/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getClassDetail);
  CustomerCareRouter.get("/class-init/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getClassAddInit);
  CustomerCareRouter.post("/class-create",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.addStudentToClass);
  CustomerCareRouter.patch("/class-delete-student/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.deleteStudentList);
  CustomerCareRouter.patch("/class-destroy-student/:studentListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.destroyStudentList);
  

  CustomerCareRouter.get("/class-detail-student/:classId/:studentListId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
    res.render("admin/customer_care/class/class_detail_student");
  });
  CustomerCareRouter.get("/class-detail-student-ajax/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getOneDetailStudentOfClass);
  CustomerCareRouter.post("/class-detail-student-add-course/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.ACCOUNTANT]), cskhController.addTuitionOfStudent);

  // CustomerCareRouter.get("/class-exchange-course/:courseId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getCourseExchange);
  
  // CustomerCareRouter.post("/class-exchange-course/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.updateCourseExchangeStudentList);

  CustomerCareRouter.get("/class-update/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getClassNoStudentList);
  CustomerCareRouter.patch("/class-update/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.UpdateStudentListClass);


  CustomerCareRouter.get("/class-cskh-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]),academicController.getClassDetailLink);
  CustomerCareRouter.patch("/class-cskh-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]),cskhController.updateClassLink);
  
  //lên lớp học viên
  CustomerCareRouter.patch("/class-promoted/:classId/:studentListId" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.PromotedStudentListClass);
   //đánh giá lớp
   CustomerCareRouter.get("/class-evaluate/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
    res.render("admin/customer_care/class/class_evaluate");
  });
  
  CustomerCareRouter.get("/class-evaluate-ajax/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]),academicController.getClassEvaluate);
  
  //điểm danh lớp online
  CustomerCareRouter.get("/class-attendance-online",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/customer_care/class/class_attendance_online");
});
CustomerCareRouter.get("/class-attendance-online-ajax",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.PERSONNEL]),cskhController.getClassOnlineAttendance);
CustomerCareRouter.post("/class-attendance-online-add",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.PERSONNEL]),cskhController.addAttendanceClassOnline);
CustomerCareRouter.get("/class-online-ajax/:date",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.PERSONNEL]),cskhController.getClassOnline);
CustomerCareRouter.get("/class-online-attendance-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.PERSONNEL]),cskhController.getClassOnlineAttendanceById);
CustomerCareRouter.post("/class-online-attendance-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.PERSONNEL]),cskhController.updateAttendanceClassOnline);
CustomerCareRouter.patch("/class-online-attendance-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.PERSONNEL]),cskhController.deleteAttendanceClassOnline);
CustomerCareRouter.patch("/class-online-attendance-note/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.PERSONNEL]),cskhController.updateNoteAttendanceClassOnline);

//lập phiếu thu
//phiếu thu
CustomerCareRouter.get("/receipt-collect", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
  res.render("admin/customer_care/receipt_collect/receipt_collect");
});
CustomerCareRouter.get("/receipt-collect-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getCSKHCollect);
CustomerCareRouter.get("/receipt-collect-init", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getInitCollectCS);

CustomerCareRouter.get("/receipt-collect-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getCSKHCollectById);
CustomerCareRouter.post("/receipt-collect-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.updateReceiptCollectCSKH);
CustomerCareRouter.post("/receipt-collect-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.addReceiptCollectCSKH);

CustomerCareRouter.get("/receipt-collect-pdf/:id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH,]),cskhController.getPDF);

// thống kê
CustomerCareRouter.get("/statistical-collect", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
  res.render("admin/customer_care/receipt_collect/statistical_collect");
});
//teacher
CustomerCareRouter.get("/evaluate-teacher", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
  res.render("admin/customer_care/evaluate_teacher/teacher");
});
CustomerCareRouter.get("/evaluate-teacher-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getAllTeacherActive);

CustomerCareRouter.get("/evaluate-list-teacher/:teacherId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
  res.render("admin/customer_care/evaluate_teacher/evaluate_teacher");
});
CustomerCareRouter.get("/evaluate-list-teacher-ajax/:teacherId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getAllTeacherEvaluate);
CustomerCareRouter.post("/evaluate-teacher-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.addEvaluateTeacher);
CustomerCareRouter.get("/evaluate-teacher-edit/:teacherId/:evaluateId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getOneTeacherEvaluate);
CustomerCareRouter.post("/evaluate-teacher-edit/:teacherId/:evaluateId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.updateEvaluateTeacher);
CustomerCareRouter.patch("/evaluate-teacher-delete/:teacherId/:evaluateId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.deleteTeacherEvaluate);

CustomerCareRouter.get("/evaluate-teacher-month-year/:teacherId/:month/:year", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getTeacherEvaluateMonthYear);
// xóa trong tính tổng tháng
CustomerCareRouter.patch("/evaluate-teacher-delete-month/:teacherId/:evaluateId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.deleteTeacherEvaluateMonth);

//tổng điểm danh theo nhiều ngày
CustomerCareRouter.get("/class-attendance", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
  res.render("admin/customer_care/class/class_attendance_total");
});
CustomerCareRouter.get("/class-all" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getAllClassActive);

CustomerCareRouter.get("/class-attendance/:classId/:type/:startDate/:endDate" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getTotalAttendanceClass);
CustomerCareRouter.get("/class-attendance-excer/:startDate/:endDate/:type" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getTotalAttendanceExcer);


//tổng điểm danh theo một ngày
CustomerCareRouter.get("/class-attendance-date", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
  res.render("admin/customer_care/class/class_attendance_date");
});

CustomerCareRouter.get("/class-attendance-date/:date/:type" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.getAllClassAttendanceDate);
CustomerCareRouter.patch("/class-attendance-date/:id" ,authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), cskhController.destroyAttendanceStudent);


// tìm teaching diary
  // tìm nhật ký giảng dạy
  CustomerCareRouter.get("/class-teaching-diary",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
    res.render("admin/customer_care/class/class_teaching_diary");
  });
  CustomerCareRouter.get("/class-teaching-diary/:between/:to/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,,EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]),qcController.findTeachingDiary);


  //lấy danh sách hall of fame
  CustomerCareRouter.get("/class-hall-of-fame",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]),cskhController.getStudentTestScore);
  CustomerCareRouter.patch("/hall-of-fame-update/:testId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]),cskhController.updateConfirmCsHallOfFame);


  // lịch phân công dạy
  CustomerCareRouter.get("/calendar-teach",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
    res.render("admin/customer_care/calendar_teach/calendar_teach");
  });


  // điểm danh lớp học
  CustomerCareRouter.get("/class-attendance/:classId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
    res.render("admin/customer_care/class/class_attendance");
  });

  // tổng điểm quá trình
  CustomerCareRouter.get("/class-progress",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
    res.render("admin/customer_care/class/class_progress_total");
  });

  CustomerCareRouter.get("/class-progress-total/:classId", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),cskhController.getAllClassProgressTotalWithTest);


    // quy trình học vien lớp group cho CS
  CustomerCareRouter.get("/procedures",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH]), (req, res) => {
      res.render("admin/customer_care/procedure/procedure");
    });
  CustomerCareRouter.get("/procedures-students", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),class_private_templateController.findAllStudentOfClassGroup);
  CustomerCareRouter.get("/procedure-student-template/:id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),class_private_templateController.findTemplatePublicOfStudent);
  CustomerCareRouter.get("/procedure-student-template-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),class_private_templateController.findOneTemplatePublicOfStudentById);
  CustomerCareRouter.patch("/procedure-student-template-reset", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),class_private_templateController.resetTemplatePublicStudent);
  CustomerCareRouter.patch("/procedure-student-template-edit/:id",upload.single('file'), authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),class_private_templateController.updateTemplatePublicStudent);
  //lấy lịch sử quy trình
  CustomerCareRouter.get("/procedure-history/:id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),class_private_templateController.findAllTemplatePublicHistory);

  CustomerCareRouter.patch("/procedure-template-edit-date/:id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),class_private_templateController.updateDateTemplatePublic);
  
  
  CustomerCareRouter.get("/procedure-reset-all", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),class_private_templateController.getAllAddStudentListTemplatePublic);


  // ghi chú note off student
  CustomerCareRouter.patch("/student-note-off-close", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),cskhController.updateStudentListNoteOffCS);
  CustomerCareRouter.patch("/student-note-off-edit-note", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),cskhController.updateStudentListNoteOffCSNoActive);
  CustomerCareRouter.get("/student-note-off/:id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),cskhController.getOneNoteStudentOff);



  // khởi tạo tài khoản student
  CustomerCareRouter.post("/create-account-student/:student_id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),studentController.createAccountStudent);
  CustomerCareRouter.patch("/change-password-student/:student_id", authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),studentController.updatePasswordStudent);
  CustomerCareRouter.get("/auto-create-account-student",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),studentController.autoCreateAccountStudent);


  // điểm danh cho CSKH
  CustomerCareRouter.post("/class-attendance-add/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),cskhController.addStudentAttendanceClass);

  
  CustomerCareRouter.post("/class-attendance-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),cskhController.updateAttendanceStudentClass);
  
  
  



  module.exports = CustomerCareRouter;