import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

class Admins extends React.Component {
    state = {
        admins: []
    }

    componentWillMount() {
        this.getAdmins();
    }
    getAdmins = () => {
        axios.get("http://localhost:3000/api/admin/all")
            .then(res => {
                console.log("Administradores");
                console.log(res.data.doc);
                this.setState({
                    admins: res.data.doc
                });

            })
            .catch(error => {
                console.log(error);
            })
    }

    eliminarAdmin = (id) =>{
        axios.delete("http://localhost:3000/api/admin/delete/"+id)
        .then(res=>{
            this.setState({
                status: "deleted"
            })
            //window.location.reload(true);
            swal(
                "Administrador Eliminado", 
                "El administrador se elimino correctamente",
                "success"
            )
            window.location.reload(true);
        })
    }
    render(){
        console.log(this.state.admins);
        return (
            <React.Fragment>
                <h1>Administradores</h1>
                <Link to="/agregarAdmin" className="btn btn-dark">Agregar Administrador</Link>
                <table className="table table-light">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Nombre</td>
                            <td>Correo</td>
                            <td>Contraseña</td>
                            <td>Acciones</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.admins.map((admin) => {
                                return (
                                    <React.Fragment>
                                        <tr>
                                            <td>{admin._id}</td>
                                            <td>{admin.name}</td>
                                            <td>{admin.email}</td>
                                            <td>{admin.password}</td>
                                            <td>
                                                <Link to={"/editarAdmin/"+admin._id} className="btn btn-outline-warning">Editar</Link>
                                                <button className="btn btn-outline-danger ms-3"onClick={
                                                    ()=>{
                                                        this.eliminarAdmin(admin._id)
                                                    }
                                                }>
                                                    Eliminar</button>
                                            </td>

                                        </tr>
                                    </React.Fragment>
                                );
                            })
                        }
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default Admins;