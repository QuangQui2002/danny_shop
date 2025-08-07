const SystemConst = require('../common/consts/system_const');
const EnumMessage = require('../common/enums/enum_message');
const EnumServerDefinitions = require('../common/enums/enum_server_definitions');
const ServerResponse = require('../common/utils/server_response');
const logger = require('../config/logger.config');
const accountServices = require('../services/account.services');
const department_staffServices = require('../services/department_staff.services');
const notificationServices = require('../services/notification/notification.services');
const staffServices = require('../services/staff/staff.services');


const authorizeStaff = (allowedDepartments) => async (req, res, next) => {

  var department;
  const accountId = await accountServices.findAccountById(req.user.account_id, req.user.role);
  if (req.user.role =='0') {
    var staffId = accountId.Staff.id;
    department = await department_staffServices.findDepartmentStaffMiddlewares(staffId);
  }
  const role = req.user.role;
  try {
    if (parseInt(role) === EnumServerDefinitions.ROLE.TEACHER) {
      return next();
    } else {
      if (parseInt(role) === EnumServerDefinitions.ROLE.ADMIN) {
        return next();
      } else {
        for (var i = 0; i < allowedDepartments.length; i++) {
          for (var j = 0; j < department.length; j++) {
            if (parseInt(allowedDepartments[i]) === department[j].department) {
              return next();
            }
          }
          if (i === allowedDepartments.length - 1) {
            var department;
            switch (req.baseUrl) {
              case '/personnel': {
                department = 'Nhân Sự';
                break
              }
              case '/accountant': {
                department = 'Kế Toán';
                break
              }
              case '/sales': {
                department = 'Sales';
                break
              }
              case '/academic': {
                department = 'Giáo Vụ';
                break
              } case '/cskh': {
                department = 'CS';
                break
              } case '/qc': {
                department = 'QC';
                break
              } case '/planning': {
                department = 'Kế Hoạch';
                break
              }
              case '/course': {
                department = 'Khóa Học';
                break
              }
              case '/class': {
                department = 'Lớp Học';
                break
              }
              case '/test-type': {
                department = 'Loại Test';
                break
              }
              case '/special-cases':{
                department='Phụ Đạo';
                break
              }
              case '/print-receipt': {
                department = 'Phiếu In';
                break
              }
              case '/practice': {
                department = 'Thực Hành Song Song Kids';
                break
              }
              case '/practice-teens': {
                department = 'Thực Hành Song Song Teens';
                break
              }
              case '/practice-adults': {
                department = 'Thực Hành Song Song Adults';
                break
              }
              case '/assignment': {
                department = 'E-Learning';
                break
              }
              case '/students': {
                department = 'Học Viên';
                break
              }
            }
            const message = `Đã vào phòng ${department}`;
            await notificationServices.createNotifications(req.user.account_id, message, null);
            // const errorMessage = 'Không Có Quyền Truy Cập';
            //     return ServerResponse.createErrorResponse(res, SystemConst.STATUS_CODE.UNAUTHORIZED_REQUEST, errorMessage)
            // ;
            return res.render('admin/error/404');
          }
        }
      }
    }
  } catch (error) {
    logger.error(error);
    var department;
    switch (req.baseUrl) {
      case '/personnel': {
        department = 'Nhân Sự';
        break
      }
      case '/accountant': {
        department = 'Kế Toán';
        break
      }
      case '/sales': {
        department = 'Sales';
        break
      }
      case '/academic': {
        department = 'Giáo Vụ';
        break
      } case '/cskh': {
        department = 'CS';
        break
      } case '/qc': {
        department = 'QC';
        break
      } case '/planning': {
        department = 'Kế Hoạch';
        break
      }
      case '/course': {
        department = 'Khóa Học';
        break
      }
      case '/class': {
        department = 'Lớp Học';
        break
      }
      case '/test-type': {
        department = 'Loại Test';
        break
      }
      case '/special-cases':{
        department='Phụ Đạo';
        break
      }
      case '/print-receipt': {
        department = 'Phiếu In';
        break
      }
      case '/practice': {
        department = 'Thực Hành Song Song Kids';
        break
      }
      case '/practice-teens': {
        department = 'Thực Hành Song Song Teens';
        break
      }
      case '/practice-adults': {
        department = 'Thực Hành Song Song Adults';
        break
      }
      case '/assignment': {
        department = 'E-Learning';
        break
      }
      case '/students': {
        department = 'Học Viên';
        break
      }
    }
    const message = `Đã vào phòng ${department}`;
    await notificationServices.createNotifications(req.user.account_id, message, null);
    // const errorMessage = 'Không Có Quyền Truy Cập';
    //     return ServerResponse.createErrorResponse(res, SystemConst.STATUS_CODE.UNAUTHORIZED_REQUEST, errorMessage);
        return res.render('admin/error/404');
    
  }
};


module.exports = authorizeStaff;