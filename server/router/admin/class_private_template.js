const express = require('express');
const multer = require('multer');
const path = require('path');
const ClassPrivateRouter = express.Router();
const EnumServerDefinitions=require("../../common/enums/enum_server_definitions");
const authorizeStaff = require('../../middlewares/authorize_staff.middlewares');
const class_private_templateController = require('../../controllers/class_private_template.controller');
const authorize = require('../../middlewares/authorize.middlewares');
const student_templateController = require('../../controllers/student_template.controller');
//lớp học private




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
  },
});
  const upload = multer({ storage: storage });

  ClassPrivateRouter.get("/class-list",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),(req,res)=>{
    res.render('admin/class_private/class_private');
  });

  ClassPrivateRouter.get("/class-private-ajax",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),class_private_templateController.getAllClassPrivate);


  ClassPrivateRouter.get("/class-student-private/:classId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),(req,res)=>{
    res.render('admin/class_private/student_class_private');
  });
  
  ClassPrivateRouter.get("/class-student-private-ajax/:classId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]), class_private_templateController.getAllStudentOfClass);
  ClassPrivateRouter.get("/template-no-active/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]), class_private_templateController.updateStudentListNoActivePrivate);
  ClassPrivateRouter.get("/template-active/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]), class_private_templateController.updateStudentListActivePrivate);

  ClassPrivateRouter.get("/class-student-private/:classId/:studentListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]),(req,res)=>{
    res.render('admin/class_private/template_student');
  });
  
  ClassPrivateRouter.get("/class-private-student-ajax/:classId/:studentListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]), class_private_templateController.getAllTemplateOfStudent);
  ClassPrivateRouter.get("/class-private-student-edit/:studentListId/:templateId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]), class_private_templateController.getOneTemplateOfStudent);
  ClassPrivateRouter.get("/class-private-student-edit-date/:studentListId/:templateId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]), class_private_templateController.getOneTemplateOfStudent);

  ClassPrivateRouter.post("/class-private-student-edit/:studentListId/:templateId",upload.single('file'), class_private_templateController.updateTemplateStudent);
  ClassPrivateRouter.post("/class-private-student-edit-date/:studentListId/:templateId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]), class_private_templateController.updateTemplateStudentById);
  ClassPrivateRouter.patch("/class-private-student-number-end/:studentListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]), class_private_templateController.updateTemplateNumberEnd);
  ClassPrivateRouter.patch("/class-private-student-date-end/:studentListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]), class_private_templateController.updateTemPlateDateEnd);
  //reset và lưu lại giám sát
  ClassPrivateRouter.patch("/class-private-student-reset/:studentListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]), class_private_templateController.resetTemplateStudent);
  //xem lịch sử giám sát
  ClassPrivateRouter.get("/class-private-student-history/:studentListId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]), class_private_templateController.findAllTemplateHistory);
  ClassPrivateRouter.get("/class-private-student-history-detail/:templateHistoryId",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]), class_private_templateController.findOneTemplateHistory);

  ClassPrivateRouter.get("/class-private-deadline",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.STAFF,EnumServerDefinitions.ROLE.TEACHER]), class_private_templateController.findTemplateDeadline);
  

  // template
  
// learning content
ClassPrivateRouter.get("/type-template",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER]), (req, res) => {
  res.render("admin/class_private/template_category");
});

ClassPrivateRouter.get("/template-category",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER]),student_templateController.getAllTemplateCategory);
ClassPrivateRouter.post("/template-category-add",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER]),student_templateController.addTemplateCategory);
ClassPrivateRouter.get("/template-category-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER]),student_templateController.getOneTemplateCategory);
ClassPrivateRouter.patch("/template-category-edit",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER]),student_templateController.updateTemplateCategory);

// learning content
ClassPrivateRouter.get("/template-content/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER]), (req, res) => {
  res.render("admin/class_private/template_content");
});

ClassPrivateRouter.get("/get-template-content/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER]),student_templateController.getAllTemplateContent);
ClassPrivateRouter.post("/template-content-add",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER]),student_templateController.addTemplateContent);
ClassPrivateRouter.get("/template-content-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER]),student_templateController.getOneTemplateContent);
ClassPrivateRouter.patch("/template-content-edit",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER]),student_templateController.updateTemplateContent);
// learning content
ClassPrivateRouter.get("/template-student/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER]), (req, res) => {
  res.render("admin/class_private/student_template_private");
});

ClassPrivateRouter.get("/get-template-student/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER]),student_templateController.getAllStudentTemplate);
ClassPrivateRouter.get("/template-student-edit/:id",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER]),student_templateController.getOneStudentTemplate);
ClassPrivateRouter.patch("/template-student-edit",authorize([EnumServerDefinitions.ROLE.ADMIN,EnumServerDefinitions.ROLE.TEACHER]),student_templateController.updateStudentTemplateByDate);

module.exports = ClassPrivateRouter;