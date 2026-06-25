import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../store/adminSlice';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

export default function AdminNewProduct() {
  const dispatch = useDispatch();
  const { productCreating } = useSelector((state) => state.admin);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [seller, setSeller] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
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
    try {
      await dispatch(createProduct({ name, price, description, category, seller, stock, image })).unwrap();
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
    } catch (err) {
      toast.error(err || 'Failed to create product');
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
                          <button type="submit" className="btn w-100" disabled={productCreating} style={{ backgroundColor: '#febd69' }}>
                                                            {productCreating ? 'Uploading & Creating...' : 'Create Product'}
                          </button>
                        </form>
                      </div>
                </main>
            </div>
    
  );
}