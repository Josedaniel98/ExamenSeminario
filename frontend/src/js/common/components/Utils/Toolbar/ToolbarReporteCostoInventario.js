import React, { Component } from 'react'
import Select, { Creatable, Async } from 'react-select';
import {SelectField, AsyncSelectField} from '../../Utils/renderField/renderField.js'
import { Field } from 'redux-form';
import { SingleDatePicker } from 'react-dates'
import classNames from 'classnames';
import { api } from 'api';


export default class ToolbarReporteCostoInventario extends Component {

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
                return data.results;
            }
            return [];
        }).catch(() => {
            return [];
        });
    };

    getBodegas = (search) => {
        return api.get("bodega", { search }).
        then((data) => {
            if (data) {
                let bodegas = [];
                data.results.forEach(item => {
                    if(item.id != this.props.bodega){
                        bodegas.push(item);
                    }
                });
                return bodegas;
            };
            return [];
        }).catch(() => {
            return [];
        });
    };

    render() {
        const { bodega, producto } = this.props;
        return (
            <div className="row col-12 p-0">
                <div className="row col-12 m-0 text-lg-left">
                    <div className={"col-lg-3 col-md-4 col-6 align-self-center"}>
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
                    <div className={"col-lg-3 col-md-4 col-6 align-self-center"}>
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
                </div>
            </div>
        )
    }
}