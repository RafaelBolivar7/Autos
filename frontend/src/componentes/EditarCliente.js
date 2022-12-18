import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class EditarCliente extends Component {
    path = null;
    url = [];
    clienteId = null

        nombre = React.createRef();
        edad = React.createRef();
        correo = React.createRef();
        pass = React.createRef();

        state ={
            cliente:[],
            status: null
    }

    componentWillMount() {
        this.path = window.location.pathname;
        console.log(this.path);
        this.url = this.path.split("/");
        console.log(this.url);
        this.clienteId = this.url[2];
        console.log(this.clienteId);
        this.getcliente(this.clienteId);
    }

    getcliente = (Id) => {
        axios.get("http://localhost:3000/api/client/" + Id)
            .then(res => {
                this.setState({
                    cliente: res.data.client
                })
                console.log(res.data.client);
            })
            .catch(error => {

                console.log(error);

            })
    }

    actualizarcliente = (e) => {
        e.preventDefault();
        console.log(this.nombre.current.value);
        console.log(this.edad.current.value);
        console.log(this.correo.current.value);
        console.log(this.pass.current.value);
        var cliente = {
    url=[];
    clienteId = null;

    nombre = React.createRef();
    edad = React.createRef();
    correo = React.createRef();
    pass = React.createRef();
    
    state ={
        cliente:[],
        status: null
    }

    componentWillMount(){
        this.path = window.location.pathname;
        console.log(this.path);
        this.url=this.path.split("/");
        console.log(this.url);
        this.clienteId=this.url[2];
        console.log(this.clienteId);
        this.getCliente(this.clienteId);
        console.log(this.getCliente(this.clienteId)); 
    }

    getCliente = (id) => {
        axios.get("http://localhost:3000/api/client/"+id)
            .then(res => {
                this.setState({
                    cliente: res.data.client //despues del data. se pone el nombre de la variable nombrada en el back
                })
                console.log(res.data.client)
            })
            .catch(error =>{
                console.log(error);
            })
    }

    actualizarCliente = (e)=>{
        e.preventDefault();
        console.log(this.nombre.current.value);
        var cliente ={
            name: this.nombre.current.value,
            age: this.edad.current.value,
            email: this.correo.current.value,
            password: this.pass.current.value
        }

        axios.put("http://localhost:3000/api/client/update/" + this.clienteId, cliente)
            .then(res => {
                this.setState({
                    status: "success",
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    render() {
        if (this.state.status === "success") {
            return <Navigate to="/Clientes" />
        axios.put("http://localhost:3000/api/client/update/"+this.clienteId, cliente)
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
            return <Navigate to = "/clientes"></Navigate>
        }
        return (
            <React.Fragment>
                <h1>Editar Cliente</h1>
                <form onSubmit={this.actualizarcliente}>
                    <div className="mb-3">
                        <label for="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="nombre" placeholder="Nombre" defaultValue={this.state.cliente.name} ref={this.nombre} />
                    </div>
                    <div className="mb-3">
                        <label for="apellido" className="form-label">Edad</label>
                        <input type="text" className="form-control" id="age" placeholder="Edad" defaultValue={this.state.cliente.age} ref={this.edad} />
                    </div>
                    <div className="mb-3">
                        <label for="correo" className="form-label">Correo</label>
                        <input type="email" className="form-control" id="correo" aria-describedby="emailHelp" placeholder="Correo" defaultValue={this.state.cliente.email} ref={this.correo} />
                    </div>
                    <div className="mb-3">
                        <label for="pass" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="pass" placeholder="Contraseña" defaultValue={this.state.cliente.password} ref={this.pass} />
                    </div>
                    <input type="submit" className="btn btn-primary" value={"Actualizar"} />
                <form onSubmit={this.actualizarCliente}>
                    <div className="container">
                    <div className="mb-3">
                            <label for="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" defaultValue={this.state.cliente.name} ref={this.nombre}/>
                        </div>
                        <div className="mb-3">
                            <label for="edad" className="form-label">Edad</label>
                            <input type="number" className="form-control" id="edad" defaultValue={this.state.cliente.age} ref={this.edad}/>
                        </div>
                        <div className="mb-3">
                            <label for="correo" className="form-label">Correo</label>
                            <input type="email" className="form-control" id="correo" defaultValue={this.state.cliente.email} ref={this.correo}/>
                        </div>
                        <div className="mb-3">
                            <label for="pass" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="pass"  defaultValue={this.state.cliente.password} ref={this.pass}/>                     
                        </div>
                        <input type="submit" className="btn btn-primary"/>  
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default EditarCliente;