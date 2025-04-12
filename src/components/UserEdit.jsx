import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const UsuarioEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        nombre: "",
        correo: "",
        passw: ""
    });
    const [errores, setErrores] = useState({
        nombre: "",
        correo: ""
    });

    useEffect(() => {
        axios.get(`http://3.129.44.232:5000/usuarios/${id}`)
            .then(response => setUsuario(response.data))
            .catch(error => {
                console.error("Error al cargar usuario:", error);
                alert("No se pudo cargar el usuario.");
                navigate("/userlist");
            });
    }, [id, navigate]);

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
            await axios.put(`http://3.129.44.232:5000/usuarios/${id}`, usuario);
            alert("Usuario actualizado");
            navigate("/users");
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            alert("Error al actualizar usuario. Intenta de nuevo.");
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex flex-column bg-light p-0">
            {/* Navbar */}
            <nav className="navbar navbar-dark bg-dark p-3">
                <div className="container-fluid">
                    <h2 className="text-white mb-0">Editar Usuario</h2>
                    <Link to="/userlist" className="btn btn-secondary">Regresar</Link>
                </div>
            </nav>

            {/* Formulario Centrado */}
            <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
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
                        <button type="submit" className="btn btn-primary">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UsuarioEdit;