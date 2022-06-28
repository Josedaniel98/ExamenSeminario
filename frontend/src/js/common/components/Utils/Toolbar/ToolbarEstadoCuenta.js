import React, { Component } from 'react'
import Select, { Creatable, Async } from 'react-select';
import classNames from 'classnames';
import Search from "./search"

let movimientos = [
    {id: true, value: true, label:"Ingreso"},
    {id: false, value: false, label:"Egreso"},
]
let meses= [
    {id:1,value:1,label:"Enero"},
    {id:2,value:2,label:"Febrero"},
    {id:3,value:3,label:"Marzo"},
    {id:4,value:4,label:"Abril"},
    {id:5,value:5,label:"Mayo"},
    {id:6,value:6,label:"Junio"},
    {id:7,value:7,label:"Julio"},
    {id:8,value:8,label:"Agosto"},
    {id:9,value:9,label:"Septiembre"},
    {id:10,value:10,label:"Octubre"},
    {id:11,value:11,label:"Noviembre"},
    {id:12,value:12,label:"Diciembre"}
]
let years = []
function getYears(){
    years=[];
    let date = new Date();
    let year = date.getFullYear();
    for(let i=year; i>=2017; i--){
        years.push({id:i, value:i, label: i})
    }
}
let estado = [
    {id: true, value: true, label:"Activos"},
    {id: false, value: false, label: "Anulados"}
]



export default class ToolbarEstadoCuenta extends Component {
    componentWillMount(){
        getYears()
    }
    render() {
        const {
            valorMes,
            valorAnio,
            valorMovimiento,
            valorEstado,
            changeMes,
            changeAnio,
            changeMovimiento,
            changeEstado
        } = this.props;
        return (
            <div className="row col-12 m-0 text-lg-left">
                <div className={"col-lg-2 col-md-2 col-12 align-self-center d-flex flex-column"}>
                     <span className="t-musgo font-weight-bold">Mes</span>
                    <Select
                    isClearable={false}
                    className={classNames('react-select-container')}
                    backspaceRemovesValue={false}
                    isSearchable={true}
                    options={meses}
                    placeholder={"Mes"}
                    value={valorMes}
                    onChange={changeMes}
                        />
                </div>
                <div className={"col-lg-2 col-md-2 col-12 align-self-center d-flex flex-column"}>
                     <span className="t-musgo font-weight-bold">Año</span>
                    <Select
                    isClearable={false}
                    className={classNames('react-select-container')}
                    backspaceRemovesValue={false}
                    isSearchable={true}
                    options={years}
                    placeholder={"Año"}
                    value={valorAnio}
                    onChange={changeAnio}
                        />
                </div>
                <div className={"col-lg-2 col-md-2 col-12 align-self-center d-flex flex-column"}>
                    <span className="t-musgo font-weight-bold">Movimiento</span>
                    <Select
                        isClearable={true}
                        className={classNames('react-select-container')}
                        backspaceRemovesValue={false}
                        isSearchable={true}
                        options={movimientos}
                        placeholder={"Movimiento"}
                        value={valorMovimiento}
                        onChange={changeMovimiento}
                            />
                </div>
                <div className={"col-lg-2 col-md-2 col-12 align-self-center d-flex flex-column"}>
                    <span className="t-musgo font-weight-bold">Estado</span>
                    <Select
                        isClearable={false}
                        className={classNames('react-select-container')}
                        backspaceRemovesValue={false}
                        isSearchable={true}
                        options={estado}
                        placeholder={"Estado"}
                        value={valorEstado}
                        onChange={changeEstado}
                            />
                </div>
                <div className={"col-lg-3 col-md-3 col-12 align-self-center d-flex flex-column"}>
                    <span className="t-musgo font-weight-bold">Buscar</span>
                  {(this.props.buscar !== undefined) && (
                    <Search buscar={this.props.buscar} buscador={this.props.buscador} placeholder={"Buscar por: No. Documento, Monto"} />
                  )}

                
                </div>
            </div>
        )
    }
}


//onChange={(e) => { input.onChange(e ? e[valueKey] : null); }}
//value={value}
