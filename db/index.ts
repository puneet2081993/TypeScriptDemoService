import { Sequelize } from 'sequelize';

import config from '../common/config';

const apiDB = new Sequelize({
  dialect: config.db.dialect, // Change this to your preferred database dialect (e.g., 'mysql' or 'sqlite')
  host: config.db.host, // Change this to your database host
  port: config.db.port, // Change this to your database port
  username: config.db.username, // Change this to your database username
  password: config.db.password, // Change this to your database password
  database: config.db.database, // Change this to your database name
  logging: (sql) => console.debug('QUERY', 'API-QUERY', {
    sql,
  }),
});

export default apiDB;
