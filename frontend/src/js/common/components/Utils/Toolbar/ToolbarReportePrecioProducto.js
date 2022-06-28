import React, { Component } from 'react'
import Select, { Creatable, Async } from 'react-select';
import {SelectField, AsyncSelectField} from '../../Utils/renderField/renderField.js'
import { Field } from 'redux-form';
import { SingleDatePicker } from 'react-dates'
import classNames from 'classnames';
import { api } from 'api';


export default class ToolbarReportePrecioProducto extends Component {

    getProductos = (search) => {
        let params = {}
        if(search){
            params.search = search;
        }
        if(this.props.empresa){
            params.empresa = this.props.empresa;
        }
        return api.get("productos", params).
        then((data) => {
            if (data){
                if(!this.props.producto){
                    this.props.changeProducto(data.results[0])
                }
                return data.results;
            }
            return [];
        }).catch(() => {
            return [];
        });
    };

    getClientes = (search) => {
        return api.get("clientes", { search, tipo: 2, esCliente:'1' }).
        then((data) => {
            if (data) return data.results;
            return [];
        }).catch(() => {
            return [];
        });
    };

    render() {
        const { cliente, producto } = this.props;
        return (
            <div className="row col-12 p-0">
                <div className="row col-12 m-0 text-lg-left">
                    <div className={"col-lg-3 col-md-4 col-6 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Cliente</span>
                        <Async
                            isClearable={true}
                            backspaceRemovesValue={false}
                            value={cliente}
                            isSearchable={true}
                            loadOptions={this.getClientes}
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
                    <div className={"col-lg-3 col-md-4 col-6 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Producto</span>
                        <Async
                            //isClearable={true}
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
                </div>
            </div>
        )
    }
}