import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AdminNewProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [seller, setSeller] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/product/new`,
        { name, price, description, category, seller, stock, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast('Product created successfully!');
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setSeller('');
      setStock('');
      setImageUrl('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container container-fluid mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" step="0.01" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Seller</label>
          <input type="text" className="form-control" value={seller} onChange={(e) => setSeller(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL (Cloudinary)</label>
          <input type="url" className="form-control" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://res.cloudinary.com/..." required />
        </div>
        <button type="submit" className="btn w-100" disabled={loading} style={{ backgroundColor: '#febd69' }}>
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}