import React, { Component } from 'react'
import Select, { Creatable, Async } from 'react-select';
import { SingleDatePicker } from 'react-dates';
import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale('es', es)

import classNames from 'classnames';
import moment from 'moment';
import { api } from 'api';

const getTipoProducto = (search) => {
    return api.get("tipoproducto", { search }).catch((error) => { })
        .then((data) => {
            if (data) {
                return data.results;
            }
            else {
                return []
            }
        })
        .catch(e => {
            return []
        })
}

const getClientes = (search) => {
    return api.get("clientes", { search, esCliente: true }).
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

export default class ToolbarReporteCostoVenta extends Component {
    state = {
        focusedStart: false,
        focusedEnd: false,
    }

    componentWillMount() {
        let resultados = getClientes('');
        let resultados2 = getEmpresas('');
        let resultados3 = getTipoProducto('');
    }

    getProductos = (search) => {
        let params = {}
        if(search){
            console.log("search ", search);
            params.search = search;
        }
        return api.get("productos", params).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
    };

    render() {
        const { fecha_inicio, fecha_fin ,empresa, cliente, producto, tipo_producto } = this.props;
        return (
            <div className="row col-12 p-0">
                <div className="row col-12 m-0 text-lg-left">
                    <div className={"col-lg-3 col-md-3 col-12 align-self-center d-flex flex-column"}>
                        <span className="t-azul-claro font-weight-bold">Fecha Inicio</span>
                        <DatePicker
                            selected={new Date(fecha_inicio)}
                            onChange={value => {
                                this.props.changeFechaInicio(moment(value))
                            }}
                            className="form-control text-date d-flex flex-column flex-1"
                            dateFormat="MMMM/yyyy"
                            locale="es"
                            showMonthYearPicker
                        />
                    </div>
                    <div className={"col-lg-3 col-md-3 col-12 align-self-center d-flex flex-column"}>
                        <span className="t-azul-claro font-weight-bold">Fecha Fin</span>
                        <DatePicker
                            selected={new Date(fecha_fin)}
                            onChange={value => {
                                this.props.changeFechaFin(moment(value))
                            }}
                            className="form-control text-date d-flex flex-column flex-1"
                            dateFormat="MMMM/yyyy"
                            locale="es"
                            showMonthYearPicker
                        />
                    </div>
                    <div className={"col-lg-3 col-md-3 col-12 align-self-center"}>
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
                    <div className={"col-lg-3 col-md-3 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Cliente</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={cliente}
                            isSearchable={true}
                            loadOptions={getClientes}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["nombre"])}
                            type="text"
                            onChange={(e) => this.props.changeCliente(e)}
                            multi={true}
                            autoload={false}
                            cache={false}
                            className={classNames('react-select-container ')}
                            defaultOptions={true}
                            placeholder="Seleccionar.."
                        />
                    </div>
                    <div className={"col-lg-3 col-md-3 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Tipo de Producto</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={tipo_producto}
                            isSearchable={true}
                            loadOptions={getTipoProducto}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["nombre"])}
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
                    <div className={"col-lg-3 col-md-3 col-12 align-self-center"}>
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
                </div>
            </div>
        )
    }
}
