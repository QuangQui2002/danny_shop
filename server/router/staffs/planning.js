const express = require('express');
const multer = require('multer');
const path = require('path');
const PlanningRouter = express.Router();
const EnumServerDefinitions = require("../../common/enums/enum_server_definitions")
const authorizeStaff = require("../../middlewares/authorize_staff.middlewares");
const authorize = require("../../middlewares/authorize.middlewares");
const planningController = require('../../controllers/planning.controller');
const academicController = require('../../controllers/academic.controller');
const procedureController = require('../../controllers/procedure.controller');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

//danh sách giáo viên
PlanningRouter.get("/teachers", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), (req, res) => {
  res.render("admin/planning/teacher/teachers_list");
});
PlanningRouter.get("/teachers-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING,EnumServerDefinitions.DEPARTMENT.PLANNING]), planningController.getAllAccountInfo);
PlanningRouter.get("/teacher-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), planningController.getAllTeacherInfoById);
PlanningRouter.patch("/teacher-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), planningController.updateTimeTeacherTeach);


//lịch dạy
PlanningRouter.get("/calendar-teach", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/planning/calendar_teach/calendar_teach");
});
PlanningRouter.get("/calendar-teach-init", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PERSONNEL, EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]), planningController.getInitAddCalendarTeach);

PlanningRouter.get("/calendar-teach-ajax/:month/:year/:classId/:accountId/:programme/:typeStudy/:typeProgramme", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.getCalendarTeach);
PlanningRouter.post("/calendar-teach-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.addCalendarTeach);
PlanningRouter.post("/calendar-teach-delete", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.deleteCalendarTeach);
PlanningRouter.post("/calendar-teach-edit", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.updateCalendarTeach);
PlanningRouter.patch("/calendar-teach-delete-status", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.deleteCalendarStatus);
PlanningRouter.patch("/calendar-teach-gv-refuse", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.acceptTeacherCancelCalendarTeach);
PlanningRouter.patch("/calendar-teach-date/:date", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.deleteCalendarTeachDate);

PlanningRouter.patch("/calendar-teach-class/:classId/:dateStart/:dateEnd", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.deleteCalendarClassroom);
PlanningRouter.get("/calendar-teach-init-class", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.findClassActiveDeleteTeach);


PlanningRouter.post("/calendar-teach-update-note", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.updateNoteCalendarTeach);


// tổng lịch theo từng giáo viên
PlanningRouter.get("/calendar-teacher-teach", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/planning/calendar_teach/calendar_teacher_total");
});
PlanningRouter.get("/calendar-teacher-teach/:teacherId/:startDate/:endDate", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.getTotalTimeTeachOfTeacher);

//tổng giờ trong lịch dự kiến

PlanningRouter.get("/total-time-teach", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/planning/calendar_teach/total_time_teach");
});

PlanningRouter.get("/total-time-teach/:startDate/:endDate", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.getTotalTimeTeach);

