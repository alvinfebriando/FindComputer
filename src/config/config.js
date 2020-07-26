import dotenv from 'dotenv';

dotenv.config();

export default {
  API_URL: process.env.API_URL || 'http://localhost:8080',
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
};
