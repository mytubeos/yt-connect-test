// src/config/env.js — TEST PROJECT (minimal)
const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_ACCESS_SECRET',
  'REDIS_URL',
  'CLIENT_URL',
  'YOUTUBE_CLIENT_ID',
  'YOUTUBE_CLIENT_SECRET',
  'YOUTUBE_REDIRECT_URI',
];

const validateEnv = () => {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error('❌ Missing env vars:');
    missing.forEach((key) => console.error(`   - ${key}`));
    process.exit(1);
  }
  console.log('✅ Env validated');
};

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV !== 'production',
  mongodb: { uri: process.env.MONGODB_URI },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiresIn: '15m',
  },
  redis: { url: process.env.REDIS_URL },
  cors: { clientUrl: process.env.CLIENT_URL || 'http://localhost:3000' },
  youtube: {
    clientId:     process.env.YOUTUBE_CLIENT_ID,
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET,
    redirectUri:  process.env.YOUTUBE_REDIRECT_URI,
  },
};

module.exports = { config, validateEnv };
