import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';
import { Trash2 } from 'lucide-react';

export default function AdminExpenses() {
  

    const [expenses, setExpenses] = useState([]);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/admin/expenses`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExpenses(data.expenses || []);
        } catch {
            toast.error('Failed to fetch expenses');
        }
    };

    useEffect(() => { fetchExpenses(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/admin/expense/new`,
                { title, amount, category },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast('Expense added successfully!');
            setTitle('');
            setAmount('');
            setCategory('');
            fetchExpenses();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add expense');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${process.env.REACT_APP_API_URL}/admin/expense/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast('Expense deleted');
            fetchExpenses();
        } catch {
            toast.error('Failed to delete expense');
        }
    };

    const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

    return (
        <div className="sidebar-wrapper">
            <Sidebar />
            <main className="col-12 col-md-10 p-4">
                <h2>Expenses</h2>
                <hr />

                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add Expense</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Amount</label>
                                        <input type="number" step="0.01" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Category</label>
                                        <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Utilities, Marketing" required />
                                    </div>
                                    <button type="submit" className="btn w-100" disabled={loading} style={{ backgroundColor: '#febd69' }}>
                                        {loading ? 'Adding...' : 'Add Expense'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Summary</h5>
                                <p className="display-6" style={{ color: '#232f3e' }}>${total.toFixed(2)}</p>
                                <p className="text-muted">{expenses.length} expense{expenses.length !== 1 ? 's' : ''}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Expense List</h5>
                        <div className="table-responsive">
                            <table className="table table-hover" id="products_table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center text-muted py-3">No expenses added yet.</td>
                                        </tr>
                                    ) : (
                                        expenses.map((exp, i) => (
                                            <tr key={exp._id}>
                                                <td>{i + 1}</td>
                                                <td>{exp.title}</td>
                                                <td>{exp.category}</td>
                                                <td>${Number(exp.amount).toFixed(2)}</td>
                                                <td>{exp.createdAt ? new Date(exp.createdAt).toLocaleDateString() : '-'}</td>
                                                <td>
                                                    <button className="btn btn-sm" style={{ color: '#dc3545' }} onClick={() => handleDelete(exp._id)}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
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
