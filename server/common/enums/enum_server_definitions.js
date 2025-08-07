class EnumServerDefinitions {
    static OK = 'OK';
    static ERROR = 'error';
    static FINISH = 'finish';
    static AUTHORIZATION = 'authorization';
    static STATUS = {
        ACTIVE: 1,
        NO_ACTIVE: 0,
    };
    static ROLE = {
        STAFF: 0,
        ADMIN: 2,
        CUSTOMER: 3,
    };

    static EMPTY = 0;

}
module.exports = EnumServerDefinitions;