const express = require('express');
const EnumServerDefinitions=require('../../common/enums/enum_server_definitions');
const authorize=require('../../middlewares/authorize.middlewares');
const authorizeStaff = require('../../middlewares/authorize_staff.middlewares');
const print_receiptControllers = require('../../controllers/print_receipt.controllers');
const adminController = require('../../controllers/admin.controller');
const PrintReceiptRouter = express.Router();
//farm
    PrintReceiptRouter.get("/",authorize([EnumServerDefinitions.ROLE.ADMIN]), (req, res) => {
        res.render("admin/print_receipt/print_receipt");
    });
    PrintReceiptRouter.get("/print-receipt-ajax",authorize([EnumServerDefinitions.ROLE.ADMIN]),print_receiptControllers.getPrintReceipt);
    PrintReceiptRouter.post("/print-receipt-add",print_receiptControllers.addPrintReceipt);


    //thông báo date
    PrintReceiptRouter.get("/notifications",authorize([EnumServerDefinitions.ROLE.ADMIN]), (req, res) => {
        res.render("admin/notification/notification");
    });
    PrintReceiptRouter.get("/notification/:role/:date",authorize([EnumServerDefinitions.ROLE.ADMIN]),adminController.findNotificationDate);
    PrintReceiptRouter.patch("/notification-edit-read/:id",authorize([EnumServerDefinitions.ROLE.ADMIN]),adminController.updateReadNotification);
    
module.exports = PrintReceiptRouter;