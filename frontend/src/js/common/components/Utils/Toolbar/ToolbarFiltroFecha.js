import React, { Component, Fragment } from 'react';
import "./toolbar.css";
import Search from "./search"
import Select, { Creatable, Async } from 'react-select';
import renderSelecttree from '../../Utils/renderField'
import classNames from 'classnames';

import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize';
import moment from 'moment';
import es from 'moment/locale/es';
import 'react-dates/lib/css/_datepicker.css';
import {api} from 'api'

const getClientes = (search) => {
    return api.get("clientes", { search, esCliente: true }).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
};

const getProveedores = (search) => {
    return api.get("clientes", { search, esCliente: '' }).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
};

const getTipoGastos = (search) => {
    return api.get("tipo_gasto/selecttipos", {search}).
        then((data) => {
            console.log("tipos", data.tipo)
            if (data) return data.tipo;
            return [];
        }).catch(() => {
            return [];
        });
};

let estado = [
    {id: true, value: true, label: "Activos"},
    {id: false, value: false, label: "Anulados"}
]

let movimiento = [
    {value: true, label: "Ingreso"},
    {value: false, label: "Egreso"}
]

let movimiento_cliente = [
    {value: false, label: "Debe"},
    {value: true, label: "Haber"}
]

let TipoTransaccion =[
    {value:1, label:'ELECTRONICA'},
    {value:2, label:'CHEQUE'},
    {value:4, label:'DEPOSITO'},
    {value:5, label:'TARJETA'},
    {value:6, label:'EFECTIVO'},
]

export default class ToolbarFiltroFecha extends Component {
    state = {
        dateStart: moment.now(),
        focusedStart: false,

        dateEnd: moment.now(),
        focusedEnd: false,

        asyncValue: this.props.asyncValue ? this.props.asyncValue : null,
        cliente: null,
        proveedor: null,
        tipo_gasto: null,
        resultadosCliente: [],
        resultadosProveedor: [],
        resultadosTipoGasto: []
    }
    componentWillMount() {
        let resultadosCliente = []
        let resultadosProveedor = []
        let resultadosTipoGasto = []
        if(this.props.esBalanceEmpresa){
            resultadosCliente = getClientes('')
            resultadosProveedor = getProveedores('')
            resultadosTipoGasto = getTipoGastos('')

            resultadosCliente.then((valor) => {
                this.setState({ resultadosCliente: valor })
            })
            resultadosProveedor.then((valor) => {
                this.setState({ resultadosProveedor: valor })
            })
            resultadosTipoGasto.then((valor) => {
                this.setState({ resultadosTipoGasto: valor })
            })
        }
    }
  render() {
    return (
      <div className={`col-12 p-0 m-0  row d-flex ${ this.props.justify ? this.props.justify:"justify-content-center justify-content-md-end"} `}>

            <div className="form-group has-feedback col-md-3 col-12 m-0">
                    <div className="col-md-12 p-0 m-2">
                        <label className="t-azul"  htmlFor="producto">Fecha Inicial</label>
                    </div>
                    <SingleDatePicker
                        className="form-control"
                        placeholder={"Fecha Inicio"}
                        date={this.props.dateStart ? moment(this.props.dateStart ) : null}
                        focused={this.state.focusedStart}
                        isOutsideRange={() => false}
                        onDateChange={(value) => {
                        this.setState({dateStart:value})
                        this.props.setDateStart(value)
                        }}
                        onFocusChange={({ focused }) => this.setState({ focusedStart: focused })}
                        numberOfMonths={1}
                        id={"dateStart"}
			readOnly = { true }
                    />
            </div>
            <div className="col-md-3 form-group m-0">
                <div className="col-md-12 p-0 m-2">
                    <label className="t-azul"  htmlFor="producto">Fecha Final</label>
                </div>
                <SingleDatePicker
                        className="form-control"
                        placeholder={"Fecha Final"}
                        date={this.props.dateEnd ? moment(this.props.dateEnd ) : null}
                        focused={this.state.focusedEnd}
                        isOutsideRange={() => false}
                        onDateChange={(value) => {
                           this.setState({dateEnd:value})
                           this.props.setDateEnd(value);
                        }}
                        onFocusChange={({ focused }) => this.setState({ focusedEnd: focused })}
                        numberOfMonths={1}
                        id={"dateStart"}
			readOnly = { true }
                    />
            </div>
            {this.props.setEstado && (
                    <div className="form-group has-feedback col-md-3 col-12 m-0">
                        <div className="col-md-12 p-0 m-2">
                            <label className="t-azul" htmlFor="producto">
                                Estado
                            </label>
                        </div>
                        <Select
                        isClearable={false}
                        className={classNames('react-select-container')}
                        backspaceRemovesValue={false}
                        isSearchable={true}
                        options={estado}
                        placeholder={"Estado"}
                        value={this.props.valorEstado}
                        onChange={this.props.changeEstado}
                            />
                    </div>
                    
                )}
            {this.props.esBalanceCliente && (
                <div className="form-group has-feedback col-md-3 col-12 m-0">
                    <div className="col-md-12 p-0 m-2">
                        <label className="t-azul" htmlFor="producto">
                            Tipo de movimiento
                        </label>
                    </div>
                    <Select
                    isClearable={true}
                    className={classNames('react-select-container')}
                    backspaceRemovesValue={false}
                    isSearchable={true}
                    options={movimiento_cliente}
                    placeholder={"Seleccione"}
                    value={this.props.valorTipoMovimiento}
                    onChange={this.props.changeTipoMovimiento}
                        />
                </div>
            )
            }
            {this.props.esBalanceEmpresa && (
                <Fragment>
                    <div className="form-group has-feedback col-md-3 col-12 m-0">
                        <div className="col-md-12 p-0 m-2">
                            <label className="t-azul" htmlFor="producto">
                                Tipo de movimiento
                            </label>
                        </div>
                        <Select
                        isClearable={true}
                        className={classNames('react-select-container')}
                        backspaceRemovesValue={false}
                        isSearchable={true}
                        options={movimiento}
                        placeholder={"Seleccione"}
                        value={this.props.valorTipoMovimiento}
                        onChange={this.props.changeTipoMovimiento}
                            />
                    </div>
                    <div className="form-group has-feedback col-md-3 col-12 m-0">
                        <div className="col-md-12 p-0 m-2">
                            <label className="t-azul" htmlFor="producto">
                                Cliente
                            </label>
                        </div>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={this.props.cliente}
                            isSearchable={true}
                            loadOptions={getClientes}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["nombre"])}
                            type="text"
                            onChange={(e) => {
                                e ? this.setState({ cliente: e.id, asyncValue: e ? e : null }) : this.setState({ cliente: null })
                                if (this.props.changeCliente) {
                                    e ? this.props.changeCliente(e) : this.props.changeCliente(null)
                                }
                            }}

                            multi={true}
                            autoload={false}
                            cache={false}
                            className={classNames('react-select-container ')}
                            defaultOptions={this.state.resultadosCliente}
                            placeholder="Seleccionar.."
                        />
                    </div>
                    <div className="form-group has-feedback col-md-3 col-12 m-0">
                        <div className="col-md-12 p-0 m-2">
                            <label className="t-azul" htmlFor="producto">
                                Proveedor
                            </label>
                        </div>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={this.props.proveedor}
                            isSearchable={true}
                            loadOptions={getProveedores}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["nombre"])}
                            type="text"
                            onChange={(e) => {
                                e ? this.setState({ proveedor: e.id, asyncValue: e ? e : null }) : this.setState({ proveedor: null })
                                if (this.props.changeProveedor) {
                                    e ? this.props.changeProveedor(e) : this.props.changeProveedor(null)
                                }
                            }}

