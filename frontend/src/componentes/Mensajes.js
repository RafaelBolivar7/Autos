import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

class Mensajes extends React.Component {
    state = {
        mensajes: []
    }

    componentWillMount() {
        this.getMensajes();
    }
    getMensajes = () => {
        axios.get("http://localhost:3000/api/message/all")
            .then(res => {
                console.log("Mensajes");
                console.log(res.data.doc);
                this.setState({
                    mensajes: res.data.doc
                });

            })
            .catch(error => {
                console.log(error);
            })
    }

    eliminarMensaje = (id) =>{
        axios.delete("http://localhost:3000/api/message/delete/"+id)
        .then(res=>{
            this.setState({
                status: "deleted"
            })
            //window.location.reload(true);
            swal(
                "Mensaje Eliminado", 
                "El mensaje se elimino correctamente",
                "success"
            )
            window.location.reload(true);
        })
    }
    render(){
        console.log(this.state.mensajes);
        return (
            <React.Fragment>
                <div className="container w-30 bg-light mt-3 roundedshadow">
                <h1 className="text-primary">Mensajes</h1>
                <Link to="/agregarMensaje" className="btn btn-outline-success m-3">Agregar Mensaje</Link>
                <table className="table table-light tabled-striped">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Mensaje</td>
                            <td>Cliente</td>
                            <td>Carro</td>
                            <td>Acciones</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.mensajes.map((mensaje) => {
                                return (
                                    <React.Fragment>
                                        <tr>
                                            <td>{mensaje._id}</td>
                                            <td>{mensaje.text}</td>
                                            <td>{mensaje.client.name}</td>
                                            <td>{mensaje.car.name}</td>
                                            <td>
                                                <Link to={"/editarMensaje/"+mensaje._id} className="btn btn-outline-warning">Editar</Link>
                                                <button className="btn btn-outline-danger ms-3"onClick={
                                                    ()=>{
                                                        this.eliminarMensaje(mensaje._id)
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

export default Mensajes;