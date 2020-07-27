import dotenv from 'dotenv';

dotenv.config();

export default {
  API_URL: process.env.API_URL || 'https://desolate-hamlet-69047.herokuapp.com',
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
};
