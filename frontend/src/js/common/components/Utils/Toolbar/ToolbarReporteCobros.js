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
                // tipoproducto = [];
                // data.results.forEach(x=>{
                //     tipoproducto.push({value: x.id, label: x.nombre})
                // })
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

let monedas = [
    { value: 'GTQ', label: 'GTQ', simbolo: 'Q. ' },
    { value: 'USD', label: 'USD', simbolo: '$. ' },
    { value: 'EUR', label: 'EUR', simbolo: '€. ' },
    // {value: 'ALL', label:"Todas"},
]

export default class ToolbarReporteCobros extends Component {
    state = {
        focusedStart: false,
        focusedEnd: false,
    }

    componentWillMount() {
        let resultados = getVendedores('', this.props);
        let resultados2 = getClientes('', this.props);
    }
    format = (array=[]) =>{
        const nuevoArray = [];
        array.forEach((item,index) => {
            nuevoArray[index]={"label": item.nombre , "value": item.id}
        });
        return nuevoArray
    }

    render() {
        const { cliente, vendedor, fecha_inicio, fecha_fin, tipo_producto, empresas, changeEmpresa, proveedor, moneda } = this.props;
        return (
            <div className="row col-12 p-0">
                <div className="row col-12 m-0 text-lg-left">
                    <div className={"col-lg-3 col-md-3 col-12 align-self-center d-flex flex-column"}>
                        <span className="t-azul-claro font-weight-bold">Fecha Inicial</span>
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
                        <span className="t-azul-claro font-weight-bold">Fecha Final</span>
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
                    {
                        !this.props.es_pagar && (
                            <div className={"col-lg-3 col-md-3 col-12 align-self-center"}>
                                <span className="t-azul-claro font-weight-bold">Cliente</span>
                                <Async
                                    isClearable={true}
                                    backspaceRemovesValue={false}
                                    value={cliente}
                                    isSearchable={true}
                                    loadOptions={(search) => getClientes(search, this.props)}
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
                        )
                    }
                    {
                        this.props.es_pagar && (
                            <div className={"col-lg-3 col-md-3 col-12 align-self-center"}>
                                <span className="t-azul-claro font-weight-bold">Proveedor</span>
                                <Async
                                    isClearable={true}
                                    backspaceRemovesValue={false}
                                    value={proveedor}
                                    isSearchable={true}
                                    loadOptions={getProveedores}
                                    getOptionValue={(option) => (option["id"])}
                                    getOptionLabel={(option) => (option["nombre"])}
                                    type="text"
                                    onChange={(e) => this.props.changeProveedor(e)}
                                    multi={true}
                                    autoload={false}
                                    cache={false}
                                    className={classNames('react-select-container ')}
                                    defaultOptions={true}
                                    placeholder="Seleccionar.."
                                />
                            </div>
                        )
                    }
                    {
                        !this.props.es_pagar && (
                            <div className={"col-lg-3 col-md-3 col-12 align-self-center"}>
                                <span className="t-azul-claro font-weight-bold">Vendedor</span>
                                    <Async
                                        isClearable={true}
                                        backspaceRemovesValue={false}
                                        value={vendedor}
                                        isSearchable={true}
                                        loadOptions={(search) => getVendedores(search, this.props)}
                                        getOptionValue={(option) => (option["id"])}
                                        getOptionLabel={(option) => (option["nombre"])}
                                        type="text"
                                        onChange={(e) => this.props.changeVendedor(e)}
                                        multi={true}
                                        autoload={false}
                                        cache={false}
                                        className={classNames('react-select-container ')}
                                        defaultOptions={true}
                                        placeholder="Seleccionar.."
                                    />
                            </div>
                        )
                    }
                    {
                        this.props.tproducto && (
                            <div className={"col-lg-3 col-md-3 col-12 align-self-center"}>
                                <span className="t-azul-claro font-weight-bold">Tipo de producto</span>
                                <Async
                                    isClearable={true}
                                    backspaceRemovesValue={false}
                                    value={tipo_producto}
                                    isSearchable={true}
                                    loadOptions={getTipoProducto}
                                    getOptionValue={(option) => (option["id"])}
                                    getOptionLabel={(option) => (option["nombre"])}
                                    type="text"
                                    onChange={(e) => this.props.changeTproducto(e)}
                                    multi={true}
                                    autoload={false}
                                    cache={false}
                                    className={classNames('react-select-container ')}
                                    defaultOptions={true}
                                    placeholder="Seleccionar.."
                                />
                            </div>
                        )
                    }
                    <div className={"col-lg-3 col-md-3 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Empresa</span>
                        <Select
                            isClearable={true}
                            className={classNames('react-select-container')}
                            backspaceRemovesValue={true}
                            isSearchable={true}
                            options={this.format(empresas? empresas:[])}
                            placeholder={"Empresa"}
                            // value={null}
                            onChange={(e, action)=>{console.log(e, action); changeEmpresa(e)}}
                        />
                    </div>
                    {
                        this.props.es_pagar && (
                            <div className={"col-lg-3 col-md-3 col-12 align-self-center"}>
                                <span className="t-azul-claro font-weight-bold">Moneda</span>
                                <Select
                                    isClearable={false}
                                    className={classNames('react-select-container')}
                                    backspaceRemovesValue={false}
                                    isSearchable={true}
                                    options={monedas}
                                    placeholder={"Monedas"}
                                    defaultValue={moneda}
                                    onChange={(e) => {
                                        this.props.changeMoneda(e)
                                    }}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
