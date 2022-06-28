import React, { Component } from 'react';
import "./toolbar.css";
import Search from "./search"
import Select, { Creatable, Async } from 'react-select';
import classNames from 'classnames';

import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize';
import moment from 'moment';
import es from 'moment/locale/es';
import 'react-dates/lib/css/_datepicker.css';

let movimientos = [
    {id: true, value: true, label:"Ingreso"},
    {id: false, value: false, label:"Egreso"},
]

export default class ToolbarCaja extends Component {
    state = {
        dateStart: moment.now(),
        focusedStart: false,

        dateEnd: moment.now(),
        focusedEnd: false,
    }

    render() {
        return (
            <div className="row col-12 p-0">
                <div className="row col-12 m-0 text-lg-left">
                    <div className={"col-lg-3 col-md-3 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Fecha Inicial</span>
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
                    <div className={"col-lg-3 col-md-3 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Fecha Final</span>
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
                    <div className={"col-lg-3 col-md-3 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Movimiento</span>
                        <Select
                            isClearable={true}
                            className={classNames('react-select-container')}
                            backspaceRemovesValue={false}
                            isSearchable={true}
                            options={movimientos}
                            placeholder={"Movimiento"}
                            value={this.props.valorMovimiento}
                            onChange={this.props.changeMovimiento}
                                />
                    </div>
                    {(this.props.buscar !== undefined) && (
                        <div className="col-lg-3 col-md-3 mt-2 text-right search d-flex align-items-end">
                            <Search buscar={this.props.buscar} buscador={this.props.buscador} placeholder={this.props.placeholder} />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
