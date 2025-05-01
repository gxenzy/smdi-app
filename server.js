const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const electricalSystemRoutes = require('./routes/electricalSystem');
const energyMonitoringRoutes = require('./routes/energyMonitoring');
const activityLogRoutes = require('./routes/activityLogs');
const energyMonitor = require('./services/energyMonitor');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'smdi', // your MySQL username
  password: 'SMD1SQLADM1N', // your MySQL password
  database: 'smdidb' // the name of your database
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Initialize energy monitoring service
energyMonitor.initialize()
  .then(() => console.log('Energy monitoring service initialized'))
  .catch(err => console.error('Error initializing energy monitoring service:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Energy Monitoring API');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/electrical-system', electricalSystemRoutes);
app.use('/api/energy-monitoring', energyMonitoringRoutes);
app.use('/api/activity-logs', activityLogRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    services: {
      database: db.state === 'connected' ? 'connected' : 'disconnected',
      energyMonitoring: energyMonitor.monitoringInterval ? 'active' : 'inactive',
      websocket: {
        status: 'active',
        connectedClients: energyMonitor.getConnectedClientsCount()
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// WebSocket error handling
energyMonitor.wss?.on('error', (error) => {
  console.error('WebSocket server error:', error);
});

// Graceful shutdown
const gracefulShutdown = () => {
  console.log('Received shutdown signal');
  
  // Stop energy monitoring
  energyMonitor.stopMonitoring();
  
  // Close WebSocket server
  energyMonitor.wss?.close(() => {
    console.log('WebSocket server closed');
  });
  
  // Close MySQL connection
  db.end(err => {
    if (err) {
      console.error('Error closing MySQL connection:', err);
    } else {
      console.log('MySQL connection closed');
    }
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
