import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class editarReservacion extends Component {
    path = null;
    url=[];
    reservacionId = null;

    inicio = React.createRef();
    fin = React.createRef();
    estado = React.createRef();
    cliente = React.createRef();
    carro = React.createRef();
    
    state ={
        reservacion:[],
        status: null
    }

    componentWillMount(){
        this.path = window.location.pathname;
        console.log(this.path);
        this.url=this.path.split("/");
        console.log(this.url);
        this.reservacionId=this.url[2];
        console.log(this.reservacionId);
        this.getReservacion(this.reservacionId);
        console.log(this.getReservacion(this.reservacionId)); 
    }

    getReservacion = (id) => {
        axios.get("http://localhost:3000/api/reservation/"+id)
            .then(res => {
                this.setState({
                    reservacion: res.data.reservation //despues del data. se pone el nombre de la variable nombrada en el back
                })
                console.log(res.data.reservation)
            })
            .catch(error =>{
                console.log(error);
            })
    }

    actualizarReservacion = (e)=>{
        e.preventDefault();
        console.log(this.estado.current.value);
        var reservacion ={
            start_date: this.inicio.current.value,
            end_date: this.fin.current.value,
            status: this.estado.current.value,
            client: this.cliente.current.value,
            car: this.carro.current.value
        }

        axios.put("http://localhost:3000/api/reservation/update/"+this.reservationId, reservacion)
            .then(res =>{
                this.setState({
                    status: "success"
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

       render(){
        if(this.state.status === "success"){
            return <Navigate to = "/reservaciones"></Navigate>
        }
        return (
            <React.Fragment>
                <h1>Editar Reservación</h1>
                <form onSubmit={this.actualizarReservacion}>
                    <div className="container">
                    <div className="mb-3">
                            <label for="inicio" className="form-label">Fecha de Inicio</label>
                            <input type="date" className="form-control" id="inicio" defaultValue={this.state.reservacion.start_date} ref={this.inicio}/>
                        </div>
                        <div className="mb-3">
                            <label for="fin" className="form-label">Fecha de Fin</label>
                            <input type="date" className="form-control" id="fin" defaultValue={this.state.reservacion.end_date} ref={this.fin}/>
                        </div>
                        <div className="mb-3">
                            <label for="estado" className="form-label">Estado</label>
                            <input type="text" className="form-control" id="estado"  defaultValue={this.state.reservacion.status} ref={this.estado}/>                     
                        </div>
                        <div className="mb-3">
                            <label for="cliente" className="form-label">Cliente</label>
                            <input type="text" className="form-control" id="cliente"  defaultValue={this.state.reservacion.client} ref={this.cliente}/>                     
                        </div>
                        <div className="mb-3">
                            <label for="carro" className="form-label">Carro</label>
                            <input type="text" className="form-control" id="carro"  defaultValue={this.state.reservacion.car} ref={this.carro}/>                     
                        </div>
                        <input type="submit" className="btn btn-primary" value="Guardar Reservación"/>  
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default editarReservacion;