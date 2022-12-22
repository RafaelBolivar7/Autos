import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

class AgregarCarro extends Component{
        nombre = React.createRef();
        marca = React.createRef();
        modelo = React.createRef();
        descripcion = React.createRef();
        categoria = React.createRef();

        state ={
                carro:[],
                status: null
        }

        changeState = ()=>{
                this.setState({
                        carro:{
                                name: this.nombre.current.value,   //Nombre de las variables que envia en JSON en Postman
                                brand: this.marca.current.value,
                                year: this.modelo.current.value,
                                description: this.descripcion.current.value,
                                category: this.categoria.current.value
                        }
                })
                console.log(this.state)
        }

        guardarCarro = (e)=>{
                e.preventDefault();
                console.log(this.nombre.current.value);
                console.log(this.modelo.current.value);
                this.changeState();
                axios.post("http://localhost:3000/api/car/save", this.state.carro)
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
                return <Navigate to = "/carros"></Navigate>
        }
        return(
        <React.Fragment>
                <div className="container w-30 bg-light mt-3 roundedshadow">
                <h1 className="text-primary">Agregar Carros</h1>
                <form onSubmit={this.guardarCarro}>
                    <div className="container">
                        <div className="mb-3">
                            <label for="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" placeholder="Nombre" name="nombre" ref={this.nombre} onChange={this.changeState} />
                        </div>
                        <div className="mb-3">
                            <label for="marca" className="form-label">Marca</label>
                            <input type="text" className="form-control" id="marca" placeholder="Marca" name="marca" ref={this.marca} onChange={this.changeState} />
                        </div>
                        <div className="mb-3">
                            <label for="modelo" className="form-label">Modelo</label>
                            <input type="text" className="form-control" id="modelo" placeholder="Modelo" name="modelo" ref={this.modelo} onChange={this.changeState} />
                        </div>
                        <div className="mb-3">
                            <label for="descripcion" className="form-label"  >Descripción</label>
                            <input type="text" className="form-control" id="descripcion" placeholder="Descripción" name="descripcion" ref={this.descripcion} onChange={this.changeState}/>
                        </div>
                        <div className="mb-3">
                            <label for="categoria" className="form-label" >Categoría</label>
                            <input type="text" className="form-control" id="categoria" placeholder="Categoría" name="categoria" ref={this.categoria} onChange={this.changeState}/>
                        </div>
                        
                       <input type="submit" className="btn btn-primary"  value="Guardar Carro"/>  
                    </div>
                </form>
                </div>
        </React.Fragment>
        
        );
    }
}

export default AgregarCarro;