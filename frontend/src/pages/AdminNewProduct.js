import { useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

export default function AdminNewProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [seller, setSeller] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error('Please select an image');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('image', image);
      const uploadRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );

      await axios.post(
        `${process.env.REACT_APP_API_URL}/product/new`,
        { name, price, description, category, seller, stock, imageUrl: uploadRes.data.url },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast('Product created successfully!');
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setSeller('');
      setStock('');
      setImage(null);
      setImagePreview('');
      if (fileRef.current) fileRef.current.value = '';
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sidebar-wrapper">
               <Sidebar />
                <main className="col-12 col-md-10 p-4">
                    <h2>Add Product</h2>
                    <hr />
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
                            <label className="form-label">Product Image</label>
                            <input type="file" className="form-control" accept="image/*" ref={fileRef} onChange={handleImageChange} required />
                            {imagePreview && (
                              <img src={imagePreview} alt="Preview" className="mt-2" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
                            )}
                          </div>
                          <button type="submit" className="btn w-100" disabled={loading} style={{ backgroundColor: '#febd69' }}>
                            {loading ? 'Uploading & Creating...' : 'Create Product'}
                          </button>
                        </form>
                      </div>
                </main>
            </div>
    
  );
}