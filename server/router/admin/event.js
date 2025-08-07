const express = require('express');
const test_type_controller = require('../../controllers/test_type_controller');
const EnumServerDefinitions = require('../../common/enums/enum_server_definitions');
const authorize = require('../../middlewares/authorize.middlewares');
const eventController = require('../../controllers/event.controller');
const event_summerController = require('../../controllers/event_summer.controller');
const winter_breakController = require('../../controllers/winter_break.controller');
const spring_campController = require('../../controllers/spring_camp.controller');
const EventRouter = express.Router();
//event
EventRouter.get("/", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
    res.render("admin/event/page_event");
});
EventRouter.get("/summer-ball", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
    res.render("admin/event/event");
});
EventRouter.get("/department", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.findAllDepartment);

EventRouter.get("/events-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.findAllEvent);
EventRouter.post("/events-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.addEvent);
EventRouter.get("/event-edit/:eventId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.findOneEvent);
EventRouter.patch("/event-edit/:eventId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.updateEvent);
EventRouter.patch("/event-delete/:eventId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.deleteEvent);


//eventStudent
EventRouter.get("/events-student/:eventId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
    res.render("admin/event/event_student");
});
EventRouter.get("/events-student-ajax/:eventId/:staffId/:typeEvent/:weekList/:level", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.findAllEventStudent);

EventRouter.get("/events-student-exist-init", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.getStudentExistEvent);

EventRouter.post("/events-student-add/:eventId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.addEventStudent);
EventRouter.post("/events-student-add-student-exist/:eventId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.addStudentEventOfExist);

EventRouter.get("/event-student-edit/:eventStudentId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.findOneEventStudent);
EventRouter.patch("/event-student-edit/:eventId/:eventStudentId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.updateEventStudent);
EventRouter.patch("/event-student-delete/:eventId/:eventStudentId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.deleteEventStudent);



// event Summer Class Report
EventRouter.get("/event-summer-report/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
    res.render("admin/event/event_summer_class");
});
EventRouter.get("/event-summer-report-ajax/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), event_summerController.findAllEventSummerClass);
EventRouter.post("/event-summer-report-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), event_summerController.addEventSummerClass);
EventRouter.get("/event-summer-report-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), event_summerController.findOneEventSummerClass);
EventRouter.patch("/event-summer-report-edit/:eventSummerClassId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), event_summerController.updateEventSummerClass);
EventRouter.patch("/event-summer-report-delete/:eventSummerClassId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), event_summerController.deleteEventSummerClass);

EventRouter.get("/event-summer-check/:eventId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
    res.render("admin/event/summer_report/summer_report");
});
EventRouter.get("/event-summer-check/:eventId/:week/:level", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), event_summerController.findAllSummerReportClass);



// danh sách học viên theo level và tuần
EventRouter.get("/event-student/:eventId/:week/:level/:type", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), event_summerController.findAllStudentOfWeekAndLevel);

EventRouter.post("/report-event-student-all-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), event_summerController.addReportStudentAll);


// đóng góp chương tình smb
EventRouter.get("/event-contribute/:eventId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER]), (req, res) => {
    res.render("admin/event/event_contribute");
});
EventRouter.get("/event-contribute-ajax/:eventId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER]), eventController.getAllContributeEvent);
EventRouter.post("/event-contribute-add/:eventId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER]), eventController.addContributeEvent);
EventRouter.get("/event-contribute-edit/:contributeId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER]), eventController.getOneContributeEvent);
EventRouter.patch("/event-contribute-edit/:eventId/:contributeId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER]), eventController.updateContributeEvent);
EventRouter.patch("/event-contribute-delete/:eventId/:contributeId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER]), eventController.deleteContributeEvent);


// danh sách học viên nghỉ hè
EventRouter.get("/event-student-off-summer/:eventId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER]), (req, res) => {
    res.render("admin/event/student_off_summer");
});
EventRouter.get("/event-student-off-summer-ajax/:eventId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER]), eventController.findAllStudentOffSummer);
EventRouter.get("/event-student-off-summer-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER]), eventController.findOneStudentOffSummer);
EventRouter.patch("/event-student-off-summer-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER]), eventController.updateStudentOffSummer);
EventRouter.patch("/event-student-off-summer-add/:eventId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER]), eventController.addAllStudentOffSummer);
EventRouter.patch("/event-student-off-summer-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER]), eventController.deleteStudentOffSummer);

EventRouter.get("/event-student-off-summer-init", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER]), eventController.findAllStudentList);

EventRouter.patch("/event-student-off-summer-add-one/:eventId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER]), eventController.addOneStudentOffSummer);

// điểm danh summer ball 
// điểm danh winter break
EventRouter.post("/event-student-attendance-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), event_summerController.addAttendanceStudentEvent);
EventRouter.get("/event-student-attendance/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), event_summerController.findAllStudentAttendanceEvent);
EventRouter.patch("/event-student-attendance-edit", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), event_summerController.updateAttendanceStudentEvent);

EventRouter.post("/event-student-attendance-add-note", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), event_summerController.addNoteAttendanceStudentEvent);
EventRouter.patch("/event-student-attendance-edit-note", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), event_summerController.updateNoteAttendanceStudentEvent);

EventRouter.get("/get-event-student-attendance/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), event_summerController.findAllStudentAttendance);


// winter break
EventRouter.get("/winter-break", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
    res.render("admin/event/winter_break/winter_break");
});
EventRouter.get("/get-winter-break", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.getAllWinterBreak);
EventRouter.post("/winter-break-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.addWinterBreak);
EventRouter.get("/winter-break-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.getOneWinterBreak);
EventRouter.patch("/winter-break-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.updateWinterBreak);
EventRouter.patch("/winter-break-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.deleteWinterBreak);


// spring Ccamp
EventRouter.get("/spring-camp", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
    res.render("admin/event/spring_camp/spring_camp");
});
EventRouter.get("/get-spring-camp", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), spring_campController.getAllSpringCamp);
EventRouter.post("/spring-camp-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), spring_campController.addSpringCamp);
EventRouter.get("/spring-camp-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), spring_campController.getOneSpringCamp);
EventRouter.patch("/spring-camp-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), spring_campController.updateSpringCamp);
EventRouter.patch("/spring-camp-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), spring_campController.deleteSpringCamp);

// spring Ccamp student
EventRouter.get("/spring-camp-student/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
    res.render("admin/event/spring_camp/spring_camp_student");
});

// winter break student
EventRouter.get("/winter-break-student/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
    res.render("admin/event/winter_break/winter_break_student");
});

EventRouter.get("/get-init-staff", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.getInitSalesAndCskh);

EventRouter.get("/get-winter-break-student/:id/:staffId/:week/:gender", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.getAllWinterBreakStudent);
EventRouter.post("/winter-break-student-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.addWinterBreakStudent);
EventRouter.get("/winter-break-student-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.getOneWinterBreakStudent);
EventRouter.patch("/winter-break-student-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.updateWinterBreakStudent);

// điểm danh winter break
EventRouter.post("/winter-break-student-attendance-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.addAttendanceStudentWinterBreak);
EventRouter.get("/winter-break-student-attendance/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.findAllStudentAttendanceWinterBreak);
EventRouter.patch("/winter-break-student-attendance-edit", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.updateAttendanceStudentWinterBreak);

EventRouter.post("/winter-break-student-attendance-add-note", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.addNoteAttendanceStudentWinterBreak);
EventRouter.patch("/winter-break-student-attendance-edit-note", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.updateNoteAttendanceStudentWinterBreak);

EventRouter.get("/student-attendance/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), winter_breakController.findAllStudentAttendance);



// ghi chú ý kiến phụ huynh
EventRouter.get("/list-note-parent/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
    res.render("admin/event/event_note_parent");
});

EventRouter.get("/note-parent/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.findAllEventNoteParent);
EventRouter.get("/note-parent-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.findOneEventNoteParentById);
EventRouter.post("/note-parent-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.addEventNoteParent);
EventRouter.patch("/note-parent-edit", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.updateEventNoteParent);
EventRouter.put("/note-parent-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.deleteEventNoteParent);


// thông tin tổng họp của học viên
EventRouter.get("/student-detail/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
    res.render("admin/event/summer_report/student_detail");
});

EventRouter.get("/get-student-detail/:id/:week", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.findOneStudentEventDetail);


// danh sách điểm danh summer ball
EventRouter.get("/events-student-attendance/:id/:week", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.findAllStudentAttendance);



// tạo môn học để chọn cho report
EventRouter.get("/list-subject", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
    res.render("admin/event/event_subject");
});

EventRouter.get("/subjects", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.findAllEventSubject);
EventRouter.get("/subjects-active", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.findAllEventSubjectActive);
EventRouter.get("/subject-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.findOneEventSubject);
EventRouter.post("/subject-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.addEventSubject);
EventRouter.patch("/subject-edit", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.updateEventSubject);
EventRouter.put("/subject-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.TEACHER, EnumServerDefinitions.ROLE.STAFF]), eventController.deleteEventSubject);


module.exports = EventRouter;