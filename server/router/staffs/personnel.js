const express = require('express');
const multer = require('multer');
const path = require('path');
const PersonnelRouter = express.Router();
const TeacherController = require('../../controllers/teacher.controller');
const StaffController = require('../../controllers/staff.controller');
const authorizeStaff = require('../../middlewares/authorize_staff.middlewares');
const EnumServerDefinitions = require("../../common/enums/enum_server_definitions")
const authorize = require('../../middlewares/authorize.middlewares');
const personnelController = require('../../controllers/personnel.controller');
const server_response = require('../../common/utils/server_response');
const SystemConst = require('../../common/consts/system_const');
const { authPlugins } = require('mysql2');
const authController = require('../../controllers/auth.controller');
const planningController = require('../../controllers/planning.controller');
const staff_attendanceController = require('../../controllers/staff_attendance.controller');



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

//quản lý nhân viên
PersonnelRouter.get("/staffs", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render('admin/personnel/staff/staff');
});
PersonnelRouter.get("/staffs-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (StaffController.getStaff));

PersonnelRouter.post("/staff-create", upload.array('files'), StaffController.addStaff);

PersonnelRouter.get("/staff-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), StaffController.getStaffById);

PersonnelRouter.post("/staff-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), StaffController.updateStaff);

PersonnelRouter.post("/staff-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), StaffController.deleteStaff);

PersonnelRouter.get("/staff-departments/:staffId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render('admin/personnel/staff/profile_staff');
});
PersonnelRouter.get("/staff-departments-ajax/:staffId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (StaffController.getDepartmentStaff));
PersonnelRouter.post("/staff-department-add/:staffId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (StaffController.addDepartmentStaff));
PersonnelRouter.patch("/staff-department-delete/:staffId/:departmentId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (StaffController.deleteDepartmentStaff));

PersonnelRouter.patch("/staff-department-agree/:staffId/:departmentId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (StaffController.updateDepartmentStaffConfirmAgree));
PersonnelRouter.patch("/staff-department-refuse/:staffId/:departmentId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (StaffController.updateDepartmentStaffConfirmRefuse));


PersonnelRouter.patch("/staff-agree/:staffId", StaffController.StaffAgree);
PersonnelRouter.patch("/staff-refuse/:staffId", StaffController.StaffRefuse);
PersonnelRouter.patch("/delete-file-staff/:staffId/:profileId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.deleteProfileStaff);

PersonnelRouter.post("/staff-profile/:staffId", upload.array('files'), StaffController.addProfileStaff);


//quản lý giáo viên
PersonnelRouter.get("/teachers", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render('admin/personnel/teacher/teacher');
});

PersonnelRouter.get("/teachers-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), TeacherController.getTeacher);

PersonnelRouter.get("/teacher-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), TeacherController.getTeacherById);

PersonnelRouter.post("/teacher-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), TeacherController.updateTeacher);
PersonnelRouter.post("/teacher-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), TeacherController.deleteTeacher);

PersonnelRouter.post("/teacher-create", upload.array('files'), TeacherController.addTeacher);

PersonnelRouter.patch("/teacher-agree/:teacherId", TeacherController.TeacherAgree);
PersonnelRouter.patch("/teacher-refuse/:teacherId", TeacherController.TeacherRefuse);


PersonnelRouter.get("/teacher-profile/:teacherId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render('admin/personnel/teacher/profile_teacher');
});

PersonnelRouter.get("/teacher-profile-ajax/:teacherId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), TeacherController.getTeacherProfile);
PersonnelRouter.post("/teacher-profile/:teacherId", upload.array('files'), TeacherController.addProfileTeacher);

PersonnelRouter.patch("/delete-file-teacher/:teacherId/:profileId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.deleteProfileTeacher);


//tuyển dụng
PersonnelRouter.get("/recruitments", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/personnel/recruitment/recruitment");
});
PersonnelRouter.get("/recruitment-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.getAllRecruitment);
PersonnelRouter.post("/recruitment-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.addRecruitment);
PersonnelRouter.get("/recruitment-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.getOneRecruitmentById);
PersonnelRouter.post("/recruitment-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.updateRecruitment);
PersonnelRouter.patch("/recruitment-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.deleteRecruitment);

// ứng viên

PersonnelRouter.get("/applies", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/personnel/apply/apply");
});
PersonnelRouter.get("/applies-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.getAllApply);
PersonnelRouter.post("/apply-add", upload.single('file'), authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.addApply);
PersonnelRouter.get("/apply-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.getOneApplyById);
PersonnelRouter.post("/apply-edit/:id", upload.single('file'), authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.updateApplyId);
PersonnelRouter.patch("/apply-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.deleteApply);
PersonnelRouter.patch("/apply-update-recruitment/:applyId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.updateRecruitmentApply);



// nguồn ứng tuyển
PersonnelRouter.get("/source-apply", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/personnel/source_apply/source_apply");
});
PersonnelRouter.get("/source-apply-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.getAllSourceApply);
PersonnelRouter.post("/source-apply-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.addSourceApply);
PersonnelRouter.get("/source-apply-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.getOneSourceApplyById);
PersonnelRouter.post("/source-apply-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.updateSourceApplyId);
PersonnelRouter.patch("/source-apply-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.deleteSourceApply);

// đơn xin nghỉ
PersonnelRouter.get("/application-leave", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), (req, res) => {
  res.render("admin/personnel/application_leave/application_leave");
});
PersonnelRouter.get("/application-leave-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), personnelController.getAllLeave);
PersonnelRouter.post("/application-leave-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), personnelController.addLeave);
PersonnelRouter.get("/application-leave-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), personnelController.getOneLeaveById);
PersonnelRouter.post("/application-leave-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), personnelController.updateLeaveId);
PersonnelRouter.patch("/application-leave-update-type/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), personnelController.updateTypeLeaveId);



PersonnelRouter.patch("/application-leave-note/:id", authorize([EnumServerDefinitions.ROLE.ADMIN]), personnelController.updateNoteLeaveId);
PersonnelRouter.patch("/application-leave-agree/:id", authorize([EnumServerDefinitions.ROLE.ADMIN]), personnelController.updateActiveLeaveId);
PersonnelRouter.patch("/application-leave-refuse/:id", authorize([EnumServerDefinitions.ROLE.ADMIN]), personnelController.updateRefuseLeaveId);

//lấy lại mật khẩu
PersonnelRouter.patch("/retrieval-staff/:id", authorize([EnumServerDefinitions.ROLE.ADMIN]), personnelController.retrievalPasswordStaff);
PersonnelRouter.patch("/retrieval-teacher/:id", authorize([EnumServerDefinitions.ROLE.ADMIN]), personnelController.retrievalPasswordTeacher);

//lịch phân công dạy
PersonnelRouter.get("/calendar-teach", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/personnel/calendar_teach/calendar_teach");
});
PersonnelRouter.get("/get-calendar-teach/:month/:year/:classId/:teacherId/:programme/:typeStudy/:typeProgramme", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), personnelController.getCalendarTeach);

//tổng giờ trong lịch dự kiến

PersonnelRouter.get("/total-time-teach", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/personnel/calendar_teach/calendar_total");
});

PersonnelRouter.get("/total-time-teach/:startDate/:endDate", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.getTotalCalendarActualHours);

// lịch dạy theo ngàyy
PersonnelRouter.get("/calendar-date", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/personnel/calendar_teach/calendar_date");
});
PersonnelRouter.get("/calendar-date/:date/:accountId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.getCalendarTeachDate);

PersonnelRouter.get("/get-calendar-date/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), personnelController.getCalendarByIdActualHours);
PersonnelRouter.patch("/calendar-date-update/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), personnelController.updateCalendarActualHours);


// tổng lịch theo lớp
PersonnelRouter.get("/total-time-teach-class", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/personnel/calendar_teach/calendar_total_class");
});

PersonnelRouter.get("/total-time-teach-class/:startDate/:endDate", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.getTotalTimeTeachOfClass);


// danh sách chưa có chấm giờ thực tế
PersonnelRouter.get("/list-no-actual-hours", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/personnel/calendar_teach/calendar_no_actual_hours");
});

PersonnelRouter.get("/get-list-no-actual-hours/:accountId/:startDate/:endDate", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.getAllCalendarNoActualHours);


// máy chấm công
PersonnelRouter.get("/attendances", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/personnel/attendance/attendance");
});

PersonnelRouter.get("/attendance-ronald-jack", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), staff_attendanceController.getAttendance);

// thống kê lịch theo từng người 
PersonnelRouter.get("/calendar-teacher-teach", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/personnel/calendar_teach/calendar_detail");
});

PersonnelRouter.get("/calendar-teacher-teach/:accountId/:startDate/:endDate", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), personnelController.getTotalTimeTeachOfTeacher);

module.exports = PersonnelRouter;