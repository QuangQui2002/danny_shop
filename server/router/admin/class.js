const express = require('express');
const multer = require('multer');
const path = require('path');
const classController = require('../../controllers/class.controller');
const ClassRouter = express.Router();
const authorize=require('../../middlewares/authorize.middlewares');
const EnumServerDefinitions=require("../../common/enums/enum_server_definitions");
const authorizeStaff = require('../../middlewares/authorize_staff.middlewares');
//lớp học
  ClassRouter.get("/class-list",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]),(req,res)=>{
    res.render('admin/class/class_list');
  });

  ClassRouter.get("/class-ajax",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]),classController.getClass);
  ClassRouter.get("/class-active",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),classController.getClassActive);


  ClassRouter.get("/class-create",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), classController.getInit);

  ClassRouter.post("/class-create",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), classController.addClass);

  ClassRouter.get("/class-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), classController.getClassId);

  ClassRouter.post("/class-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), classController.updateClassRoom);

  ClassRouter.post ("/class-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]), classController.deleteClassRoom);
  
  ClassRouter.patch("/class-agree/:classId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), classController.ClassAgree);
  ClassRouter.patch("/class-refuse/:classId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]), classController.ClassRefuse);
  //teacher của lớp
  ClassRouter.get("/teacher-class/:classId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]),(req,res)=>{
    res.render('admin/class/teacher_class');
  });

  ClassRouter.get("/teacher-class-ajax/:classId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]),classController.getAllTeacherOfClass);
  ClassRouter.patch("/teacher-class-delete/:classId/:teacherListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]),classController.deleteTeacherListOutClassRoom);
  ClassRouter.post("/teacher-class-add/:classId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]),classController.addTeacherListToClass);


  ClassRouter.get("/teacher-class-edit/:teacherListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]),classController.findOneTeacherList);
  ClassRouter.patch("/teacher-class-edit/:classId/:teacherListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING]),classController.updateTeacherList);

module.exports =ClassRouter;