const ItemModel = require('../models/itemModel');

class ItemController {
  // GET /items - Mendapatkan semua items atau filter
  static async getAllItems(req, res) {
    try {
      const { status } = req.query;
      
      const result = await ItemModel.getAll(status);
      
      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: 'Gagal mengambil data',
          error: result.error
        });
      }
      
      res.json({
        success: true,
        count: result.data.length,
        data: result.data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server',
        error: error.message
      });
    }
  }

  // GET /items/:id - Mendapatkan item berdasarkan ID
  static async getItemById(req, res) {
    try {
      const { id } = req.params;
      
      const result = await ItemModel.getById(id);
      
      if (!result.success) {
        return res.status(404).json({
          success: false,
          message: 'Data sepatu tidak ditemukan'
        });
      }
      
      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server',
        error: error.message
      });
    }
  }

  // POST /items - Membuat item baru
  static async createItem(req, res) {
    try {
      const { nama, status, tanggalMasuk, tanggalSelesai } = req.body;
      
      // Validasi input
      if (!nama || !status || !tanggalMasuk) {
        return res.status(400).json({
          success: false,
          message: 'Data tidak lengkap. Field nama, status, dan tanggalMasuk wajib diisi.'
        });
      }
      
      const itemData = {
        nama,
        status,
        tanggalMasuk,
        tanggalSelesai: tanggalSelesai || '-'
      };
      
      const result = await ItemModel.create(itemData);
      
      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: 'Gagal menambahkan data',
          error: result.error
        });
      }
      
      res.status(201).json({
        success: true,
        message: 'Data sepatu berhasil ditambahkan',
        data: result.data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server',
        error: error.message
      });
    }
  }

  // PUT /items/:id - Update item
  static async updateItem(req, res) {
    try {
      const { id } = req.params;
      const { nama, status, tanggalSelesai } = req.body;
      
      // Cek apakah item ada
      const exists = await ItemModel.exists(id);
      if (!exists) {
        return res.status(404).json({
          success: false,
          message: 'Data sepatu tidak ditemukan'
        });
      }
      
      // Prepare update data
      const updateData = {};
      if (nama) updateData.nama = nama;
      if (status) updateData.status = status;
      if (tanggalSelesai) updateData.tanggalSelesai = tanggalSelesai;
      
      const result = await ItemModel.update(id, updateData);
      
      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: 'Gagal memperbarui data',
          error: result.error
        });
      }
      
      res.json({
        success: true,
        message: 'Status sepatu berhasil diperbarui',
        data: result.data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server',
        error: error.message
      });
    }
  }

  // DELETE /items/:id - Hapus item
  static async deleteItem(req, res) {
    try {
      const { id } = req.params;
      
      // Cek apakah item ada
      const exists = await ItemModel.exists(id);
      if (!exists) {
        return res.status(404).json({
          success: false,
          message: 'Data sepatu tidak ditemukan'
        });
      }
      
      const result = await ItemModel.delete(id);
      
      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: 'Gagal menghapus data',
          error: result.error
        });
      }
      
      res.json({
        success: true,
        message: 'Data sepatu berhasil dihapus'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server',
        error: error.message
      });
    }
  }
}

module.exports = ItemController;