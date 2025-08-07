class SystemConst {
    static PORT_HTTP = 3439;
    static PORT_HTTPS = 3439;
    static DOMAIN = '127.0.0.1';
    static STATUS_CODE = {
        SUCCESS: 200,
        BAD_REQUEST: 400,
        FORBIDDEN_REQUEST: 403,
        UNAUTHORIZED_REQUEST: 401,
        // not found
        NOT_FOUND: 404,
        CONFLICT: 409,
        INTERNAL_SERVER: 500,
    };
    //API_key
    static API_KEY = '';
    // time token
    static EXPIRES_IN = '5d';
    // Số lượng vòng lặp mã hóa
    static SALT_ROUNDS = 8;
    //time Zone
    static TIME_ZONE = 'Asia/Ho_Chi_Minh';
    
    static KB = 1024;
}
module.exports = SystemConst;
