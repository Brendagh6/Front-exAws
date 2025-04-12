import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const UsuarioForm = ({ onSubmit }) => {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [passw, setPassw] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ nombre, correo, passw });
        setNombre("");
        setCorreo("");
        setPassw("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="row g-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        value={passw}
                        onChange={(e) => setPassw(e.target.value)}
                        required
                    />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Crear Usuario</button>
                </div>
            </div>
        </form>
    );
};

const UsuarioList = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usuariosPerPage = 5;

    useEffect(() => {
        axios.get("http://3.129.44.232:5000/usuarios/")
            .then(response => setUsuarios(response.data))
            .catch(error => console.error("Error al cargar usuarios:", error));
    }, []);

    const handleCreate = (newUser) => {
        axios.post("http://3.129.44.232:5000/usuarios/", newUser)
            .then(response => setUsuarios([...usuarios, response.data]))
            .catch(error => console.error("Error al crear usuario:", error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://3.129.44.232:5000/usuarios/${id}`)
            .then(() => setUsuarios(usuarios.filter(usuario => usuario.id_usuario !== id)))
            .catch(error => console.error("Error al eliminar usuario:", error));
    };

    const filteredUsuarios = usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.correo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUsuario = currentPage * usuariosPerPage;
    const indexOfFirstUsuario = indexOfLastUsuario - usuariosPerPage;
    const currentUsuarios = filteredUsuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);

    const nextPage = () => {
        if (indexOfLastUsuario < filteredUsuarios.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="main-container">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container-fluid">
                    <h2 className="text-white mb-0">Usuarios</h2>
                    <button onClick={() => navigate(-1)} className="btn btn-primary">Regresar</button>
                </div>
            </nav>

            {/* Contenido Principal */}
            <div className="container mt-4">
                <h1 className="text-center mb-4">REGISTRAR USUARIO</h1>
                <UsuarioForm onSubmit={handleCreate} />
                <h1 className="text-center mb-4">Lista de usuarios</h1>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="🔎Buscar usuario..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="table-responsive">

                    <table className="table table-striped table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsuarios.map((usuario) => (
                                <tr key={usuario.id_usuario}>
                                    <td>{usuario.id_usuario}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.correo}</td>
                                    <td>
                                        <Link
                                            to={`/useredit/${usuario.id_usuario}`}
                                            className="btn btn-primary btn-sm me-2"
                                        >
                                            <i className="bi bi-pencil"></i> Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(usuario.id_usuario)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            <i className="bi bi-trash"></i> Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-between mb-4">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="btn btn-secondary"
                    >
                        <i className="bi bi-arrow-left"></i> Anterior
                    </button>
                    <button
                        onClick={nextPage}
                        disabled={indexOfLastUsuario >= filteredUsuarios.length}
                        className="btn btn-secondary"
                    >
                        Siguiente <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>


        </div>
    );
};

export default UsuarioList;