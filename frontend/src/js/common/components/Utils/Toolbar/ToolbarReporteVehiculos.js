import React, { Component } from 'react'
import Select, { Creatable, Async } from 'react-select';
import { SingleDatePicker } from 'react-dates'
import classNames from 'classnames';
import { api } from 'api';

const getMaquinariaVehiculos = (search) => {
    return api.get("vehiculos", { search }).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
};

export default class ToolbarReporteVehiculos extends Component {
    state = {
        focusedStart: false,
        focusedEnd: false,
    }

    componentWillMount() {
        let resultados = getMaquinariaVehiculos('')
    }

    render() {
        const { vehiculo, fecha_inicio, fecha_fin } = this.props;
        return (
            <div className="row col-12 p-0">
                <div className="row col-12 m-0 text-lg-left">
                    <div className={"col-lg-4 col-md-4 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Maquinaria/Vehículo</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={vehiculo}
                            isSearchable={true}
                            loadOptions={getMaquinariaVehiculos}
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
                    <div className={"col-lg-4 col-md-4 col-12 align-self-center"}>
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
                    <div className={"col-lg-4 col-md-4 col-12 align-self-center"}>
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
