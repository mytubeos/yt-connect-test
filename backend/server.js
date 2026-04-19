// server.js — YouTube Connect Test Project
// Sirf YouTube OAuth test karne ke liye — real project ka exact code use kar raha hai

require('dotenv').config();

const { validateEnv, config } = require('./src/config/env');
const { connectDB }           = require('./src/config/db');
const { connectRedis }        = require('./src/config/redis');
const app                     = require('./src/app');

const start = async () => {
  try {
    validateEnv();
    await connectDB();
    connectRedis();

    const PORT = config.port;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n✅ Test server running!`);
      console.log(`🌐 http://localhost:${PORT}`);
      console.log(`📡 API: http://localhost:${PORT}/api/v1`);
      console.log(`❤️  Health: http://localhost:${PORT}/api/v1/health\n`);
    });
  } catch (err) {
    console.error('❌ Start failed:', err.message);
    process.exit(1);
  }
};

start();
