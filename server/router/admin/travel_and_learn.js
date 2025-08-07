const express = require('express');
const test_type_controller = require('../../controllers/test_type_controller');
const EnumServerDefinitions=require('../../common/enums/enum_server_definitions');
const authorize=require('../../middlewares/authorize.middlewares');
const authorizeStaff = require('../../middlewares/authorize_staff.middlewares');
const travel_and_learnController = require('../../controllers/travel_and_learn.controller');
const TravelAndLearnRouter = express.Router();
TravelAndLearnRouter.get("/",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]), (req, res) => {
    res.render("admin/travel_and_learn/report_trip");
});

TravelAndLearnRouter.get("/report-trip",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),travel_and_learnController.getAllReportTrip);
TravelAndLearnRouter.post("/report-trip-add",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),travel_and_learnController.addReportTrip);
TravelAndLearnRouter.get("/report-trip-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),travel_and_learnController.getOneReportTripById);
TravelAndLearnRouter.patch("/report-trip-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),travel_and_learnController.updateReportTrip);
TravelAndLearnRouter.get("/report-trip-seen/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),travel_and_learnController.manageSeenReportTrip);
TravelAndLearnRouter.patch("/report-trip-note/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),travel_and_learnController.manageNoteReportTrip);
TravelAndLearnRouter.delete("/report-trip-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER,EnumServerDefinitions.ROLE.STAFF]),travel_and_learnController.destroyReportTrip);
module.exports = TravelAndLearnRouter;