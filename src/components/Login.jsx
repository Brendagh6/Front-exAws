// src/components/Login.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cowork from '../assets/cowork.png';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({ correo: '', passw: '' });
    const [error, setError] = useState('');
    const [intentos, setIntentos] = useState(0);
    const [bloqueado, setBloqueado] = useState(false);

    useEffect(() => {
        const intentosFallidos = localStorage.getItem('intentosFallidos') || 0;
        const bloqueoTiempo = localStorage.getItem('bloqueoTiempo');
        if (bloqueoTiempo && new Date().getTime() < bloqueoTiempo) {
            setBloqueado(true);
            const tiempoRestante = bloqueoTiempo - new Date().getTime();
            setTimeout(() => {
                setBloqueado(false);
                localStorage.removeItem('bloqueoTiempo');
                localStorage.setItem('intentosFallidos', '0');
            }, tiempoRestante);
        } else {
            setIntentos(parseInt(intentosFallidos));
        }
    }, []);

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (bloqueado) return;

        try {
            const response = await axios.post('https://3.129.44.232:5000/usuarios/login', usuario);
            const { user, access_token } = response.data;

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            localStorage.setItem('usuario', JSON.stringify(user));
            localStorage.setItem('token', access_token);
            setError('');
            localStorage.setItem('intentosFallidos', '0');
            navigate('/credencial');
        } catch (error) {
            console.error('Error en la solicitud:', error.response?.data || error.message);
            setError('Credenciales incorrectas. Inténtalo de nuevo.');
        }
    };

    return (
        
        <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <img src={cowork} alt="Logo" className="img-fluid mb-4" style={{ maxHeight: '300px' }} />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo"
                            onChange={handleChange}
                            className="form-control"
                            required
                            disabled={bloqueado}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            name="passw"
                            placeholder="Contraseña"
                            onChange={handleChange}
                            className="form-control"
                            required
                            disabled={bloqueado}
                        />
                    </div>
                    {error && <p className="text-danger text-center">{error}</p>}
                    {bloqueado && <p className="text-danger text-center">Demasiados intentos fallidos. Intenta nuevamente en 3 minutos.</p>}
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary" disabled={bloqueado}>
                            Iniciar sesión
                        </button>
                        <Link to="/form" className="btn btn-secondary" disabled={bloqueado}>
                            Regístrate
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;