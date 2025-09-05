import env from '../config/env.js';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Db successfully connected");
        await sequelize.sync({ alter: true }); 
        console.log("Models synchronized with db");
    } catch (error) {
        console.error("DB connection error:", error);
        process.exit(1);
    }
})();

export default sequelize;