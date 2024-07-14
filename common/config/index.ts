import * as fs from 'fs';
import * as process from 'process';

process.env.NODE_ENV = process.env.NODE_ENV || 'local';
const currentEnv: string = process.env.NODE_ENV;

declare const __dirname: string;
const filePath = `${__dirname}/${currentEnv}.json`;

let config = {};

const readConfig = () => {
  if (Object.keys(config).length) {
    return config;
  }

  try {
    config = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error reading JSON file:', error);
  }

  return config;
};

readConfig();
const loadedConfig: any = config;
export default config = loadedConfig;