import React, { Component } from 'react'
import Select, { Creatable, Async } from 'react-select';
import {SelectField, AsyncSelectField} from '../../Utils/renderField/renderField.js'
import { Field } from 'redux-form';
import { SingleDatePicker } from 'react-dates'
import classNames from 'classnames';
import { api } from 'api';
import { renderTagsInput } from '../renderField/index.js';
import { TIPOS_DESPACHOS } from '../../../../utility/constants.js';


export default class ToolbarReportePrecioCliente extends Component {
    state= {
        params: {},
        productos: []
    }
    componentWillMount() {
        const { permisos, id_user  } = this.props;
        const visualizar_mis_datos = permisos.visualizar_mis_datos
        const params = {}
        params.tipo = 2
        params.esCliente = 1
        if(visualizar_mis_datos == true){
            params.visualizar_mis_datos = true
            params.id_user = id_user
        } 
        this.setState({params: params})
        this.props.selectClientes(params)
    }
    getProductos = (search) => {
        let params = {}
        if(search){
            params.search = search;
        }
        if(this.props.empresa){
            params.empresa = this.props.empresa;
        }
        if(this.props.cliente){
            params.cliente = this.props.cliente.id
        }
        return api.get("productos/select_productos_cliente", params).
        then((data) => {
            if (data) this.setState({productos: data});
            return [];
        }).catch(() => {
            return [];
        });
    };

    getClientes = (search) => {
        const visualizar_mis_datos = this.props.permisos.visualizar_mis_datos
        const id_user = this.props.id_user
        const params = {}
        params.search = search
        params.tipo = 2
        params.esCliente = 1
        if(visualizar_mis_datos == true){
            params.visualizar_mis_datos = true
            params.id_user = id_user
        }
        return api.get("clientes", params).
        then((data) => {
            if (data){
                this.props.selectProductos(data.results[0])
                return data.results;
            }
            return [];
        }).catch(() => {
            return [];
        });
    };

    format = (array=[]) =>{
        const nuevoArray = [];
        array.forEach((item,index) => {
            nuevoArray[index]={"label": item.nombre , "value": item.id}
        });
        return nuevoArray
    }

    render() {
        const { cliente, producto, 
            changeEmpresa,
            empresas,
            changeTipo,
            tipos,
            changeVendedor,
            vendedores,
            clientes,
            vendedor,
            productos } = this.props;
        return (
            <div className="row col-12 p-0">
                <div className="row col-12 m-0 text-lg-left">
                <div className={"col-lg-3 col-md-4 col-6 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Cliente</span>
                        {
                            vendedor.length > 0 ?
                            <Select
                            isMulti
                            className={classNames('react-select-container')}
                            backspaceRemovesValue={true}
                            isSearchable={true}
                            cache={false}
                            options={this.format(clientes? clientes :[])}
                            placeholder={"Seleccionar..."}
                            value={cliente}
                            onChange={(e, action)=>{console.log(e, action); this.props.changeCliente(e); this.props.selectProductos(e)}}
                        />
                            :
                            <Async
                            backspaceRemovesValue={false}
                            value={cliente}
                            isSearchable={true}
                            isMulti
                            loadOptions={this.getClientes}
                            getOptionValue={(option) => (option["id"])}
                            getOptionLabel={(option) => (option["nombre"])}
                            type="text"
                            onChange={(e) => {this.props.changeCliente(e); this.props.selectProductos(e);} }
                            multi={true}
                            autoload={false}
                            cache={false}
                            className={classNames('react-select-container ')}
                            defaultOptions={true}
                            placeholder="Seleccionar.."
                        />
                        }
                       
                    </div>
                    <div className={"col-lg-3 col-md-4 col-6 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Producto</span>
                        <Select
                            isClearable={true}
                            className={classNames('react-select-container')}
                            backspaceRemovesValue={true}
                            isSearchable={true}
                            isMulti
                            cache={false}
                            options={this.format(productos? productos :[])}
                            placeholder={"Seleccionar..."}
                            onChange={(e, action)=>{console.log(e, action); this.props.changeProducto(e)}}
                        />
                    </div>
                    <div className={"col-lg-3 col-md-4 col-6 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Empresa</span>
                        <Select
                            isClearable={true}
                            className={classNames('react-select-container')}
                            backspaceRemovesValue={true}
                            isSearchable={true}
                            options={this.format(empresas? empresas:[])}
                            placeholder={"Empresa"}
                            // value={null}
                            onChange={(e, action)=>{console.log(e, action); changeEmpresa(e)}}
                        />
                    </div>
                    <div className={"col-lg-3 col-md-4 col-6 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Tipo producto</span>
                        <Select
                            isClearable={true}
                            className={classNames('react-select-container')}
                            backspaceRemovesValue={true}
                            isSearchable={true}
                            isMulti
                            options={this.format(tipos ? tipos:[])}
                            placeholder={"Tipo"}
                            // value={null}
                            onChange={(e, action)=>{console.log(e, action); changeTipo(e)}}
                        />
                    </div>
                    <div className={"col-lg-3 col-md-4 col-6 align-self-center"}>
                        <span className="t-azul-claro font-weight-bold">Vendedor</span>
                        <Select
                            isClearable={true}
                            className={classNames('react-select-container')}
                            backspaceRemovesValue={true}
                            isSearchable={true}
                            isMulti
                            options={this.format(vendedores ? vendedores:[])}
                            placeholder={"Vendedor"}
                            // value={null}
                            onChange={(e, action)=>{console.log(e, action); changeVendedor(e) ;this.props.changeCliente([]); this.props.selectProductos(null); e? this.props.selectClientes(this.state.params, e ? e.value: null): ""}}
                        />
                    </div>
                </div>
            </div>
        )
    }
}