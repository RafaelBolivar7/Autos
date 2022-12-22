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
                            <label for="estado" className="form-label"  >Estado</label>
                            <input type="text" className="form-control" id="estado" placeholder="Estado" name="estado" ref={this.estado} onChange={this.changeState}/>
                        </div>
                        <div className="mb-3">
                        <label for="resultadoC" className="form-label">Carro</label>
                            <select name="resultadoC" className="form-control" id="resultadoC" required>
                                <option>Seleccionar Cliente</option>
                                
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="resultadoG" className="form-label">Carro</label>
                            <select name="resultadoG" className="form-control" id="resultadoG" required>
                                <option>Seleccionar Carro</option>
                                
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