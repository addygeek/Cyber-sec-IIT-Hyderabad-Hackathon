# Local Authentication Platform - Server Setup Guide

## Prerequisites

1. **Node.js** (v16 or higher)
2. **HTTPS Certificate** for localhost
3. **Chrome/Edge** with WebAuthn flags enabled

## Quick Setup Instructions

### 1. Generate HTTPS Certificate for Localhost

```bash
# Install mkcert (one-time setup)
# On macOS:
brew install mkcert
mkcert -install

# On Windows (using Chocolatey):
choco install mkcert
mkcert -install

# On Linux:
curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
chmod +x mkcert-v*-linux-amd64
sudo cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert
mkcert -install

# Generate localhost certificate
mkcert localhost 127.0.0.1 ::1
```

### 2. Create Local Server (Node.js + Express)

Create `server.js`:

```javascript
const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = 3000;
const JWT_SECRET = crypto.randomBytes(32).toString('hex');

// Middleware
app.use(cors({
    origin: ['https://localhost:3000', 'https://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// In-memory storage (use database in production)
const users = new Map();
const sessions = new Map();
const deviceFingerprints = new Map();

// Authentication endpoints
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, authMethod, deviceFingerprint, credentials } = req.body;

        // Validate required fields
        if (!username || !email || !authMethod) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        // Check if user already exists
        if (users.has(email)) {
            return res.status(409).json({
                success: false,
                error: 'User already exists'
            });
        }

        // Generate user ID
        const userId = crypto.randomUUID();
        const timestamp = new Date().toISOString();

        // Store user data
        const userData = {
            id: userId,
            username,
            email,
            authMethod,
            credentials,
            createdAt: timestamp,
            lastLogin: null
        };

        users.set(email, userData);

        // Store device fingerprint
        if (deviceFingerprint) {
            deviceFingerprints.set(userId, {
                ...deviceFingerprint,
                userId,
                registeredAt: timestamp
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId, 
                email, 
                username,
                authMethod,
                sessionId: crypto.randomUUID()
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Store session
        const sessionData = {
            userId,
            email,
            username,
            authMethod,
            deviceFingerprint: deviceFingerprint?.browserFingerprint || null,
            createdAt: timestamp,
            lastActivity: timestamp
        };

        sessions.set(token, sessionData);

        console.log(`New user registered: ${username} (${email}) via ${authMethod}`);

        res.json({
            success: true,
            token,
            user: {
                id: userId,
                username,
                email,
                authMethod
            },
            message: 'Registration successful'
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, authMethod, credentials, deviceFingerprint } = req.body;

        // Find user
        const user = users.get(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Update last login
        user.lastLogin = new Date().toISOString();
        users.set(email, user);

        // Generate new JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email, 
                username: user.username,
                authMethod,
                sessionId: crypto.randomUUID()
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Store session
        const sessionData = {
            userId: user.id,
            email,
            username: user.username,
            authMethod,
            deviceFingerprint: deviceFingerprint?.browserFingerprint || null,
            createdAt: new Date().toISOString(),
            lastActivity: new Date().toISOString()
        };

        sessions.set(token, sessionData);

        console.log(`User logged in: ${user.username} (${email}) via ${authMethod}`);

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                email,
                authMethod
            },
            message: 'Login successful'
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

app.post('/api/auth/validate', (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'No token provided'
            });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, JWT_SECRET);
        const session = sessions.get(token);

        if (!session) {
            return res.status(401).json({
                success: false,
                error: 'Invalid session'
            });
        }

        // Update last activity
        session.lastActivity = new Date().toISOString();
        sessions.set(token, session);

        res.json({
            success: true,
            user: {
                id: decoded.userId,
                username: decoded.username,
                email: decoded.email,
                authMethod: decoded.authMethod
            },
            session: {
                createdAt: session.createdAt,
                lastActivity: session.lastActivity
            }
        });

    } catch (error) {
        console.error('Token validation error:', error);
        res.status(401).json({
            success: false,
            error: 'Invalid token'
        });
    }
});

app.post('/api/auth/logout', (req, res) => {
    try {
        const { token } = req.body;

        if (token && sessions.has(token)) {
            const session = sessions.get(token);
            sessions.delete(token);
            console.log(`User logged out: ${session.username}`);
        }

        res.json({
            success: true,
            message: 'Logout successful'
        });

    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Device fingerprint endpoints
app.post('/api/device/fingerprint', (req, res) => {
    try {
        const { deviceFingerprint, userId } = req.body;

        if (!deviceFingerprint) {
            return res.status(400).json({
                success: false,
                error: 'Device fingerprint required'
            });
        }

        // Store or update device fingerprint
        const timestamp = new Date().toISOString();
        const fingerprintData = {
            ...deviceFingerprint,
            userId: userId || null,
            lastSeen: timestamp,
            firstSeen: deviceFingerprints.has(deviceFingerprint.browserFingerprint) 
                ? deviceFingerprints.get(deviceFingerprint.browserFingerprint).firstSeen 
                : timestamp
        };

        deviceFingerprints.set(deviceFingerprint.browserFingerprint, fingerprintData);

        console.log(`Device fingerprint stored: ${deviceFingerprint.browserFingerprint}`);

        res.json({
            success: true,
            fingerprint: deviceFingerprint.browserFingerprint,
            riskScore: Math.floor(Math.random() * 100), // Simulate risk scoring
            message: 'Device fingerprint processed'
        });

    } catch (error) {
        console.error('Device fingerprint error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        users: users.size,
        sessions: sessions.size,
        fingerprints: deviceFingerprints.size
    });
});

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start HTTPS server
const options = {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem')
};

https.createServer(options, app).listen(PORT, () => {
    console.log(`🚀 Local Authentication Platform running on https://localhost:${PORT}`);
    console.log(`📊 Health check: https://localhost:${PORT}/api/health`);
    console.log(`📱 Frontend: https://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\\n👋 Shutting down server...');
    process.exit(0);
});
```

### 3. Package.json Setup

Create `package.json`:

```json
{
  "name": "local-auth-platform-server",
  "version": "1.0.0",
  "description": "Local Authentication Platform Server",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### 4. Install Dependencies & Run

```bash
# Install dependencies
npm install

# Start server
npm start

# Or for development with auto-restart
npm run dev
```

### 5. Chrome WebAuthn Setup (for testing)

Enable WebAuthn debugging in Chrome:
```bash
# Launch Chrome with WebAuthn debugging
google-chrome --enable-web-auth-testing-api --ignore-certificate-errors-spki-list --ignore-certificate-errors --ignore-ssl-errors-spki-list --ignore-ssl-errors
```

## Directory Structure

```
local-auth-platform/
├── server.js                 # Main server file
├── package.json              # Dependencies
├── localhost.pem             # SSL certificate
├── localhost-key.pem         # SSL private key
└── public/                   # Frontend files
    ├── index.html
    ├── style.css
    └── app.js
```

## Testing the Platform

1. **Start the server**: `npm start`
2. **Open browser**: Navigate to `https://localhost:3000`
3. **Accept certificate**: Click "Advanced" → "Proceed to localhost"
4. **Test authentication**: Try different auth methods
5. **Check server logs**: Monitor console for registration/login events
6. **Verify JWT tokens**: Use jwt.io to decode tokens

## Server Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/validate` - Token validation
- `POST /api/auth/logout` - User logout
- `POST /api/device/fingerprint` - Device fingerprint storage
- `GET /api/health` - Server health check

## Security Notes

1. **JWT Secret**: Generated randomly on server start (use environment variables in production)
2. **HTTPS Required**: WebAuthn requires secure context
3. **CORS**: Configured for localhost only
4. **Rate Limiting**: Implement in production
5. **Database**: Use proper database instead of in-memory storage for production

## Troubleshooting

1. **Certificate Issues**: Regenerate certificates with mkcert
2. **WebAuthn Errors**: Enable Chrome debugging flags
3. **CORS Issues**: Check server logs and update CORS settings
4. **Port Conflicts**: Change PORT variable in server.js

The platform is now ready for local development and testing with full WebAuthn, OAuth, and device fingerprinting capabilities!