# YouTube Connect Test Project
# Real TubeOS code — sirf YouTube OAuth isolate karke test karna

## Structure

```
yt-connect-test/
├── backend/
│   ├── server.js                          ← Entry point
│   ├── package.json
│   ├── .env                               ← Apni values daalo
│   └── src/
│       ├── app.js                         ← Express (sirf auth + youtube routes)
│       ├── config/
│       │   ├── env.js                     ← Config validation
│       │   ├── db.js                      ← MongoDB connect
│       │   ├── redis.js                   ← Redis (Upstash) — REAL FILE
│       │   └── youtube.config.js          ← OAuth helpers — REAL FILE
│       ├── controllers/
│       │   └── youtube.controller.js      ← REAL FILE
│       ├── routes/
│       │   ├── auth.routes.js             ← Minimal (register/login)
│       │   └── youtube.routes.js          ← REAL FILE
│       ├── services/
│       │   └── youtube.service.js         ← REAL FILE
│       ├── models/
│       │   ├── user.model.js              ← REAL FILE
│       │   └── youtube-channel.model.js   ← REAL FILE
│       ├── middlewares/
│       │   ├── auth.middleware.js         ← REAL FILE
│       │   └── rateLimiter.middleware.js  ← REAL FILE
│       └── utils/
│           ├── jwt.utils.js               ← REAL FILE
│           └── response.utils.js          ← REAL FILE
│
└── frontend/
    └── index.html                         ← Complete test UI (vanilla JS)
```

---

## Setup — 5 Steps

### Step 1: .env fill karo

`backend/.env` mein ye values daalo:

```env
MONGODB_URI=mongodb+srv://...     # Real ya test DB
JWT_ACCESS_SECRET=koi_bhi_64_char_string
REDIS_URL=rediss://:pass@host.upstash.io:6379
CLIENT_URL=http://localhost:3000
YOUTUBE_CLIENT_ID=xxx.apps.googleusercontent.com
YOUTUBE_CLIENT_SECRET=GOCSPX-xxx
YOUTUBE_REDIRECT_URI=http://localhost:5000/api/v1/youtube/callback
```

### Step 2: Google Console mein add karo

Authorized JavaScript Origins:
```
http://localhost:3000
```

Authorized Redirect URIs:
```
http://localhost:5000/api/v1/youtube/callback
```

### Step 3: Backend chalao

```bash
cd backend
npm install
node server.js
# ✅ http://localhost:5000
```

### Step 4: Frontend chalao

```bash
cd frontend
npx serve . -p 3000
# http://localhost:3000
```

### Step 5: Test karo

1. **Register** — naam, email, password daalo → Register button
2. **Connect YouTube** — "Connect YouTube Channel" button click karo
3. **Google popup** — apna account choose karo, allow karo
4. **Done** — channel neeche dikhega stats ke saath

---

## Ye test confirm karta hai

- [x] Backend server sahi chal raha hai
- [x] MongoDB connect ho raha hai
- [x] Redis (OAuth state) kaam kar raha hai
- [x] JWT auth middleware sahi hai
- [x] YouTube OAuth URL generate ho raha hai
- [x] Google callback handle ho raha hai
- [x] Channel DB mein save ho raha hai
- [x] Channels fetch ho rahi hain

Sab pass hone ke baad real project mein same code integrate karo — wahan sirf routes/index.js mein youtube routes already hain.

---

## Real project se farq kya hai?

| Real Project | Test Project |
|---|---|
| Email verification required | Auto-verified |
| Redis BullMQ workers | Nahi hai |
| Full auth (OTP, forgot password) | Sirf login/register |
| Video/Analytics/AI routes | Nahi hain |
| Har cheez | Sirf YouTube OAuth |
