import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class EditarAdmin extends Component {
    path = null;
    url=[];
    adminId = null;

    nombre = React.createRef();
    correo = React.createRef();
    pass = React.createRef();
    
    state ={
        admin:[],
        status: null
    }

    componentWillMount(){
        this.path = window.location.pathname;
        console.log(this.path);
        this.url=this.path.split("/");
        console.log(this.url);
        this.adminId=this.url[2];
        console.log(this.adminId);
        this.getAdmin(this.adminId);
        console.log(this.getAdmin(this.adminId)); 
    }

    getAdmin = (id) => {
        axios.get("http://localhost:3000/api/admin/"+id)
            .then(res => {
                this.setState({
                    admin: res.data.admin //despues del data. se pone el nombre de la variable nombrada en el back
                })
                console.log(res.data.admin)
            })
            .catch(error =>{
                console.log(error);
            })
    }

    actualizarAdmin = (e)=>{
        e.preventDefault();
        console.log(this.nombre.current.value);
        var admin ={
            name: this.nombre.current.value,
            email: this.correo.current.value,
            password: this.pass.current.value
        }

        axios.put("http://localhost:3000/api/admin/update/"+this.adminId, admin)
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
            return <Navigate to = "/admins"></Navigate>
        }
        return (
            <React.Fragment>
                <div className="container w-30 bg-light mt-3 roundedshadow">
                <h1 className="text-primary">Editar Administradores</h1>
                <form onSubmit={this.actualizarAdmin}>
                    <div className="container">
                    <div className="mb-3">
                            <label for="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" defaultValue={this.state.admin.name} ref={this.nombre}/>
                        </div>
                        <div className="mb-3">
                            <label for="correo" className="form-label">Correo</label>
                            <input type="email" className="form-control" id="correo" defaultValue={this.state.admin.email} ref={this.correo}/>
                        </div>
                        <div className="mb-3">
                            <label for="pass" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="pass"  defaultValue={this.state.admin.password} ref={this.pass}/>                     
                        </div>
                        <input type="submit" className="btn btn-primary"/>  
                    </div>
                </form>
                </div>
            </React.Fragment>
        );
    }
}

export default EditarAdmin;