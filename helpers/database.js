  
const mysql = require('mysql2/promise');
const dbConfig = require('../configs/database');
const { host, port, user, password, database } = dbConfig;
const logger =  require('../utils/logger');

const getDatabaseConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      multipleStatements: true
    });
    logger.debug('Connection to MySQL database is successful');
    return connection;
  } catch (err) {
    logger.error('Error Connecting to MySQL database ', JSON.stringify(err));
    throw err;
  }
}

module.exports = getDatabaseConnection();
   