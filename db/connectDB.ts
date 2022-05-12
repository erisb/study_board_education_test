import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const userDB = process.env.DB_USERNAME as string;
const passDB = process.env.DB_PASSWORD;
const hostDB = process.env.DB_HOST;
const portDB = process.env.DB_PORT;
const nameDB = process.env.DB_DATABASE as string;
const dialectDB = process.env.DB_DIALECT as Dialect;

// Option 2: Passing parameters separately (other dialects)
const conn = new Sequelize(nameDB, userDB, passDB, {
    host: hostDB,
    dialect: dialectDB
});
conn.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

// export connection
export default conn;