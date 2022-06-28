import React, { Component } from 'react'
import Select, { Creatable, Async } from 'react-select';
import {SelectField, AsyncSelectField} from '../../Utils/renderField/renderField.js'
import { Field } from 'redux-form';
import { SingleDatePicker } from 'react-dates'
import classNames from 'classnames';
import { api } from 'api';


const getPilotos = (search) => {
    return api.get("pilotos", { search }).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
};

const getVehiculos = (search) => {
    return api.get("vehiculos", { search, tipo: 1 }).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
};

const getDespachos = (search) => {
    return api.get("despachos", { search, tipo_movimiento: 40, tipo_despacho: 10 }).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
};

export default class ToolbarReportePilotos extends Component {
    state = {
        focusedStart: false,
        focusedEnd: false,
    }

    render() {
        const { fecha_inicio, fecha_fin, piloto, vehiculo, despacho } = this.props;
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
                        <span className="t-azul-claro font-weight-bold">Piloto</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={piloto}
                            isSearchable={true}
                            loadOptions={getPilotos}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["nombre"])}
                            type="text"
                            onChange={(e) => this.props.changePiloto(e)}
                            multi={true}
                            autoload={false}
                            cache={false}
                            className={classNames('react-select-container ')}
                            defaultOptions={true}
                            placeholder="Seleccionar.."
                        />
                    </div>
                    <div className={"col-lg-3 col-md-4 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Vehículo</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={vehiculo}
                            isSearchable={true}
                            loadOptions={getVehiculos}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["nombre"])}
                            type="text"
                            onChange={(e) => this.props.changeVehiculo(e)}
                            multi={true}
                            autoload={false}
                            cache={false}
                            className={classNames('react-select-container ')}
                            defaultOptions={true}
                            placeholder="Seleccionar.."
                        />
                    </div>
                    <div className={"col-lg-3 col-md-4 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Despacho</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={despacho}
                            isSearchable={true}
                            loadOptions={getDespachos}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["no_despacho"])}
                            type="text"
                            onChange={(e) => this.props.changeDespacho(e)}
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
