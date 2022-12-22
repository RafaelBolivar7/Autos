import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

class AgregarAdmin extends Component{
        nombre = React.createRef();
        
        correo = React.createRef();
        pass = React.createRef();

        state ={
                admin:[],
                status: null
        }

        changeState = ()=>{
                this.setState({
                        admin:{
                                name: this.nombre.current.value,   //Nombre de las variables que envia en JSON en Postman
                                
                                email: this.correo.current.value,
                                password: this.pass.current.value
                        }
                })
                console.log(this.state)
        }

        guardarAdmin = (e)=>{
                e.preventDefault();
                console.log(this.nombre.current.value);
                console.log(this.correo.current.value);
                this.changeState();
                axios.post("http://localhost:3000/api/admin/save", this.state.admin)
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
                return <Navigate to = "/admins"></Navigate>
        }
        return(
        <React.Fragment>
                <div className="container w-30 bg-light mt-3 roundedshadow">
                <h1 className="text-primary">Agregar Administradores</h1>
                <form onSubmit={this.guardarAdmin}>
                    <div className="container">
                        <div className="mb-3">
                            <label for="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" placeholder="Nombre" name="nombre" ref={this.nombre} onChange={this.changeState} />
                        </div>
                        <div className="mb-3">
                            <label for="correo" className="form-label"  >Correo</label>
                            <input type="email" className="form-control" id="correo" placeholder="Correo" name="correo" ref={this.correo} onChange={this.changeState}/>
                        </div>
                        <div className="mb-3">
                            <label for="pass" className="form-label" >Contraseña</label>
                            <input type="password" className="form-control" id="pass" placeholder="Contraseña" name="pass" ref={this.pass} onChange={this.changeState}/>
                        </div>
                        <input type="submit" className="btn btn-primary"/>  
                    </div>
                </form>
                </div>
        </React.Fragment>
        );
    }
}

export default AgregarAdmin;