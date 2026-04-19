// src/routes/auth.routes.js — Test Project
// Sirf login aur register — YouTube connect test ke liye JWT token chahiye

const express       = require('express');
const router        = express.Router();
const bcrypt        = require('bcryptjs');
const User          = require('../models/user.model');
const { generateAccessToken } = require('../utils/jwt.utils');
const { successResponse, errorResponse } = require('../utils/response.utils');

// POST /api/v1/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return errorResponse(res, 400, 'name, email, password required');

    const exists = await User.findOne({ email });
    if (exists) return errorResponse(res, 409, 'Email already registered');

    const user = await User.create({
      name,
      email,
      password,
      isEmailVerified: true, // test me auto-verify
    });

    const accessToken = generateAccessToken({ id: user._id, email: user.email, plan: user.plan });

    return successResponse(res, 201, 'Registered!', {
      user:  { id: user._id, name: user.name, email: user.email, plan: user.plan },
      accessToken,
    });
  } catch (err) {
    return errorResponse(res, err.statusCode || 500, err.message);
  }
});

// POST /api/v1/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return errorResponse(res, 400, 'email aur password dono chahiye');

    const user = await User.findOne({ email }).select('+password');
    if (!user) return errorResponse(res, 401, 'Invalid email or password');

    const isValid = await user.comparePassword(password);
    if (!isValid) return errorResponse(res, 401, 'Invalid email or password');

    const accessToken = generateAccessToken({ id: user._id, email: user.email, plan: user.plan });

    return successResponse(res, 200, 'Login successful', {
      user:  { id: user._id, name: user.name, email: user.email, plan: user.plan },
      accessToken,
    });
  } catch (err) {
    return errorResponse(res, err.statusCode || 500, err.message);
  }
});

// GET /api/v1/auth/me
const { protect } = require('../middlewares/auth.middleware');
router.get('/me', protect, async (req, res) => {
  return successResponse(res, 200, 'Profile', {
    id:    req.user._id,
    name:  req.user.name,
    email: req.user.email,
    plan:  req.user.plan,
  });
});

module.exports = router;
