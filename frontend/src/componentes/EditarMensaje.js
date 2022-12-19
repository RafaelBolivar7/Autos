import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class EditarMensaje extends Component {
    path = null;
    url=[];
    mensajeId = null;

    texto = React.createRef();
    cliente = React.createRef();
    carro = React.createRef();
    
    state ={
        mensaje:[],
        status: null
    }

    componentWillMount(){
        this.path = window.location.pathname;
        console.log(this.path);
        this.url=this.path.split("/");
        console.log(this.url);
        this.mensajeId=this.url[2];
        console.log(this.mensajeId);
        this.getMensaje(this.mensajeId);
        console.log(this.getMensaje(this.mensajeId)); 
    }

    getMensaje = (id) => {
        axios.get("http://localhost:3000/api/message/"+id)
            .then(res => {
                this.setState({
                    mensaje: res.data.message //despues del data. se pone el nombre de la variable nombrada en el back
                })
                console.log(res.data.message)
            })
            .catch(error =>{
                console.log(error);
            })
    }

    actualizarMensaje = (e)=>{
        e.preventDefault();
        console.log(this.texto.current.value);
        var mensaje ={
            text: this.texto.current.value,
            client: this.cliente.current.value,
            car: this.carro.current.value
        }

        axios.put("http://localhost:3000/api/message/update/"+this.mensajeId, mensaje)
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
            return <Navigate to = "/mensajes"></Navigate>
        }
        return (
            <React.Fragment>
                <h1>Editar Mensaje</h1>
                <form onSubmit={this.actualizarMensaje}>
                    <div className="container">
                    <div className="mb-3">
                            <label for="texto" className="form-label">Mensaje</label>
                            <input type="text" className="form-control" id="texto" defaultValue={this.state.mensaje.text} ref={this.texto}/>
                        </div>
                        <div className="mb-3">
                            <label for="cliente" className="form-label">Cliente</label>
                            <input type="text" className="form-control" id="cliente" defaultValue={this.state.mensaje.client} ref={this.cliente}/>
                        </div>
                        <div className="mb-3">
                            <label for="carro" className="form-label">Carro</label>
                            <input type="text" className="form-control" id="carro"  defaultValue={this.state.mensaje.car} ref={this.carro}/>                     
                        </div>
                        <input type="submit" className="btn btn-primary"/>  
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default EditarMensaje;