import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

class Clientes extends React.Component {
    state = {
        clientes: []
    }

    componentWillMount() {
        this.getClientes();
    }
    getClientes = () => {
        axios.get("http://localhost:3000/api/client/all")
            .then(res => {
                console.log("Clientes");
                console.log(res.data.doc);
                this.setState({
                    clientes: res.data.doc
                });

            })
            .catch(error => {
                console.log(error);
            })
    }

    eliminarCliente = (id) =>{
        axios.delete("http://localhost:3000/api/client/delete/"+id)
        .then(res=>{
            this.setState({
                status: "deleted"
            })
            //window.location.reload(true);
            swal(
                "Cliente Eliminado", 
                "El cliente se elimino correctamente",
                "success"
            )
            window.location.reload(true);
        })
    }
    render(){
        console.log(this.state.clientes);
        return (
            <React.Fragment>
                 <div className="container w-30 bg-light mt-3 roundedshadow">
                <h1 className="text-primary">Clientes</h1>
                <Link to="/agregarCliente" className="btn btn-outline-success m-3">Agregar Cliente</Link>
                <table className="table table-light table-striped">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Nombre</td>
                            <td>Edad</td>
                            <td>Correo</td>
                            <td>Contraseña</td>
                            <td>Acciones</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.clientes.map((cliente) => {
                                return (
                                    <React.Fragment>
                                        <tr>
                                            <td>{cliente._id}</td>
                                            <td>{cliente.name}</td>
                                            <td>{cliente.age}</td>
                                            <td>{cliente.email}</td>
                                            <td>{cliente.password}</td>
                                            <td>
                                                <Link to={"/editarCliente/"+cliente._id} className="btn btn-outline-warning">Editar</Link>
                                                <button className="btn btn-outline-danger ms-3"onClick={
                                                    ()=>{
                                                        this.eliminarCliente(cliente._id)
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
                </div>
            </React.Fragment>
        );
    }
}

export default Clientes;