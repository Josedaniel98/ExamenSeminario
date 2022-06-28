import React, { Component } from 'react'
import Select, { Creatable, Async } from 'react-select';
import { SingleDatePicker } from 'react-dates'
import classNames from 'classnames';
import { api } from 'api';


const tipos = [
    { value: 1, label: "Ingresos por compras" },
    { value: 2, label: "Ingresos por despachos" },
]

const getProveedores = (search) => {
    return api.get("clientes", { search, esCliente: '' }).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
};


export default class ToolbarReporteIngresosP extends Component {
    state = {
        focusedStart: false,
        focusedEnd: false,
    }

    componentWillMount() {
        let resultados = getProveedores('');
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

    getBodegas = (search) => {
        return api.get("bodega", { search }).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
    };

    render() {
        const { fecha_inicio, fecha_fin, piloto, tipo, bodega, producto, proveedor } = this.props;
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
                        <span className="t-azul-claro font-weight-bold">Tipo de Ingreso</span>
                        <Select
                            isClearable={false}
                            className={classNames('react-select-container')}
                            backspaceRemovesValue={false}
                            isSearchable={true}
                            options={tipos}
                            placeholder={"Tipo"}
                            defaultValue={tipo}
                            onChange={(e) => {
                                this.props.changeTipo(e);
                            }}
                        />
                    </div>
                    <div className={"col-lg-3 col-md-4 col-12 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Bodega</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={bodega}
                            isSearchable={true}
                            loadOptions={this.getBodegas}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["nombre"])}
                            type="text"
                            onChange={(e) => this.props.changeBodega(e)}
                            multi={true}
                            autoload={false}
                            cache={false}
                            className={classNames('react-select-container ')}
                            defaultOptions={true}
                            placeholder="Seleccionar.."
                        />
                    </div>
                    <div className={"col-lg-3 col-md-4 col-12 align-self-center"}>
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
                    <div className={"col-lg-3 col-md-4 col-12 align-self-center"}>
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
                </div>
            </div>
        )
    }
}
