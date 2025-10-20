const supabase = require('../config/supabaseClient');

class ItemModel {
  // Mendapatkan semua items atau filter berdasarkan status
  static async getAll(status = null) {
    try {
      let query = supabase
        .from('items')
        .select('*')
        .order('id', { ascending: true });
      
      if (status) {
        query = query.eq('status', status);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Mendapatkan item berdasarkan ID
  static async getById(id) {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Membuat item baru
  static async create(itemData) {
    try {
      const { data, error } = await supabase
        .from('items')
        .insert([itemData])
        .select();
      
      if (error) throw error;
      
      return { success: true, data: data[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update item berdasarkan ID
  static async update(id, updateData) {
    try {
      const { data, error } = await supabase
        .from('items')
        .update(updateData)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      return { success: true, data: data[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Hapus item berdasarkan ID
  static async delete(id) {
    try {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Cek apakah item exists
  static async exists(id) {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('id')
        .eq('id', id)
        .single();
      
      return !error && data !== null;
    } catch (error) {
      return false;
    }
  }
}

module.exports = ItemModel;