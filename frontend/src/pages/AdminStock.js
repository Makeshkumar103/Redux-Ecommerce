import { useState, useEffect } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';
import { Save } from 'lucide-react';
export default function AdminStock() {
   

    const [products, setProducts] = useState([]);
    const [edits, setEdits] = useState({});
    const [saving, setSaving] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
                setProducts(data.products || []);
            } catch {
                toast.error('Failed to fetch products');
            }
        };
        fetchProducts();
    }, []);

    const handleStockChange = (id, value) => {
        setEdits((prev) => ({ ...prev, [id]: value }));
    };

    const handleSave = async (id) => {
        const newStock = edits[id];
        if (newStock === undefined || newStock === '') return;
        setSaving(id);
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${process.env.REACT_APP_API_URL}/admin/product/${id}`,
                { stock: newStock },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast('Stock updated!');
            setEdits((prev) => {
                const copy = { ...prev };
                delete copy[id];
                return copy;
            });
            setProducts((prev) =>
                prev.map((p) => (p._id === id ? { ...p, stock: newStock } : p))
            );
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update stock');
        } finally {
            setSaving(null);
        }
    };

    return (
        <div className="sidebar-wrapper">
           <Sidebar />
            <main className="col-12 col-md-10 p-4">
                <h2>Stock Management</h2>
                <hr />

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Product Stock</h5>
                        <div className="table-responsive">
                            <table className="table table-hover" id="products_table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Current Stock</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center text-muted py-3">No products found.</td>
                                        </tr>
                                    ) : (
                                        products.map((p, i) => {
                                            const edited = edits[p._id] !== undefined;
                                            const displayStock = edited ? edits[p._id] : p.stock;
                                            return (
                                                <tr key={p._id}>
                                                    <td>{i + 1}</td>
                                                    <td>{p.name}</td>
                                                    <td>{p.category}</td>
                                                    <td>${p.price}</td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className={`form-control form-control-sm ${edited ? 'border-warning' : ''}`}
                                                            style={{ width: '100px' }}
                                                            value={displayStock}
                                                            onChange={(e) => handleStockChange(p._id, e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        {edited && (
                                                            <button
                                                                className="btn btn-sm"
                                                                style={{ backgroundColor: '#febd69', color: '#232f3e' }}
                                                                disabled={saving === p._id}
                                                                onClick={() => handleSave(p._id)}
                                                            >
                                                                <Save size={16} className="me-1" />
                                                                {saving === p._id ? 'Saving...' : 'Save'}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