                            multi={true}
                            autoload={false}
                            cache={false}
                            className={classNames('react-select-container ')}
                            defaultOptions={this.state.resultadosProveedor}
                            placeholder="Seleccionar.."
                        />
                    </div>
                    <div className="form-group has-feedback col-md-3 col-12 m-0">
                        <div className="col-md-12 p-0 m-2">
                            <label className="t-azul" htmlFor="producto">
                                Tipo de gasto
                            </label>
                        </div>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={this.props.tipo_gasto}
                            isSearchable={true}
                            loadOptions={getTipoGastos}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["nombre"])}
                            type="text"
                            onChange={(e) => {
                                e ? this.setState({ tipo_gasto: e.id, asyncValue: e ? e : null }) : this.setState({ tipo_gasto: null })
                                if (this.props.changeTipoGasto) {
                                    e ? this.props.changeTipoGasto(e) : this.props.changeTipoGasto(null)
                                }
                            }}

                            multi={true}
                            autoload={false}
                            cache={false}
                            className={classNames('react-select-container ')}
                            defaultOptions={this.state.resultadosTipoGasto}
                            placeholder="Seleccionar.."
                        />
                    </div>
                    <div className="form-group has-feedback col-md-3 col-12 m-0">
                        <div className="col-md-12 p-0 m-2">
                            <label className="t-azul" htmlFor="producto">
                                Forma de pago
                            </label>
                        </div>
                        <Select
                        isClearable={true}
                        className={classNames('react-select-container')}
                        backspaceRemovesValue={false}
                        isSearchable={true}
                        options={TipoTransaccion}
                        placeholder={"Seleccione"}
                        value={this.props.valorFormaPago}
                        onChange={this.props.changeFormaPago}
                            />
                    </div>
                </Fragment> 
            )}
            {(this.props.buscar !== undefined) && (
                <div className="col-lg-4 col-md-4 mt-2 text-right search d-flex align-items-end">
                    <Search buscar={this.props.buscar} buscador={this.props.buscador} placeholder={this.props.placeholder} />
                </div>
            )}

      </div>
    )
  }
}
