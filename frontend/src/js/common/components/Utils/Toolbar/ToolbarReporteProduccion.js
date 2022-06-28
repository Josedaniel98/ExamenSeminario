import React, { Component } from 'react'
import Select, { Creatable, Async } from 'react-select';
import { SingleDatePicker } from 'react-dates'
import classNames from 'classnames';
import { api } from 'api';

const getTipoProducto = (search)  =>{
    return api.get("tipoproducto",{search}).catch((error) => {})
            .then((data) => {
                if (data){
                    // tipoproducto = [];
                    // data.results.forEach(x=>{
                    //     tipoproducto.push({value: x.id, label: x.nombre})
                    // })
                    return data.results;
                }
                else{
                    return []
                }
            })
            .catch(e => {
                return []
            })
}

const getVendedores = (search) => {
    return api.get("vendedores", { search, is_active: true }).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
};

const getClientes = (search) => {
    return api.get("clientes", { search, esCliente: true }).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
};

export default class ToolbarReporteCobros extends Component {
    state = {
        focusedStart: false,
        focusedEnd: false,
    }

    componentWillMount() {
        let resultados = getVendedores('');
        let resultados2 = getClientes('');
    }

    render() {
        const { cliente, vendedor ,fecha_inicio, fecha_fin, tipo_producto } = this.props;
        return (
            <div className="row col-12 p-0">
                <div className="row col-12 m-0 text-lg-left">
                    <div className={"col-lg-3 col-md-3 col-12 align-self-center"}>
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
                            displayFormat="MMMM/YYYY"
                        />
                    </div>
                    <div className={"col-lg-3 col-md-3 col-12 align-self-center"}>
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
                            displayFormat="MMMM/YYYY"
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
                        <span className="t-azul-claro font-weight-bold">Vendedor</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={vendedor}
                            isSearchable={true}
                            loadOptions={getVendedores}
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
                </div>
            </div>
        )
    }
}
