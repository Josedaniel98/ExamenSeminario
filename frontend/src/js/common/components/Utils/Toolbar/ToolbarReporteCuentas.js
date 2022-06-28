import React, { Component } from 'react'
import Select, { Creatable, Async } from 'react-select';
import classNames from 'classnames';
import { api } from 'api';

import Modal from 'react-responsive-modal';
import { renderCurrency } from '../../Utils/renderField';
import { Field, reduxForm } from 'redux-form';
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';


const getClientes = (search, props) => {
    const params = {}
    params.search = search
    params.esCliente = true
    if(props.permisos){
        if(props.permisos.visualizar_mis_datos){
            params.visualizar_mis_datos = true
            params.id_user = props.id_user
        }
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
    const params = {}
    params.search = search
    if(props.permisos){
        if(props.permisos.visualizar_mis_datos){
            params.id = props.id_user
        }
    }
    params.is_active = true
    return api.get("vendedores", params).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
};

const getEmpresas = (search) => {
    return api.get("empresa/selectempresas", { search, }).
        then((data) => {
            if (data) return data.empresa;
            return [];
        }).catch(() => {
            return [];
        });
};

let estados = [
    { value: 1, label: "Todos" },
    { value: 2, label: "Vigente" },
    { value: 3, label: "Por vencer" },
    { value: 4, label: "Vencido" },
]

let monedas = [
    { value: 'GTQ', label: 'GTQ', simbolo: 'Q' },
    { value: 'USD', label: 'USD', simbolo: '$' },
    { value: 'EUR', label: 'EUR', simbolo: '€' },
    // {value: 'ALL', label:"Todas"},
]


export default class ToolbarReporteCuentas extends Component {
    state = {
        clienteproveedor: this.props.defaultclipro ? this.props.defaultclipro : null,
        asyncValue: this.props.asyncValue ? this.props.asyncValue : null,
        vendedor: null,
        estado: 1,
        resultados: [],
        resultados2: [],
        empresas: [],
        openmodalMonedas: false,
        moneda: 'GTQ',
        tipo_cambio_dolar: 0.13,
        tipo_cambio_euro: 0.12,
        focusedStart: false,
        dateStart: null,
        focusedEnd: false,
        dateEnd: null,
    }
    componentWillMount() {
        let resultados = []

        if (this.props.es_cliente) {
            resultados = getClientes('', this.props)
        }
        else {
            resultados = getProveedores('')
        }
        let empresas = getEmpresas('')
        empresas.then((valor) => {
            this.setState({ empresas: valor })
        });
        const resul = getVendedores('', this.props)

        resultados.then((valor) => {
            this.setState({ resultados: valor })
        })

        resul.then((valor) => {
            this.setState({ resultados2: valor })
        })
    }
    componentDidUpdate(preevprops) {
    }
    handlesubmit = (values) => {
        his.setOpenModalMoneda(false)
        this.setState({
            tipo_cambio_dolar: values.tipo_cambio_dolar,
            tipo_cambio_euro: values.tipo_cambio_euro
        })
        // this.props.cuentasporCOP({
        //     clienteproveedor: this.state.clienteproveedor,
        //     estado: this.state.estado,
        //     moneda: e.value,
        //     tipo_cambio_dolar:  this.state.tipo_cambio_dolar,
        //     tipo_cambio_euro:  this.state.tipo_cambio_euro,
        // }, es_cliente )
    }
    setOpenModalMoneda = (val) => {
        this.setState({ openmodalMonedas: val })
    }
    render() {
        const {
            es_cliente,
            valorEsetado,
            valorMoneda,
            isClearableCliPro,
            vistaOrdenes,
            defaultclipro,
        } = this.props;
        return (
            <div className="row col-12 p-0">
                <Modal
                    open={this.state.openmodalMonedas}
                    onClose={
                        (e) => {
                            this.setOpenModalMoneda(false)
                        }
                    }
                    center
                >
                    <div className="mt-5">
                        <h2 className="text-center text-primary">DATOS TIPO DE CAMBIO</h2>
                    </div>
                    <TipoCambioForm
                        onSubmit={this.handlesubmit}
                        setOpenModalMoneda={this.setOpenModalMoneda}
                        initialValues={{ tipo_cambio_euro: 0, tipo_cambio_dolar: 0 }}
                    />

                </Modal>
                <div className="row col-12 m-0 text-lg-left mb-2">
                    {
                        (!es_cliente) && (
                            <div className="col-lg-4 col-md-6 col-12 align-self-center">
                                <span className="t-azul-claro font-weight-bold">Empresa</span>
                                <Async
                                    isClearable={true}
                                    backspaceRemovesValue={false}
                                    value={this.props.empresa}
                                    isSearchable={true}
                                    loadOptions={getEmpresas}
                                    getOptionValue={(option) => (option["id"])}
                                    getOptionLabel={(option) => (option["nombre"])}
                                    type="text"
                                    onChange={(e) => {
                                        this.props.changeEmpresa(e);
                                        this.props.cuentasporCOP({
                                            clienteproveedor: this.state.clienteproveedor,
                                            vendedor: null,
                                            estado: this.state.estado,
                                            moneda: this.state.moneda,
                                            tipo_cambio_dolar: this.state.tipo_cambio_dolar,
                                            tipo_cambio_euro: this.state.tipo_cambio_euro,
                                        }, es_cliente);
                                    }}
                                    multi={true}
                                    autoload={false}
                                    cache={false}
                                    className={classNames('react-select-container ')}
                                    defaultOptions={this.state.empresas}
                                    placeholder="Seleccionar.."
                                />
                            </div>
                        )
                    }
                    <div className="col-lg-4 col-md-6 col-12 align-self-center">
                        <span className="t-azul-claro font-weight-bold">Fecha Inicial</span>
                        <SingleDatePicker
                            // className="form-control"
                            placeholder={"Fecha Inicio"}
                            // date={this.state.dateStart}
                            date={this.props.fecha_I}
                            focused={this.state.focusedStart}
                            isOutsideRange={() => false}
                            onDateChange={(value) => {
                                this.props.changeFechaPagar(value, 1);
                                this.props.cuentasporCOP({
                                    clienteproveedor: this.state.clienteproveedor,
                                    vendedor: null,
                                    estado: this.state.estado,
                                    moneda: this.state.moneda,
                                    tipo_cambio_dolar: this.state.tipo_cambio_dolar,
                                    tipo_cambio_euro: this.state.tipo_cambio_euro,
                                }, es_cliente);
                            }}
                            onFocusChange={({ focused }) => this.setState({ focusedStart: focused })}
                            numberOfMonths={1}
                            showClearDate={true}
                            id={"dateStart"}
                        />
                    </div>
                    <div className="col-lg-4 col-md-6 col-12 align-self-center">
                        <span className="t-azul-claro font-weight-bold">Fecha Final</span>
                        <SingleDatePicker
                            // className="form-control"
                            placeholder={"Fecha Final"}
                            // date={this.state.dateEnd}
                            date={this.props.fecha_F}
                            focused={this.state.focusedEnd}
                            isOutsideRange={() => false}
                            onDateChange={(value) => {
                                this.props.changeFechaPagar(value, 2);
                                this.props.cuentasporCOP({
                                    clienteproveedor: this.state.clienteproveedor,
                                    vendedor: null,
                                    estado: this.state.estado,
                                    moneda: this.state.moneda,
                                    tipo_cambio_dolar: this.state.tipo_cambio_dolar,
                                    tipo_cambio_euro: this.state.tipo_cambio_euro,
                                }, es_cliente);
                            }}
                            onFocusChange={({ focused }) => this.setState({ focusedEnd: focused })}
                            numberOfMonths={1}
                            showClearDate={true}
                            id={"dateEnd"}
                        />
                    </div>
                </div>
                <div className="row col-12 m-0 text-lg-left">
                    <div className={"col-lg-4 col-md-6 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">{es_cliente ? "Cliente" : "Proveedor"}</span>
                        <Async
                            isClearable={isClearableCliPro}
                            backspaceRemovesValue={false}
                            value={this.props.cliente}
                            isSearchable={true}
                            loadOptions={es_cliente ? (search) => getClientes(search, this.props) : getProveedores}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["nombre"])}
                            type="text"
                            onChange={(e) => {
                                e ? this.setState({ clienteproveedor: e.id, vendedor: null, asyncValue: e ? e : null }) : this.setState({ clienteproveedor: null, vendedor: null })
                                if (this.props.changeCliente) {
                                    e ? this.props.changeCliente(e) : this.props.changeCliente(null)
                                }
                                this.props.cuentasporCOP({
                                    clienteproveedor: e ? e.id : null,
                                    vendedor: null,
                                    estado: this.state.estado,
                                    moneda: this.state.moneda,
                                    tipo_cambio_dolar: this.state.tipo_cambio_dolar,
                                    tipo_cambio_euro: this.state.tipo_cambio_euro,
                                }, es_cliente)
                            }}

                            multi={true}
                            autoload={false}
                            cache={false}
                            className={classNames('react-select-container ')}
                            defaultOptions={this.state.resultados}
                            placeholder="Seleccionar.."
                        />
                    </div>
                    {
                        (es_cliente && !vistaOrdenes) && (
                            <div className="col-lg-4 col-md-6 col-12 align-self-center">
                                <span className="t-azul-claro font-weight-bold">Vendedor</span>
                                <Async
                                    isClearable={true}
                                    backspaceRemovesValue={false}
                                    isSearchable={true}
                                    loadOptions={(search) => getVendedores(search, this.props)}
                                    getOptionValue={(option) => (option["id"])}
                                    getOptionLabel={(option) => (`${option["first_name"]} ${option["last_name"]}`)}
                                    type="text"
                                    onChange={(e) => {
                                        e ? this.setState({ clienteproveedor: null, vendedor: e.id }) : this.setState({ clienteproveedor: null, vendedor: null })
                                        e ? this.props.changeVendedor(e.id) :  this.props.changeVendedor(null)
                                        this.props.cuentasporCOP({
                                            vendedor: e ? e.id : null,
                                            clienteproveedor: null,
                                            estado: this.state.estado,
                                            moneda: this.state.moneda,
                                        }, es_cliente)
                                    }}

                                    // cacheOptions
                                    multi={true}
                                    autoload={false}
                                    cache={false}
                                    className={classNames('react-select-container ')}
                                    defaultOptions={this.state.resultados2}
                                    placeholder="Seleccionar.."
                                />
                            </div>
                        )
                    }
                    {
                        !es_cliente && (
                            <div className="col-lg-4 col-md-6 col-12 align-self-center">
                                <span className="t-azul-claro font-weight-bold">Moneda</span>
                                <Select
                                    isClearable={false}
                                    className={classNames('react-select-container')}
                                    backspaceRemovesValue={false}
                                    isSearchable={true}
                                    options={monedas}
                                    placeholder={"Monedas"}
                                    defaultValue={valorMoneda}
                                    onChange={(e) => {
                                        e && this.setState({ moneda: e.value })
                                        if (e.value === 'ALL') {
                                            this.setOpenModalMoneda(true)
                                        } else {
                                            this.props.cuentasporCOP({
                                                clienteproveedor: this.state.clienteproveedor,
                                                estado: this.state.estado,
                                                moneda: e.value,
                                                vendedor: this.state.vendedor,
                                                // tipo_cambio_dolar:  this.state.tipo_cambio_dolar,
                                                // tipo_cambio_euro:  this.state.tipo_cambio_euro,
                                            }, es_cliente)
                                        }
                                    }}
                                />
                            </div>
                        )
                    }
                    <div className={"col-lg-4 col-md-6 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Estado</span>
                        <Select
                            isClearable={false}
                            className={classNames('react-select-container')}
                            backspaceRemovesValue={false}
                            isSearchable={true}
                            options={estados}
                            placeholder={"Movimiento"}
                            defaultValue={valorEsetado}
                            onChange={(e) => {
                                this.setState({ estado: e.value })
                                this.props.cuentasporCOP(
                                    {
                                        estado: e.value,
                                        clienteproveedor: this.state.clienteproveedor,
                                        vendedor: this.state.vendedor,
                                        moneda: this.state.moneda,
                                        tipo_cambio_dolar: this.state.tipo_cambio_dolar,
                                        tipo_cambio_euro: this.state.tipo_cambio_euro,
                                    },
                                    es_cliente
                                )
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}




class TipoCambioForm extends Component {
    state = {
        dolar: '$. ',
        euro: '€. '
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <form name="TipoCambioForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div className={`form-group has-feedback   col-12 `}>
                        <label className="t-azul" htmlFor="cuenta">Tipo de cambio Dolar a Quetzal</label>
                        <Field
                            name={`tipo_cambio_dolar`}
                            label="tipo_cambio"
                            prefix={this.state.dolar}
                            component={renderCurrency}
                            decimalScale={4}
                            parse={cell => parseFloat(cell)}
                            onChange={(e) => {
                                // console.log(e)
                                //   this.setState({t_cambio: e})
                            }}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="form-group has-feedback col-12">
                        <label className="t-azul" htmlFor="descripcion">Tipo de cambio Euro a Quetzal</label>
                        <Field
                            name={`tipo_cambio_euro`}
                            label="tipo_cambio"
                            prefix={this.state.euro}
                            component={renderCurrency}
                            decimalScale={4}
                            parse={cell => parseFloat(cell)}
                            onChange={(e) => {
                                // console.log(e)
                                //   this.setState({t_cambio: e})
                            }}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-center flex-column flex-sm-row align-items-stretch align-items-sm-center justify-content-sm-around ">
                            <button type="submit" className="btn btn-primary m-1 align-self-center">ACEPTAR</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
};

TipoCambioForm = reduxForm({
    form: 'TipoCambioForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            tipo_cambio_dolar: validators.exists()('Este campo es requerido'),
            tipo_cambio_euro: validators.exists()('Este campo es requerido'),
        });
    },
})(TipoCambioForm);
