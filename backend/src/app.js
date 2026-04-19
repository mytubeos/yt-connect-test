// src/app.js — Test Project (sirf YouTube auth routes)
const express      = require('express');
const cors         = require('cors');
const helmet       = require('helmet');
const cookieParser = require('cookie-parser');
const { config }   = require('./config/env');
const { errorResponse } = require('./utils/response.utils');

const authRoutes    = require('./routes/auth.routes');
const youtubeRoutes = require('./routes/youtube.routes');

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: [
    config.cors.clientUrl,
    'http://localhost:3000',
    'http://localhost:5173',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.set('trust proxy', 1);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const s = res.statusCode;
    const c = s >= 400 ? '\x1b[31m' : '\x1b[32m';
    console.log(`${c}${req.method}\x1b[0m ${req.originalUrl} ${c}${s}\x1b[0m — ${Date.now()-start}ms`);
  });
  next();
});

// Health
app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, message: '✅ YouTube test server running!', time: new Date() });
});

app.get('/api/v1/ping', (req, res) => res.send('pong 🏓'));

// Routes
app.use('/api/v1/auth',    authRoutes);
app.use('/api/v1/youtube', youtubeRoutes);

// 404
app.use((req, res) => {
  errorResponse(res, 404, `Route not found: ${req.method} ${req.originalUrl}`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  errorResponse(res, 500, err.message || 'Internal server error');
});

module.exports = app;
