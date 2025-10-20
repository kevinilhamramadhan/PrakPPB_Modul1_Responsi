const express = require('express');
require('dotenv').config();

const itemRoutes = require('./src/routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'REST API Daftar Barang Cuci Sepatu',
    version: '1.0.0',
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

// Routes
app.use('/items', itemRoutes);

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan server',
    error: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;