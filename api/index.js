const express = require('express');
require('dotenv').config();

const itemRoutes = require('../src/routes/itemRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'REST API Daftar Barang Cuci Sepatu',
    version: '1.0.0',
    status: 'Running on Vercel',
    endpoints: {
      'GET /items': 'Menampilkan seluruh daftar sepatu',
      'GET /items?status=': 'Filter sepatu berdasarkan status',
      'GET /items/:id': 'Menampilkan detail sepatu berdasarkan ID',
      'POST /items': 'Menambahkan data sepatu baru',
      'PUT /items/:id': 'Memperbarui status sepatu',
      'DELETE /items/:id': 'Menghapus data sepatu'
    }
  });
});

// API health check
app.get('/api', (req, res) => {
  res.json({
    status: 'OK',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/items', itemRoutes);

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
    path: req.path
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan server',
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

// Export untuk Vercel Serverless
module.exports = app;