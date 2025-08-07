const express = require("express");
const cookieParser = require('cookie-parser');
const db = require('./config/connect_database.config');
const SystemConst = require('./common/consts/system_const');  
const logger = require('./config/logger.config');
const mysql = require("mysql");
const path = require("path");
const { error } = require("winston");
const dotenv = require("dotenv");
const router = require('./router/router');
dotenv.config({ path: './.env' })
const fs = require('fs');
const https = require('https');
const app = express();
const ejs = require('ejs');
const EnumServerDefinitions = require("./common/enums/enum_server_definitions");
const server_response = require("./common/utils/server_response");
const portHttps = SystemConst.PORT_HTTPS;
const domain = SystemConst.DOMAIN;


// const httpsOptions = {
//   key: fs.readFileSync(path.join(__dirname, 'cert', 'private.key')),
//   cert: fs.readFileSync(path.join(__dirname, 'cert', 'certificate.crt'))
// };
const httpsServer = https.createServer(app);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views/admin')));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use('/',router);
app.set('view engine', 'ejs');

app.get('/file/:file', (req, res) => {
  try {
    const file = req.params.file;
    const imagePath = path.join(__dirname, 'public/images', file);
    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
        return res.render('admin/error/404');
    }
  } catch (error) {
    logger.error(error)
  }

});

// const start = async (server, port) => {
//   try {
//       await db.connectDatabase();
//       server.listen(port, domain, async () => {
//           logger.info(`Example app listening on port: ${port}`);
//       }).on(EnumServerDefinitions.ERROR, (error) => {
//           logger.error(`Failed to start server: ${error}`);
//           console.log(error.message);
//       });
//   }
//   catch (error) {
//       logger.error(error);
//   }
// };
// start(httpsServer, portHttps);

app.listen(portHttps, () => {
  console.log("server "+portHttps)
})

