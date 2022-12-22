import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

class Carros extends React.Component {
    state = {
        carros: []
    }

    componentWillMount() {
        this.getCarros();
    }
    getCarros = () => {
        axios.get("http://localhost:3000/api/car/all")
            .then(res => {
                console.log("Carros");
                console.log(res.data.doc);
                this.setState({
                    carros: res.data.doc
                });

            })
            .catch(error => {
                console.log(error);
            })
    }

    eliminarCarro = (id) =>{
        axios.delete("http://localhost:3000/api/car/delete/"+id)
        .then(res=>{
            this.setState({
                status: "deleted"
            })
            //window.location.reload(true);
            swal(
                "Carro Eliminado", 
                "El carro se elimino correctamente",
                "success"
            )
            window.location.reload(true);
        })
    }
    render(){
        console.log(this.state.carros);
        return (
            <React.Fragment>
                <div className="container w-30 bg-light mt-3 roundedshadow">
                <h1 className="text-primary">Carros</h1>
                <Link to="/agregarCarro" className="btn btn-outline-success m-3">Agregar Carro</Link>
                <table className="table table-light table-striped">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Nombre</td>
                            <td>Marca</td>
                            <td>Modelo</td>
                            <td>Descripción</td>
                            <td>Categoría</td>
                            {/* <td>Reservación</td> */}
                            <td>Acciones</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.carros.map((carro) => {
                                return (
                                    <React.Fragment>
                                        <tr>
                                            <td>{carro._id}</td>
                                            <td>{carro.name}</td>
                                            <td>{carro.brand}</td>
                                            <td>{carro.year}</td>
                                            <td>{carro.description}</td>
                                            <td>{carro.category}</td>
                                            {/* <td>{carro.reservation}</td> */}

                                            <td>
                                                <Link to={"/editarCarro/"+carro._id} className="btn btn-outline-warning">Editar</Link>
                                                <button className="btn btn-outline-danger ms-3"onClick={
                                                    ()=>{
                                                        this.eliminarCarro(carro._id)
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

export default Carros;