// danh sách lịch theo ngày
PlanningRouter.get("/calendar-date", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/planning/calendar_teach/calendar_date");
});
PlanningRouter.get("/calendar-date/:date/:accountId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.getAllCalendarDate);
PlanningRouter.get("/calendar-date-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.getOneCalendarDate);

//teacher time
PlanningRouter.get("/teacher-time", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/planning/teacher/teacher_time");
});
PlanningRouter.get("/teacher-time-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.getTeacherTime);
PlanningRouter.get("/teacher-time-init", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.getInitTeacherTime);

PlanningRouter.get("/teacher-time-total/:month/:year", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.getTotalTeacherTime);
PlanningRouter.get("/teacher-time-edit/:teacherTimeId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.getTeacherTimeById);
PlanningRouter.post("/teacher-time-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.addTeacherTime);
PlanningRouter.patch("/teacher-time-edit/:teacherTimeId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.updateTeacherTime);
PlanningRouter.patch("/teacher-time-delete/:teacherTimeId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.deleteTeacherTime);
//lịch teacher time theo ngày 
PlanningRouter.get("/teacher-time-date", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/planning/teacher/teacher_time_date");
});

PlanningRouter.get("/teacher-time-date/:date", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.getTeacherTimeByDate);
PlanningRouter.patch("/teacher-time-date-edit/:teacherTimeId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.updateTeacherTimeByDate);
PlanningRouter.patch("/teacher-time-date-delete/:teacherTimeId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.deleteTeacherTimeByDate);

//lịch teacher time theo khoảng thời gian
PlanningRouter.get("/teacher-time-all", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/planning/teacher/teacher_time_all");
});
PlanningRouter.get("/teacher-time-all-between-to/:dateStart/:dateEnd", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), planningController.getAllTeacherTimeBetweenTo);

//lịch test
PlanningRouter.get("/calendar-test", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), (req, res) => {
  res.render("admin/planning/calendar_test/calendar_test");
});
PlanningRouter.get("/calendar-test-ajax/:month/:year", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), planningController.getCalendartest);
PlanningRouter.post("/calendar-teacher/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), planningController.updateTeacherCalendarTest);

//bảng kế hoạch
PlanningRouter.get("/plan", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), (req, res) => {
  res.render("admin/planning/planning/planning_list");
});
PlanningRouter.get("/plan-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING,]), planningController.getAllPlan);
PlanningRouter.post("/plan-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), planningController.addPlan);
PlanningRouter.get("/plan-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), planningController.getOnePlanById);
PlanningRouter.post("/plan-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), planningController.updatePlan);
PlanningRouter.patch("/plan-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), planningController.deletePlan);

//lớp học 

PlanningRouter.get("/classroom", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), (req, res) => {
  res.render("admin/planning/class/planning_class");
});
PlanningRouter.get("/classroom-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), planningController.getAllClass);

PlanningRouter.get("/classroom-detail-student/:classId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), (req, res) => {
  res.render("admin/planning/class/class_detail");
});
PlanningRouter.get("/classroom-detail-student-ajax/:classId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), planningController.getAllStudentOfClass);

PlanningRouter.get("/classroom-detail-student/:classId/:studentListId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), (req, res) => {
  res.render("admin/planning/class/student_class");
});
PlanningRouter.get("/classroom-detail-student-ajax/:classId/:studentListId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), planningController.getOneDetailStudentOfClass);


// tổng lớp test
PlanningRouter.get("/class-test-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), (req, res) => {
  res.render("admin/planning/class/class_test_total");
});

PlanningRouter.get("/class-test/:month/:year", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), planningController.getTotalClassTest);


// lịch trống empty
PlanningRouter.get("/calendar-teach-empty", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), (req, res) => {
  res.render("admin/planning/calendar_teach/calendar_teach_empty");
});

PlanningRouter.get("/calendar-teach-empty/:dateStart", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.PERSONNEL]), planningController.getTeacherCalendarEmpty);



// danh sách học viên
PlanningRouter.get("/students", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), (req, res) => {
  res.render("admin/planning/student/students_planning");
});

PlanningRouter.get("/students-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), academicController.getStudent);



// danh sách lớp chưa điểm danh
PlanningRouter.get("/class-no-attendance", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
  res.render("admin/planning/class/class_no_attendance");
});
PlanningRouter.get("/get-class-no-attendance/:startDate/:endDate", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), planningController.getAllClassNoAttendance);


// quy trình bộ phận planning
PlanningRouter.get("/procedures", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), (req, res) => {
  res.render("admin/planning/procedure/procedure");
});
PlanningRouter.get("/procedure-list/:department", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), procedureController.getAllProcedure);
PlanningRouter.post("/procedure-add/:department", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), procedureController.addProcedure);
PlanningRouter.patch("/procedure-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), procedureController.deleteProcedure);

// các bước quy trình bộ phận planning

PlanningRouter.get("/step-procedure/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING, EnumServerDefinitions.DEPARTMENT.QC]), procedureController.getAllStepProcedure);
PlanningRouter.get("/step-procedure-detail/:stepId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), procedureController.getOneStepProcedure);

PlanningRouter.patch("/step-procedure-edit/:stepId", upload.single('file'), authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), procedureController.updateStepProcedure);
PlanningRouter.patch("/step-procedure-approval/:stepId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), procedureController.ApprovalManage);




// update admin
PlanningRouter.get("/update-admin-learning-format", authorize([EnumServerDefinitions.ROLE.ADMIN]), planningController.updateLearningFormat);

module.exports = PlanningRouter;