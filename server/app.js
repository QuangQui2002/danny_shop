const express = require('express');
const db = require('./config/connect_database.config');
const logger = require('./config/logger.config');
const SystemConst = require('./common/consts/system_const');
const customCorsOptions = require('./config/custom_cors_options.config');
const app = express();
const router = require('./router/router');

// Cấu hình server HTTPS
const portHttps = SystemConst.PORT_HTTPS;

app.use(customCorsOptions);
app.use('/api', router);

app.listen(portHttps, () => {
  console.log("server "+portHttps)
})