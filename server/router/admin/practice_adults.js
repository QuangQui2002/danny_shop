const express = require('express');
const test_type_controller = require('../../controllers/test_type_controller');
const EnumServerDefinitions = require('../../common/enums/enum_server_definitions');
const authorize = require('../../middlewares/authorize.middlewares');
const practiceController = require('../../controllers/practice.controller');
const authorizeStaff = require('../../middlewares/authorize_staff.middlewares');
const practice_adultsController = require('../../controllers/practice_adults.controller');
const PracticeAdultsRouter = express.Router();
//thss
PracticeAdultsRouter.get("/practice-adults-list", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/practice_adults/practice_adults");
});
PracticeAdultsRouter.get("/practice-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practice_adultsController.getPracticeAdults);
PracticeAdultsRouter.get("/student-adults", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practice_adultsController.getAllStudentAdults);

PracticeAdultsRouter.post("/practice-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practice_adultsController.addPracticeAdults);

PracticeAdultsRouter.patch("/practice-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practice_adultsController.deletePracticeAdults);
//topic
PracticeAdultsRouter.get("/practice-topic/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/practice_adults/practice_topic");
});
PracticeAdultsRouter.post("/practice-topic-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practice_adultsController.addPracticeTopicAdults);

PracticeAdultsRouter.get("/practice-list-topic/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practice_adultsController.getPracticeAdultsTopic);
PracticeAdultsRouter.get("/practice-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practice_adultsController.getOnePracticeTopic);
PracticeAdultsRouter.patch("/practice-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practice_adultsController.updatePracticeStudent);

PracticeAdultsRouter.patch("/practice-topic-delete/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practice_adultsController.destroyPracticeTopicAdults);

//DETAIL
PracticeAdultsRouter.get("/practice-topic-detail/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/practice_adults/practice_topic_adults_detail");
});
PracticeAdultsRouter.post("/practice-topic-detail-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practice_adultsController.addPracticeTopicAdultsDetail);

PracticeAdultsRouter.get("/practice-list-topic-detail/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practice_adultsController.getPracticeAdultsTopicDetail);
PracticeAdultsRouter.get("/practice-detail-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practice_adultsController.getOnePracticeTopicDetail);
PracticeAdultsRouter.patch("/practice-detail-edit/:practiceAdultsTopicId/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practice_adultsController.updatePracticeStudentTopicDetail);
PracticeAdultsRouter.patch("/practice-detail-delete/:practiceAdultsTopicId/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practice_adultsController.destroyPracticeTopicAdultsDetail);



// thực hành song song new
PracticeAdultsRouter.get("/practice-list", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES, EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/practice_adults/practice");
});
PracticeAdultsRouter.get("/practice-adults-ajax", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES, EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practiceController.getPracticeAdults);
PracticeAdultsRouter.post("/practice-adults-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES, EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practiceController.addPracticeAdults);
PracticeAdultsRouter.patch("/practice-delete-adults/:practiceId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES, EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practiceController.deletePractice);

PracticeAdultsRouter.post("/practice-add-last-month/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES, EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practiceController.addPracticeAdultsLastMonth);

//thống kê
PracticeAdultsRouter.get("/statistical-practice/:id", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES, EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practiceController.statisticalPracticeAdultsInStudentSystem);

// quét dữ liệu thêm tự động lại học viên
PracticeAdultsRouter.patch("/practice-check-student/:practiceId", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES, EnumServerDefinitions.DEPARTMENT.CSKH, EnumServerDefinitions.DEPARTMENT.QC]), practiceController.checkStudentAdultsDuplicatePractice);

// danh sách học viên thss
PracticeAdultsRouter.get("/practice-student/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]), (req, res) => {
    res.render("admin/practice_adults/practice_student_adults");
});
PracticeAdultsRouter.get("/practice-list-student/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.getPracticeStudentClassAdults);
PracticeAdultsRouter.get("/practice-list-student-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.getOnePracticeStudent);
PracticeAdultsRouter.patch("/practice-list-student-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.updatePracticeStudent);

PracticeAdultsRouter.get("/practice-student-create",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.getStudentListOfClassCreateAdults);
PracticeAdultsRouter.post("/practice-student-create/:practiceId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.addStudentListOfClassCreate);


PracticeAdultsRouter.patch("/practice-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.SALES,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.QC]),practiceController.destroyStudentListOfClassCreate);

module.exports = PracticeAdultsRouter;