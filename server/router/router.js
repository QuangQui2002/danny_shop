const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const AuthController =require('../controllers/auth.controller');
const responseMiddleware = require('../middlewares/response.middleware');
const AcademicRouter =require("./teachers/academic");
const AccountantRouter =require("./staffs/accountant");
const CustomerCareRouter =require("./staffs/customer_care");
const PlanningRouter =require("./staffs/planning");   
const SalesRouter =require("./staffs/sales");
const PersonnelRouter = require('./staffs/personnel');
const authenticateToken=require("../middlewares/authenticate.middleware");
const CourseRouter = require('./admin/course');
const ClassRouter = require('./admin/class');
const TestTypeRouter = require('./admin/test_type');
const DashboardController = require('../controllers/dashboard.controller');
const ClassPrivateRouter = require('./admin/class_private_template');
const personnelController = require('../controllers/personnel.controller');
const PrintReceiptRouter = require('./admin/print_receipt');
const detail_userController = require('../controllers/detail_user.controller');
const QCController = require('./staffs/qc');
const PracticeRouter = require('./admin/practice');
const PracticeAdultsRouter = require('./admin/practice_adults');
const PracticeTeenRouter = require('./admin/practice_teens');
const staffController = require('../controllers/staff.controller');
const EventRouter = require('./admin/event');
const adminController = require('../controllers/admin.controller');
const SpecialCasesRouter = require('./admin/special_cases');
const TravelAndLearnRouter = require('./admin/travel_and_learn');
const ManageRouter = require('./admin/manage');
const procedureController = require('../controllers/procedure.controller');
const AssignmentRouter = require('./teachers/assignment');
const StudentRouter = require('./student/student');
const studentController = require('../controllers/student.controller');
router.use(responseMiddleware);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
  },
});
  const upload = multer({ storage: storage });

router.get('/',(req, res) => {
  res.render("admin/personnel/recruitment/home_recruitment")
});

router.get('/ajax',personnelController.getAllRecruitmentActive);

router.post("/apply-user-add",upload.single('file'),personnelController.addApplyUser);

router.get('/update-admin-number-class',authenticateToken,adminController.updateSystemDataBase);

router.get('/update-data-file',authenticateToken,adminController.checkDataFile);

router.get('/ajax/:id',personnelController.getOneRecruitmentById);

router.get('/home',authenticateToken,(req, res) => {
  res.render("admin/dashboard/dashboard")
});
router.get('/all',authenticateToken,DashboardController.getDashBoard);
router.get('/notification',authenticateToken,DashboardController.getNotification);

router.patch('/edit-read/:id',authenticateToken,DashboardController.updateReadNotification);
// router.get('/count-notification',authenticateToken,DashboardController.getCountNotification);
router.get('/student-test-score',authenticateToken,DashboardController.getStudentTestScore);
// danh sách duyệt của manager
router.get('/list-approval-manager',authenticateToken,adminController.getApprovalManager);
router.patch("/step-procedure-approval-manager/:stepId",authenticateToken,procedureController.ApprovalManage);
router.patch("/student-off-approval-manager/:id",authenticateToken,adminController.ApprovalManageStudentOff);



// detail user 
router.get('/detail',authenticateToken,(req, res) => {
  res.render("admin/detail_user/detail_user")
});
router.get('/get-detail',authenticateToken,detail_userController.getDetail);

//đăng nhập
router.get("/sign-in", (req, res) => {
    res.render("admin/login/login")
});


router.post("/sign-in",function (req, res)  {
  AuthController.login(req, res);
});

//đăng ký
// router.get("/sign-up", (req, res) => {
//   res.render("admin/login/register");
// });
//   router.post("/sign-up",function  (req, res){
//     AuthController.register(req, res);
// });

router.get("/change-password", authenticateToken,function  (req, res){
  res.render("admin/change_password/change_password");
});
router.post("/change-password/:id", authenticateToken,AuthController.updatePassword);
router.get("/profile", authenticateToken,staffController.getProfileAvatar);

router.patch("/user-change-avatar",authenticateToken,upload.single('file'),staffController.updateAvatar);

  //đăng xuất
  router.get('/logout' , (req, res) => {
    // Xóa cookie có tên 'token'
    const cookieNames = Object.keys(req.cookies);
    // Lặp qua danh sách cookies và xóa mỗi cookie
    cookieNames.forEach((cookieName) => {
      res.clearCookie(cookieName);
    });
    // Thực hiện các xử lý khác khi đăng xuất
    res.redirect('/'); // Chẳng hạn, chuyển hướng về trang đăng nhập
  });
//giáo viên
router.use('/academic', authenticateToken, AcademicRouter);
router.use('/assignment', authenticateToken, AssignmentRouter);
//nhân viên
router.use('/accountant', authenticateToken, AccountantRouter);
router.use('/cskh', authenticateToken, CustomerCareRouter);
router.use('/personnel', authenticateToken, PersonnelRouter);
router.use('/planning', authenticateToken, PlanningRouter);
router.use('/sales', authenticateToken, SalesRouter);
router.use('/qc', authenticateToken, QCController);



//admin
router.use('/course', authenticateToken, CourseRouter);
router.use('/class', authenticateToken, ClassRouter);
router.use('/class-private', authenticateToken, ClassPrivateRouter);
router.use('/test-type', authenticateToken, TestTypeRouter);
router.use('/print-receipt', authenticateToken, PrintReceiptRouter);
router.use('/practice', authenticateToken, PracticeRouter);
router.use('/practice-adults', authenticateToken, PracticeAdultsRouter);
router.use('/practice-teens', authenticateToken, PracticeTeenRouter);
router.use('/events', authenticateToken, EventRouter);
router.use('/special-cases', authenticateToken, SpecialCasesRouter);
router.use('/travel-and-learn', authenticateToken, TravelAndLearnRouter);
router.use('/manage', authenticateToken, ManageRouter);

// elearning
router.use('/students', authenticateToken,  StudentRouter);



















module.exports = router;