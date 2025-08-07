const express = require('express');
const EnumServerDefinitions = require('../../common/enums/enum_server_definitions');
const authorize = require('../../middlewares/authorize.middlewares');
const adminController = require('../../controllers/admin.controller');
const planningController = require('../../controllers/planning.controller');
const ManageRouter = express.Router();
//quản lý
ManageRouter.get("/step-procedure-note-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN]), adminController.getOneNoteStepProcedure);
ManageRouter.patch("/step-procedure-note-edit/:id", authorize([EnumServerDefinitions.ROLE.ADMIN]), adminController.updateNoteManageStepProcedure);
// lịch calendar
ManageRouter.get("/calendar-manage", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), (req, res) => {
    res.render("admin/manager/calendar_manager");
});
ManageRouter.get("/calendar-manage-get/:month/:year", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), adminController.findAllCalendarManage);
ManageRouter.post("/calendar-manage-add", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), adminController.addCalendarManage);
ManageRouter.patch("/calendar-manage-edit", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), adminController.updateCalendarManage);
ManageRouter.patch("/calendar-teach-delete", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), planningController.deleteCalendarTeach);

// danh sách admin
ManageRouter.get("/admins", authorize([EnumServerDefinitions.ROLE.ADMIN, EnumServerDefinitions.ROLE.STAFF, EnumServerDefinitions.ROLE.TEACHER]), adminController.findAllAdmin);

module.exports = ManageRouter;