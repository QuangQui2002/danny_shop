const express = require('express');
const CourseRouter = express.Router();

const CourseController = require('../../controllers/course.controller');
const authorize = require('../../middlewares/authorize.middlewares');
const EnumServerDefinitions = require('../../common/enums/enum_server_definitions');
const authorizeStaff = require('../../middlewares/authorize_staff.middlewares');


//khóa học
  CourseRouter.get("/course-list",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.SALES]),(req,res)=>{
    res.render('admin/course/course_list');
  });
  CourseRouter.get("/course-list-ajax",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.SALES]),CourseController.getCourse);


  CourseRouter.post("/course-create",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.SALES]),CourseController.addCourse);

  CourseRouter.get("/course-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.SALES]),CourseController.getCourseId);
  
  CourseRouter.post("/course-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.SALES]),CourseController.updateCourse);
  
  CourseRouter.post("/course-delete/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF]),authorizeStaff([EnumServerDefinitions.DEPARTMENT.PLANNING,EnumServerDefinitions.DEPARTMENT.CSKH,EnumServerDefinitions.DEPARTMENT.SALES]),CourseController.deleteCourse);
  
  CourseRouter.patch("/course-agree/:courseId",authorize([EnumServerDefinitions.ROLE.ADMIN]),CourseController.courseAgree);
  CourseRouter.patch("/course-refuse/:courseId",authorize([EnumServerDefinitions.ROLE.ADMIN]),CourseController.courseRefuse);
  

module.exports = CourseRouter;