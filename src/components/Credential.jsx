// src/components/Credential.jsx
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Credential = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('usuario'));

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="container mt-5 text-center">
            <h2>Bienvenido, {user?.correo}</h2>
            <p>Has iniciado sesión correctamente.</p>
            <button className="btn btn-primary me-2" onClick={() => navigate('/users')}>
                Ver Usuarios
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
                Cerrar Sesión
            </button>
        </div>
    );
};

export default Credential;