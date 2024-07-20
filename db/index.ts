import { Sequelize } from 'sequelize';
import config from '../common/config';

const apiDB = new Sequelize({
  dialect: config.db.dialect,
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  logging: (sql) => console.debug('QUERY', 'API-QUERY', { sql }),
});

export default apiDB;