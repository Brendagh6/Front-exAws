import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const UsuarioForm = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        nombre: "",
        correo: "",
        passw: "",
    });

    const [errores, setErrores] = useState({
        nombre: "",
        correo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "nombre" && /[^a-zA-Z\s]/.test(value)) {
            setErrores(prev => ({ ...prev, nombre: "Solo se permiten letras y espacios" }));
        } else {
            setErrores(prev => ({ ...prev, nombre: "" }));
        }

        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(errores).some(error => error)) {
            alert("Corrige los errores antes de continuar");
            return;
        }

        try {
            await axios.post("http://3.129.44.232:5000/usuarios/", usuario);
            alert("Usuario creado");
            navigate("/login");
        } catch (error) {
            console.error("Error al crear usuario:", error);
            alert("Error al crear usuario. Intenta de nuevo.");
        }
    };

    return (
        <div className="main-container">
            {/* Navbar */}
            <nav className="navbar navbar-dark bg-dark p-3">
                <div className="container-fluid">
                    <h2 className="text-white mb-0">Crear Usuario</h2>
                    <button onClick={() => navigate("/")} className="btn btn-secondary">Salir</button>
                </div>
            </nav>

            {/* Formulario Centrado */}
            <div className="content-container d-flex align-items-center justify-content-center min-vh-100">
                <form onSubmit={handleSubmit} className="card p-4 shadow w-100" style={{ maxWidth: "400px" }}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={usuario.nombre}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                        {errores.nombre && <p className="text-danger">{errores.nombre}</p>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo"
                            value={usuario.correo}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                        {errores.correo && <p className="text-danger">{errores.correo}</p>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            name="passw"
                            placeholder="Contraseña"
                            value={usuario.passw}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Crear Usuario</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UsuarioForm;