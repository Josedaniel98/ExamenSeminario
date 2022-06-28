import React, { Component } from 'react'
import Select, { Creatable, Async } from 'react-select';
import { SingleDatePicker } from 'react-dates'
import classNames from 'classnames';
import { api } from 'api';


export default class ToolbarReporteAusencias extends Component {
    state = {
        focusedStart: false,
        focusedEnd: false,
    }
    getEmpleados = (search) => {
        let params = {}
        if(search){
            params.search = search;
        }
        return api.get("empleados", { search }).
            then((data) => {
                if (data){
                    // if(!this.props.empleado){
                    //     this.props.changeEmpleado(data.results[0])
                    // }
                    return data.results;
                }
                return [];
            }).catch(() => {
                return [];
            });
    };

    getEmpresas = (search) => {
        let params = {}
        if(search){
            params.search = search;
        }
        return api.get("empresa", params ).
        then((data) => {
            if (data){
                return data.results;
            }
            return [];
        }).catch(() => {
            return [];
        });
    };

    componentWillMount() {
        // let resultados = getEmpleados('')
    }

    render() {
        const { empleado, empresa, fecha_inicio, fecha_fin } = this.props;
        return (
            <div className="row col-12 p-0">
                <div className="row col-12 m-0 text-lg-left">
                    <div className={"col-lg-3 col-md-4 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Empleado</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={empleado}
                            isSearchable={true}
                            loadOptions={this.getEmpleados}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["nombre_completo"])}
                            type="text"
                            onChange={(e) => this.props.changeEmpleado(e)}
                            multi={true}
                            autoload={false}
                            cache={false}
                            className={classNames('react-select-container ')}
                            defaultOptions={true}
                            placeholder="Seleccionar.."
                        />
                    </div>
                    <div className={"col-lg-3 col-md-4 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Empresa</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={empresa}
                            isSearchable={true}
                            loadOptions={this.getEmpresas}
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
                        />
                    </div>
                </div>
            </div>
        )
    }
}
