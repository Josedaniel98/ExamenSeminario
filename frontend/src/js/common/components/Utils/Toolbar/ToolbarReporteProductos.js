import React, { Component } from 'react'
import Select, { Creatable, Async } from 'react-select';
import {SelectField, AsyncSelectField} from '../../Utils/renderField/renderField.js'
import { Field } from 'redux-form';
import { SingleDatePicker } from 'react-dates'
import classNames from 'classnames';
import { api } from 'api';

const getClientes = (search, props) => {
    const params ={}
    params.search=search
    params.esCliente = true
    if(props.permisos.visualizar_mis_datos == true){
        params.visualizar_mis_datos = true
        params.id_user = props.id_user
    }
    return api.get("clientes", params).
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

const getVendedores = (search, props) => {
    const params ={}
    params.search=search
    params.is_active = true
    if(props.permisos.visualizar_mis_datos == true){
        params.visualizar_mis_datos = true
        params.id = props.id_user
    }
    return api.get("vendedores", params).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
};

const getEmpresas = (search) => {
    return api.get("empresa", { search }).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
};

export default class ToolbarReporteProductos extends Component {
    state = {
        focusedStart: false,
        focusedEnd: false,
        cliente: null,
        proveedor: null,
        vendedor: null,
        resultados: [],
        resultados2: []
    }
    componentWillMount() {
        let resultados = []
        let resultadosProveedor = []
        resultados = getClientes('', this.props)
        const resul = getVendedores('', this.props)
        resultados.then((valor) => {
            this.setState({ resultados: valor })
        })

        resul.then((valor) => {
            this.setState({ resultados2: valor })
        })
        if(this.props){
            resultadosProveedor = getProveedores('')
            resultadosProveedor.then((valor) => {
                this.setState({ resultadosProveedor: valor })
            })
        }
    }
    getProductos = (search) => {
        let params = {}
        if(search){
            console.log("search ", search);
            params.search = search;
        }
        if (this.props.produccion) {
            // Nada
        } else {
            if(this.props.empresa){
                params.empresa = this.props.empresa;
            }
        }
        return api.get("productos", params).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
    };

    getTipoProducto = (search)  =>{
        return api.get("tipoproducto",{search}).catch((error) => {})
            .then((data) => {
                if (data){
                    let tipoproducto = [];
                    data.results.forEach(x=>{
                        tipoproducto.push({value: x.id, label: x.nombre})
                    })
                    return tipoproducto
                }
                else{
                    return []
                }
            })
            .catch(e => {
                return []
            })
    }

    render() {
        const { empresa, tipoProducto, fecha_inicio, fecha_fin, producto, proveedor } = this.props;
        return (
            <div className="row col-12 p-0">
                <div className="row col-12 m-0 text-lg-left">
                    <div className={"col-lg-3 col-md-4 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Fecha Inicial</span>
                        <SingleDatePicker
                            // className="form-control"
                            placeholder={"Fecha Inicio"}
                            date={fecha_inicio ? fecha_inicio : null}
                            focused={this.state.focusedStart}
                            isOutsideRange={() => false}
                            onDateChange={(value) => {
                                this.props.changeFechaInicio(value)
                            }}
                            onFocusChange={({ focused }) => this.setState({ focusedStart: focused })}
                            numberOfMonths={1}
                            id={"dateStart"}
                            readOnly={true}
                        />
                    </div>
                    <div className={"col-lg-3 col-md-4 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Fecha Final</span>
                        <SingleDatePicker
                            // className="form-control"
                            placeholder={"Fecha Final"}
                            date={fecha_fin ? fecha_fin : null}
                            focused={this.state.focusedEnd}
                            isOutsideRange={() => false}
                            onDateChange={(value) => {
                                this.props.changeFechaFin(value)
                            }}
                            onFocusChange={({ focused }) => this.setState({ focusedEnd: focused })}
                            numberOfMonths={1}
                            id={"dateEnd"}
                            readOnly={true}
                        />
                    </div>
                    <div className={"col-lg-3 col-md-4 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Empresa</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={empresa}
                            isSearchable={true}
                            loadOptions={getEmpresas}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["nombre"])}
                            type="text"
                            onChange={(e) => this.props.changeEmpresa(e)}
                            multi={true}
                            autoload={false}
                            cache={false}
                            className={classNames('react-select-container ')}
                            defaultOptions={true}
                            placeholder="Seleccionar.."
                        />
                    </div>
                    <div className={"col-lg-3 col-md-4 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Tipo Producto</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={tipoProducto}
                            isSearchable={true}
                            loadOptions={this.getTipoProducto}
                            getOptionValue={(option) => (option["value"])}
                            getOptionLabel={(option) => (option["label"])}
                            type="text"
                            onChange={(e) => this.props.changeTipoProducto(e)}
                            multi={true}
                            autoload={false}
                            cache={false}
                            className={classNames('react-select-container ')}
                            defaultOptions={true}
                            placeholder="Seleccionar.."
                        />
                    </div>
                    <div className={"col-lg-3 col-md-4 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Producto</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={producto}
                            isSearchable={true}
                            loadOptions={this.getProductos}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["nombre"])}
                            type="text"
                            onChange={(e) => this.props.changeProducto(e)}
                            multi={true}
                            autoload={false}
                            cache={false}
                            className={classNames('react-select-container ')}
                            defaultOptions={true}
                            placeholder="Seleccionar.."
                        />
                    </div>
                    <div className={"col-lg-3 col-md-4 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Proveedor</span>
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
                </div>
            </div>
        )
    }
}
