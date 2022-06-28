import React, { Component, Fragment } from 'react'
import Select, { Creatable, Async } from 'react-select';
import classNames from 'classnames';
import { api } from 'api';

import 'react-dates/initialize';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates'

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
    { value: 2, label: "Pendientes" },
    { value: 3, label: "Completados" },
]


export default class ToolbarSI extends Component {
    state = {
        focusedStart: false,
        dateStart: null,
        focusedEnd: false,
        dateEnd: null,
    }
    render() {
        const {
            change_empresa1,
            change_empresa2,
            change_estado,
            valor_estado
        } = this.props;
        return (
            <div className="row col-12 p-0">
                <div className="row col-12 m-0 text-lg-left mb-2">
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
                                this.props.changeFechaSI(value, 1);
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
                                this.props.changeFechaSI(value, 2);
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
                        <span className="t-azul-claro font-weight-bold">Solicitado por</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            isSearchable={true}
                            value={this.props.empresa1}
                            loadOptions={getEmpresas}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["nombre"])}
                            type="text"
                            onChange={(e) => {
                                change_empresa1(e)
                                this.setState({empresa: e});
                            }}
                            defaultOptions={true}
                            multi={true}
                            autoload={false}
                            cache={false}
                            className={classNames('react-select-container ')}
                            placeholder="Seleccionar.."
                        />
                    </div>
                    <div className={"col-lg-4 col-md-6 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Solicitado desde</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            isSearchable={true}
                            value={this.props.empresa2}
                            loadOptions={getEmpresas}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["nombre"])}
                            type="text"
                            onChange={(e) => {
                                change_empresa2(e)
                            }}
                            defaultOptions={true}
                            multi={true}
                            autoload={false}
                            cache={false}
                            className={classNames('react-select-container ')}
                            placeholder="Seleccionar.."
                        />
                    </div>
                    <div className={"col-lg-4 col-md-6 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Estado de la solicitud</span>
                        <Select
                            isClearable={false}
                            className={classNames('react-select-container')}
                            backspaceRemovesValue={false}
                            isSearchable={true}
                            options={estados}
                            placeholder={"Estado"}
                            value={valor_estado}
                            onChange={(e) => change_estado(e)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

