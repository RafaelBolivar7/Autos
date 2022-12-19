import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

class agregarMensaje extends Component{
        texto = React.createRef();
        cliente = React.createRef();
        carro = React.createRef();

        state ={
                mensaje:[],
                status: null
        }

        changeState = ()=>{
                this.setState({
                        mensaje:{
                                text: this.texto.current.value,   //Nombre de las variables que envia en JSON en Postman
                                client: this.cliente.current.value,
                                car: this.carro.current.value,
                        }
                })
                console.log(this.state)
        }

        guardarMensaje = (e)=>{
                e.preventDefault();
                console.log(this.texto.current.value);
                console.log(this.cliente.current.value);
                this.changeState();
                axios.post("http://localhost:3000/api/message/save", this.state.mensaje)
                .then(res=>{
                        this.setState({
                                status: "Success"
                        })
                })
                .catch(function(error){
                        console.log(error);
                })
        }

    render(){
        if(this.state.status === "Success"){
                return <Navigate to = "/mensajes"></Navigate>
        }
        return(
        <React.Fragment>
                <h1>Agregar Mensajes</h1>
                <form onSubmit={this.guardarMensaje}>
                    <div className="container">
                        <div className="mb-3">
                            <label for="texto" className="form-label">Mensaje</label>
                            <input type="text" className="form-control" id="texto" placeholder="Mensaje" name="texto" ref={this.texto} onChange={this.changeState} />
                        </div>
                        <div className="mb-3">
                            <label for="cliente" className="form-label">Cliente</label>
                            <input type="texto" className="form-control" id="cliente" placeholder="Cliente" name="cliente" ref={this.cliente} onChange={this.changeState} />
                        </div>
                        <div className="mb-3">
                            <label for="carro" className="form-label"  >Carro</label>
                            <input type="text" className="form-control" id="carro" placeholder="Carro" name="carro" ref={this.carro} onChange={this.changeState}/>
                        </div>
                        <input type="submit" className="btn btn-primary" value="Guardar Mensaje"/>  
                    </div>
                </form>
        </React.Fragment>
        );
    }
}

export default agregarMensaje;