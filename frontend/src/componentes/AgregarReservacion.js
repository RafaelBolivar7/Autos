import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

class agregarReservacion extends Component{
        inicio = React.createRef();
        fin = React.createRef();
        estado = React.createRef();
        cliente = React.createRef();
        carro = React.createRef();

        state ={
                reservacion:[],
                status: null
        } 
        componentWillMount() {
            this.getCarros();
            
        }

        changeState = ()=>{
                this.setState({
                        reservacion:{
                                start_date: this.inicio.current.value,   //Nombre de las variables que envia en JSON en Postman
                                end_date: this.fin.current.value,
                                status: this.estado.current.value,
                                client: this.cliente.current.value,
                                car: this.carro.current.value
                        }
                })
                console.log(this.state)
        }

        guardarReservacion = (e)=>{
                e.preventDefault();
                console.log(this.inicio.current.value);
                console.log(this.cliente.current.value);
                this.changeState();
                axios.post("http://localhost:3000/api/reservation/save", this.state.reservacion)
                .then(res=>{
                        this.setState({
                                status: "Success"
                        })
                })
                .catch(function(error){
                        console.log(error);
                })
        }

        getCarros = (e) => {
                axios.get("http://localhost:3000/api/car/all")
                    .then(res => {
                        console.log("Carros");
                        console.log(res.data.doc);
                        this.setState({
                                respuestaG: res.data.doc
                                
                        });
                        
        
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }

            pintarRespuestaG=(respuestaG)=>{
                var mylistaG=document.getElementById("resultadoG");
                var i=0;
                for(i=0; i<respuestaG.length; i++){
                    mylistaG.innerHTML+=`<option value="${respuestaG[i]._id}">${respuestaG[i].name}</option>`;
                }
                console.log("hay lista");
                console.log(mylistaG);
            }



          /*  getClientes = (e) => {
                axios.get("http://localhost:3000/api/client/all")
                    .then(res => {
                        console.log("Clientes");
                        console.log(res.data.doc);
                        this.setState({
                            clientes: res.data.doc
                            
                        });
        
                    })
                    .catch(error => {
                        console.log(error);
                    })




            }   */

    render(){
        if(this.state.status === "Success"){
                return <Navigate to = "/reservaciones"></Navigate>
        }
        return(
        <React.Fragment>
                <h1>Agregar Reservaciones</h1>
                <form onSubmit={this.guardarReservacion}>
                    <div className="container">
                        <div className="mb-3">
                            <label for="inicio" className="form-label">Fecha de Inicio</label>
                            <input type="date" className="form-control" id="inicio" placeholder="Fecha de Inicio" name="inicio" ref={this.inicio} onChange={this.changeState} />
                        </div>
                        <div className="mb-3">
                            <label for="fin" className="form-label">Fecha de Fin</label>
                            <input type="date" className="form-control" id="fin" placeholder="Fecha de Fin" name="fin" ref={this.fin} onChange={this.changeState} />
                        </div>
                        <div className="mb-3">
                        <label for="resultadoC" className="form-label">Cliente</label>
                            <select name="estado" className="form-control" id="estado" required ref={this.estado} onChange={this.changeState}>
                                <option>Seleccionar Estado</option>
                                <option value="Abierto">Abierto</option>
                                <option value="Cerrado">Cerrada</option>        
                            </select>
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
                        <input type="submit" className="btn btn-primary" value="Guardar Reservación"/>  
                    </div>
                </form>
        </React.Fragment>
        );
    }
}

export default agregarReservacion;