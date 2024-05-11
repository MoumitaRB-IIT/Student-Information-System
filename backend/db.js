// db.js
require('dotenv').config();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'mydb.cdqgwsgkge54.us-east-1.rds.amazonaws.com',    
    user: 'myadmin',
    password: 'mypassword',
    database: 'mydb',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {        
        rejectUnauthorized: false
      }
});

async function checkSchema() {
  try {
      const connection = await pool.getConnection();
      console.log('Database connection was successful!');
      console.log('Connected to host:', connection.config.host);
      await connection.query("USE mydb;");
      console.log('Using schema:', connection.config.database);

      // Perform a simple schema check
      const [rows] = await connection.query("SHOW TABLES LIKE 'Students';");
      if (rows.length === 0) {
          throw new Error('Schema check failed: students does not exist.');
      }
      console.log('Schema check passed: students exists.');

      connection.release(); // Release the connection back to the pool
  } catch (error) {
      console.error('Database connection or schema check failed:', error);
  }
}

checkSchema();

module.exports = pool;
