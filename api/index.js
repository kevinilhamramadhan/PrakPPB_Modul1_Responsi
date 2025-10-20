const express = require('express');
require('dotenv').config();

const itemRoutes = require('../src/routes/itemRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

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

app.use('/items', itemRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan server',
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

module.exports = app;