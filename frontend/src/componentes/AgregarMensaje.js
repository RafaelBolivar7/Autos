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
                        <label for="resultadoC" className="form-label">Cliente</label>
                            <select name="resultadoC" className="form-control" id="cliente" required ref={this.cliente} onChange={this.changeState}>
                                <option>Seleccionar Cliente</option>
                                <option value="639f07c0ba9ab59b3c6d0d64">VICTOR</option>
                                <option value="639f07fdba9ab59b3c6d0d68">Camillo Diaz Ari</option>
                                <option value="639f2e9aba9ab59b3c6d0d8a">Lorena Vargas</option>
                                <option value="63a48d04cc6eb2058822c05e">MONICA</option>
                                <option value="63a48d4fcc6eb2058822c061">Miguel Trujillo</option>
                                
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="resultadoG" className="form-label">Carro</label>
                            <select name="resultadoG" className="form-control" id="carro" required ref={this.carro} onChange={this.changeState}>
                                <option>Seleccionar Carro</option>
                                <option value="639f1e3aba9ab59b3c6d0d80">TOYOTA AM15</option>
                                <option value="639f8aa8eeec406309ccc353">KIA SK500</option>
                                <option value="639f94eeeeec406309ccc36c">carro 3</option>
                                <option value="639f961b85514e3481318350">HONDA GT 5000</option>
                                <option value="63a48ab7cc6eb2058822c053">TOTOTA COROLA 23A</option>
                                
                            </select>
                        </div>
                        <input type="submit" className="btn btn-primary" value="Guardar Mensaje"/>  
                    </div>
                </form>
        </React.Fragment>
        );
    }
}

export default agregarMensaje;