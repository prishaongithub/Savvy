import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { useAuth } from '../context/authContext/useAuth';

function LogInPage() {
    const [showPass, setShowPass] = useState(false);
    const { error, login, isLoading, isAuthenticated, clearError } = useAuth();
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.currentTarget.name]: e.currentTarget.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(data);
    };

    if (isAuthenticated)
        return <Navigate to="/home" replace />;

    if (isLoading)
        return <Loader text="Logging in..." />;

    return (
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#121212', fontFamily: 'Arial, sans-serif', color: '#f5f5f5' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Savvy</h1>
            <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ textAlign: 'center', color: '#f5f5f5', marginBottom: '20px' }}>Log In</h2>
                <form onSubmit={(e) => handleSubmit(e)} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <div style={{ width: '100%', marginBottom: '15px' }}>
                        <label htmlFor="email" style={{ marginBottom: '5px', color: '#bbb' }}>Email:</label>
                        <input
                            name="email"
                            type="text"
                            onChange={handleInputChange}
                            value={data.email}
                            required
                            style={{ padding: '10px', border: '1px solid #444', borderRadius: '5px', width: 'calc(100% - 20px)', backgroundColor: '#333', color: '#f5f5f5' }}
                        />
                    </div>

                    <div style={{ position: 'relative', width: '100%', marginBottom: '15px' }}>
                        <label htmlFor="password" style={{ marginBottom: '5px', color: '#bbb' }}>Password:</label>
                        <input
                            name="password"
                            type={showPass ? "text" : "password"}
                            onChange={handleInputChange}
                            value={data.password}
                            required
                            style={{ padding: '10px', border: '1px solid #444', borderRadius: '5px', width: 'calc(100% - 20px)', backgroundColor: '#333', color: '#f5f5f5' }}
                        />
                        <i
                            className={`fas ${showPass ? "fa-eye" : "fa-eye-slash"}`}
                            onClick={() => setShowPass(!showPass)}
                            aria-label={showPass ? "Hide password" : "Show password"}
                            style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '35px', color: '#bbb' }}
                        ></i>
                    </div>

                    <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>

                    <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
                        Log In
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '10px', color: '#bbb' }}>
                    Don't have an account?
                    <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}> Register here</Link>
                </p>
            </div>
        </section>
    );
}

export { LogInPage };
