import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { useAuth } from '../context/authContext/useAuth';

function RegisterPage() {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const { error, register, isLoading, isAuthenticated } = useAuth();
    const [data, setData] = useState({
        username: "",
        fullname: "",
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(data);
        navigate("/login");
    }

    if (isAuthenticated)
        return <Navigate to="/home" replace />;

    if (isLoading)
        return <Loader text="Registering User..." />;

    return (
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#121212', fontFamily: 'Arial, sans-serif', color: '#f5f5f5' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Savvy</h1>
            <div style={{ background: '#2e2e2e', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', width: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ textAlign: 'center', color: '#f5f5f5', marginBottom: '10px' }}>Sign Up</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <div style={{ width: '100%', marginBottom: '10px' }}>
                        <label htmlFor="fullnameField" style={{ marginBottom: '5px', color: '#bbb' }}>Full Name:</label>
                        <input
                            type="text"
                            id="fullnameField"
                            name="fullname"
                            onChange={handleInputChange}
                            value={data.fullname}
                            required
                            style={{ padding: '10px', border: '1px solid #444', borderRadius: '5px', width: 'calc(100% - 20px)', backgroundColor: '#333', color: '#f5f5f5' }}
                        />
                    </div>

                    <div style={{ width: '100%', marginBottom: '10px' }}>
                        <label htmlFor="emailField" style={{ marginBottom: '5px', color: '#bbb' }}>Email:</label>
                        <input
                            type="email"
                            id="emailField"
                            name="email"
                            onChange={handleInputChange}
                            value={data.email}
                            required
                            style={{ padding: '10px', border: '1px solid #444', borderRadius: '5px', width: 'calc(100% - 20px)', backgroundColor: '#333', color: '#f5f5f5' }}
                        />
                    </div>

                    <div style={{ position: 'relative', width: '100%', marginBottom: '10px' }}>
                        <label htmlFor="passwordField" style={{ marginBottom: '5px', color: '#bbb' }}>Password:</label>
                        <input
                            type={showPass ? "text" : "password"}
                            id="passwordField"
                            name="password"
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
                        Register
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '10px', color: '#bbb' }}>
                    Have already an account?
                    <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}> Login here</Link>
                </p>
            </div>
        </section>
    );
}

export { RegisterPage };
