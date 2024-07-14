import * as process from 'process';
import * as fs from 'fs';

const currentEnv: string = process.env.NODE_ENV || 'local';

const filePath = `${__dirname}/${currentEnv}.json`;

const envs: { [key: string]: any } = {};
envs.db = JSON.parse(fs.readFileSync(filePath, 'utf8')).db;

module.exports = envs;
