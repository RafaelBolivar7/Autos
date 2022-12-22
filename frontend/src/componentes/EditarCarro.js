import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class EditarCarro extends Component {
    path = null;
    url=[];
    carroId = null;

    nombre = React.createRef();
    marca = React.createRef();
    modelo = React.createRef();
    descripcion = React.createRef();
    categoria = React.createRef();
    
    state ={
        carro:[],
        status: null
    }

    componentWillMount(){
        this.path = window.location.pathname;
        console.log(this.path);
        this.url=this.path.split("/");
        console.log(this.url);
        this.carroId=this.url[2];
        console.log(this.carroId);
        this.getCarro(this.carroId);
        console.log(this.getCarro(this.carroId)); 
    }

    getCarro = (id) => {
        axios.get("http://localhost:3000/api/car/"+id)
            .then(res => {
                this.setState({
                    carro: res.data.car //despues del data. se pone el nombre de la variable nombrada en el back
                })
                console.log(res.data.car)
            })
            .catch(error =>{
                console.log(error);
            })
    }

    actualizarCarro = (e)=>{
        e.preventDefault();
        console.log(this.nombre.current.value);
        var carro ={
            name: this.nombre.current.value,
            brand: this.marca.current.value,
            year: this.modelo.current.value,
            description: this.descripcion.current.value,
            category: this.categoria.current.value
        }

        axios.put("http://localhost:3000/api/car/update/"+this.carroId, carro)
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
            return <Navigate to = "/carros"></Navigate>
        }
        return (
            <React.Fragment>
                <div className="container w-30 bg-light mt-3 roundedshadow">
                <h1 className="text-primary">Editar Carro</h1>
                <form onSubmit={this.actualizarCarro}>
                    <div className="container">
                    <div className="mb-3">
                            <label for="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" defaultValue={this.state.carro.name} ref={this.nombre}/>
                        </div>
                        <div className="mb-3">
                            <label for="marca" className="form-label">Marca</label>
                            <input type="text" className="form-control" id="marca" defaultValue={this.state.carro.brand} ref={this.marca}/>
                        </div>
                        <div className="mb-3">
                            <label for="modelo" className="form-label">Modelo</label>
                            <input type="text" className="form-control" id="modelo" defaultValue={this.state.carro.year} ref={this.modelo}/>
                        </div>
                        <div className="mb-3">
                            <label for="descripcion" className="form-label">Descripción</label>
                            <input type="text" className="form-control" id="descripcion"  defaultValue={this.state.carro.description} ref={this.descripcion}/>                     
                        </div>
                        <div className="mb-3">
                            <label for="categoria" className="form-label">Categoría</label>
                            <input type="text" className="form-control" id="categoria"  defaultValue={this.state.carro.category} ref={this.categoria}/>                     
                        </div>
                        <input type="submit" className="btn btn-primary" value="Guardar Carro"/>  
                    </div>
                </form>
                </div>
            </React.Fragment>
        );
    }
}

export default EditarCarro;