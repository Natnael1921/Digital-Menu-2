// src/components/Admin/CategoryForm.jsx
import { useState } from 'react';
import axios from 'axios';

/**
 * Form for creating a new category with optional image upload.
 * Expects the backend API at /api/admin/categories and an upload endpoint at /api/upload.
 */
export default function CategoryForm({ onSuccess, existing = null, onCancel }) {
  const [name, setName] = useState(existing?.name || '');
  const [order, setOrder] = useState(existing?.order || 0);
  const [active, setActive] = useState(existing?.active ?? true);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = existing?.image || '';
      if (imageFile) {
        // upload image first
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadRes = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageUrl = uploadRes.data.url;
      }

      const payload = { name, order, active, image: imageUrl };
      if (existing) {
        // update existing category
        await axios.put(`/api/admin/categories/${existing._id}`, payload);
      } else {
        await axios.post('/api/admin/categories', payload);
      }
      onSuccess();
    } catch (err) {
      console.error('Category error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Order</label>
        <input
          type="number"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          className="w-full rounded border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          id="active"
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        <label htmlFor="active" className="text-sm">Active</label>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
        {existing?.image && !imageFile && (
          <p className="text-xs text-gray-500 mt-1">Current image will be kept.</p>
        )}
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
        >
          {existing ? 'Update' : 'Create'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
