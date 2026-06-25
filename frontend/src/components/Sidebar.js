import { useState, useRef, useEffect } from "react";

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { House, PackageCheck, PackagePlus, PackageSearch } from 'lucide-react';
import { logout } from "../store/authSlice";
import { User } from "lucide-react";



export default function Sidebar() {
     const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
     const navItems = [
        { to: "/admin/dashboard", label: "Dashboard", icon: House },
        { to: "/admin/newproduct", label: "+ New Product", icon: PackagePlus },
        { to: "/admin/stock", label: "Stock", icon: PackageSearch },
        { to: "/admin/orders", label: "Expence", icon: PackageCheck },
    ];

    return (
        <nav id="sidebar" className="col-12 col-md-2 p-0 d-flex flex-column" style={{ minWidth: 'auto', maxWidth: 'none' }}>
            <div className="navbar-brand m-4">
                {/* <Link to="/"> */}
                    <img width="150px" src="/images/logo.png" alt="logo-image" />
                {/* </Link> */}
            </div>    
            <ul className="list-unstyled components p-3">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <li key={to}>
                            <Link to={to} className="d-flex align-items-center py-2 px-3" style={{ color: '#febd69', fontWeight: 'bold', textDecoration: 'none', borderRadius: '0.3rem' }}>
                                <Icon size={20} className="me-2" />
                                {label}
                            </Link>
                        </li>
                    ))}
            </ul>
            <div className="dropdown mt-auto p-3" ref={dropdownRef}>
                <button
                    className="btn user-dropdown-toggle"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <User />
                    <span className="user-role-badge">{user?.role === 'admin' ? 'Admin' : 'User'}</span>
                </button>
                <div className={`dropdown-menu dropdown-menu-end${dropdownOpen ? ' show' : ''}`}>
                    <Link
                        to="/profile"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                    >
                        Profile
                    </Link>
                    <button
                        className="dropdown-item"
                        onClick={() => {
                        setDropdownOpen(false);
                        dispatch(logout());
                        navigate('/login');
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
            </nav>
    )
}