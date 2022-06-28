import React, { Component, Fragment } from 'react'
import Select, { Creatable, Async } from 'react-select';
import classNames from 'classnames';
import { api } from 'api';
import { relativeTimeThreshold } from 'moment';


import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize';
import moment from 'moment';
import es from 'moment/locale/es';
import 'react-dates/lib/css/_datepicker.css';



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

const getEmpresas = (search) => {
    return api.get("empresa", { search, }).
        then((data) => {
            if (data) return data.results;
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

let meses = [
    { id: 1, value: 1, label: "Enero" },
    { id: 2, value: 2, label: "Febrero" },
    { id: 3, value: 3, label: "Marzo" },
    { id: 4, value: 4, label: "Abril" },
    { id: 5, value: 5, label: "Mayo" },
    { id: 6, value: 6, label: "Junio" },
    { id: 7, value: 7, label: "Julio" },
    { id: 8, value: 8, label: "Agosto" },
    { id: 9, value: 9, label: "Septiembre" },
    { id: 10, value: 10, label: "Octubre" },
    { id: 11, value: 11, label: "Noviembre" },
    { id: 12, value: 12, label: "Diciembre" }
]

let years = []

function getYears() {
    years = [];
    let date = new Date();
    let year = date.getFullYear();
    for (let i = year; i >= 2017; i--) {
        years.push({ id: i, value: i, label: i })
    }
}

export default class ToolbarReporteIngreso extends Component {
    state = {
        clienteproveedor: null,
        vendedor: null,
        estado: 1,
        resultados: [],

        dateStart: moment.now(),
        focusedStart: false,
        dateEnd: moment.now(),
        focusedEnd: false,
    }
    componentWillMount() {
        let resultados = []
        getYears()

        if (this.props.es_cliente) {
            resultados = getClientes('')
        }
        else {
            resultados = getProveedores('')
        }

        resultados.then((valor) => {
            this.setState({ resultados: valor })
        })

    }
    componentDidUpdate(preevprops) {
    }
    render() {
        const {
            es_cliente,
            valorEsetado,
            valorMes,
            changeMes,
            valorAnio,
            changeAnio,
            filtro_mes,
            filtro_fechas,
            change_empresa,
            filtro_empresa
        } = this.props;
        return (
            <div className="row col-12 m-0 text-lg-left">
                <div className={`col-lg-3 col-md-3 col-12 align-self-center`}>
                    <span className="t-azul-claro font-weight-bold">Empresa</span>
                    <Async
                        isClearable={true}
                        backspaceRemovesValue={false}
                        isSearchable={true}
                        value={this.filtro_empresa}
                        loadOptions={getEmpresas}
                        getOptionValue={(option) => (option["id"])}
                        getOptionLabel={(option) => (option["nombre"])}
                        type="text"
                        onChange={(e) => {
                            change_empresa(e)
                        }}
                        defaultOptions={true}
                        multi={true}
                        autoload={false}
                        cache={false}
                        className={classNames('react-select-container ')}
                        placeholder="Seleccionar.."
                    />
                </div>
                {
                    !filtro_mes &&
                    <Fragment>
                        <div className="col-lg-3 col-md-3 col-sm-3  col-12 ">
                            <span className="t-azul-claro font-weight-bold">Año</span>
                            <Select
                                isClearable={false}
                                className={classNames('react-select-container')}
                                backspaceRemovesValue={false}
                                isSearchable={true}
                                options={years}
                                placeholder={"Año"}
                                value={this.props.anio_general}
                                onChange={this.props.change_anio}
                            />
                        </div>
                    </Fragment>
                }
{/*                 {
                    (filtro_mes) ? (
                        <Fragment>
                            {/* <div className="col-lg-3 col-md-3 col-sm-3  col-12 ">
                                <span className="t-azul-claro font-weight-bold">Año</span>
                                <Select
                                    isClearable={false}
                                    className={classNames('react-select-container')}
                                    backspaceRemovesValue={false}
                                    isSearchable={true}
                                    options={years}
                                    placeholder={"Año"}
                                    value={this.props.anio}
                                    onChange={this.props.set_anio}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3  col-12 ">
                                <span className="t-azul-claro font-weight-bold">Mes</span>
                                <Select
                                    isClearable={false}
                                    className={classNames('react-select-container')}
                                    backspaceRemovesValue={false}
                                    isSearchable={true}
                                    options={meses}
                                    placeholder={"Mes"}
                                    value={this.props.mes}
                                    onChange={this.props.set_mes}
                                />
                            </div>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <div className="col-lg-3 col-md-3 col-sm-3  col-12 ">
                                    <span className="t-azul-claro font-weight-bold">Año</span>
                                    <Select
                                        isClearable={false}
                                        className={classNames('react-select-container')}
                                        backspaceRemovesValue={false}
                                        isSearchable={true}
                                        options={years}
                                        placeholder={"Año"}
                                        value={this.props.anio_general}
                                        onChange={this.props.change_anio}
                                    />
                                </div>
                            </Fragment>
                        )
                } */}
                {
                    (filtro_fechas) && (
                        <Fragment>
                            <div className="col-lg-3 col-md-3 col-sm-3  col-12 ">
                                <span className="t-azul-claro font-weight-bold">Fecha Inicial</span>
                                <SingleDatePicker
                                    // className="form-control"
                                    placeholder={"Fecha Inicio"}
                                    date={this.props.fecha_inicio ? moment(this.props.fecha_inicio) : null}
                                    focused={this.state.focusedStart}
                                    isOutsideRange={() => false}
                                    onDateChange={(value) => {
                                        this.props.change_fechaI(value, true)
                                    }}
                                    onFocusChange={({ focused }) => this.setState({ focusedStart: focused })}
                                    numberOfMonths={1}
                                    id={"dateStart"}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3  col-12 ">
                                <span className="t-azul-claro font-weight-bold">Fecha Final</span>
                                <SingleDatePicker
                                    // className="form-control"
                                    placeholder={"Fecha Final"}
                                    date={this.props.fecha_final ? moment(this.props.fecha_final) : null}
                                    focused={this.state.focusedEnd}
                                    isOutsideRange={() => false}
                                    onDateChange={(value) => {
                                        this.props.change_fechaF(value, true)
                                    }}
                                    onFocusChange={({ focused }) => this.setState({ focusedEnd: focused })}
                                    numberOfMonths={1}
                                    id={"dateEnd"}
                                />
                            </div>
                        </Fragment>
                    )
                }
            </div>
        )
    }
}

