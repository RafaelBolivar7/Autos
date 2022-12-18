import React, { Component } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Clientes from "./componentes/Clientes";
import Menu from "./componentes/Menu";
import EditarCliente from "./componentes/EditarCliente";
import AgregarCliente from "./componentes/AgregarCliente";
import Admins from "./componentes/Admins";
import AgregarAdmin from "./componentes/AgregarAdmin";
import Carros from "./componentes/Carros";
import AgregarCarro from "./componentes/AgregarCarro";
//import EditarAdmin from "./componentes/EditarAdmin";


class Rutas extends Component{
    render(){
        return(
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={<div>HOME</div>}/>
                    <Route path="/clientes" element={<Clientes/>}/>
                    <Route path="/agregarCliente" element={<AgregarCliente/>}/> 
                    <Route path="/editarCliente/:id" element={<EditarCliente/>}/> 
                    <Route path="/admins" element={<Admins/>}/>
                    <Route path="/agregarAdmin" element={<AgregarAdmin/>}/> 
                    {/* <Route path="/editarAdmin/:id" element={<EditarAdmin/>}/> */}
                    <Route path="/carros" element={<Carros/>}/>
                    <Route path="/agregarCarro" element={<AgregarCarro/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Rutas;