import React, { Component } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Clientes from "./componentes/Clientes";
import Menu from "./componentes/Menu";

import AgregarCliente from "./componentes/AgregarCliente";
import Admins from "./componentes/Admins";
import AgregarAdmin from "./componentes/AgregarAdmin";
import Carros from "./componentes/Carros";
import AgregarCarro from "./componentes/AgregarCarro";
import EditarCliente from "./componentes/EditarCliente";
import EditarAdmin from "./componentes/EditarAdmin";
import EditarCarro from "./componentes/EditarCarro";
import Reservaciones from "./componentes/Reservaciones";
import Mensajes from "./componentes/Mensajes";
import AgregarMensaje from "./componentes/AgregarMensaje"
import EditarMensaje from "./componentes/EditarMensaje";
import AgregarReservacion from "./componentes/AgregarReservacion"
import EditarReservacion from "./componentes/EditarReservacion"


class Rutas extends Component{
    render(){
        return(
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={ <div id="carousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="3000">
                        <img src="../../img/home images/Slide1.jpg" class="d-block w-100" alt="imagen publicidad"/>
                    </div>


                    <div class="carousel-item" data-bs-interval="3000">
                        <img src="../../img/home images/Slide2.jpg" class="d-block w-100" alt="imagen publicidad"/>
                    </div>


                    <div class="carousel-item" data-bs-interval="3000">
                        <img src="../../img/home images/Slide3.jpg" class="d-block w-100" alt="imagen publicidad"/>
                    </div>

                    <div class="carousel-item" data-bs-interval="3000">
                        <img src="../../img/home images/Slide4.jpg" class="d-block w-100" alt="imagen publicidad"/>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>}/>
                    <Route path="/clientes" element={<Clientes/>}/>
                    <Route path="/agregarCliente" element={<AgregarCliente/>}/> 
                    <Route path="/editarCliente/:id" element={<EditarCliente/>}/> 
                    <Route path="/editarCliente/:id" element={<EditarCliente/>}/>
                    <Route path="/admins" element={<Admins/>}/>
                    <Route path="/agregarAdmin" element={<AgregarAdmin/>}/> 
                    <Route path="/editarAdmin/:id" element={<EditarAdmin/>}/>
                    <Route path="/carros" element={<Carros/>}/>
                    <Route path="/agregarCarro" element={<AgregarCarro/>}/>
                    <Route path="/editarCarro/:id" element={<EditarCarro/>}></Route>
                    <Route path="/mensajes" element={<Mensajes/>}/>
                    <Route path="/agregarMensaje" element={<AgregarMensaje/>}/>
                    <Route path="/editarMensaje/:id" element={<EditarMensaje/>}/>
                    <Route path="/reservaciones" element={<Reservaciones/>}/>
                    <Route path="/agregarReservacion" element={<AgregarReservacion/>}/>
                    <Route path="/editarReservacion/:id" element={<EditarReservacion/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Rutas;