import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

class Reservaciones extends React.Component {
    state = {
        reservaciones: []
    }

    componentWillMount() {
        this.getReservaciones();
    }
    getReservaciones = () => {
        axios.get("http://localhost:3000/api/reservation/all")
            .then(res => {
                console.log("Reservaciones");
                console.log(res.data.reservations);
                this.setState({
                    reservaciones: res.data.reservations
                });

            })
            .catch(error => {
                console.log(error);
            })
    }

    eliminarReservacion = (id) =>{
        axios.delete("http://localhost:3000/api/reservation/delete/"+id)
        .then(res=>{
            this.setState({
                status: "deleted"
            })
            //window.location.reload(true);
            swal(
                "Reservacion Eliminado", 
                "La reservación se elimino correctamente",
                "success"
            )
            window.location.reload(true);
        })
    }
    render(){
        console.log(this.state.reservaciones);
        return (
            <React.Fragment>
                <h1>Reservaciones</h1>
                <Link to="/agregarReservacion" className="btn btn-dark">Agregar Reservación</Link>
                <table className="table table-light">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Fecha Inicio</td>
                            <td>Fecha Fin</td>
                            <td>Estado</td>
                            <td>Cliente</td>
                            <td>Carro</td>
                            <td>Acciones</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.reservaciones.map((reservacion) => {
                                return (
                                    <React.Fragment>
                                        <tr>
                                            <td>{reservacion._id}</td>
                                            <td>{reservacion.start_date}</td>
                                            <td>{reservacion.end_date}</td>
                                            <td>{reservacion.status}</td>
                                            <td>{reservacion.client.name}</td>
                                            <td>{reservacion.car.name}</td>
                                            <td>
                                                <Link to={"/editarReservacion/"+reservacion._id} className="btn btn-outline-warning">Editar</Link>
                                                <button className="btn btn-outline-danger ms-3"onClick={
                                                    ()=>{
                                                        this.eliminarReservacion(reservacion._id)
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

export default Reservaciones;