import React, { Component } from 'react'
import Select, { Creatable, Async } from 'react-select';
import classNames from 'classnames';
import {api} from 'api';


const tipos_cheques = [
    {value: 'true', label: 'Ingreso'},
    {value: 'false', label: 'Egreso'},
]
let estado = [
    {id: true, value: true, label:"Activos"},
    {id: false, value: false, label: "Anulados"},
]


export default class ToolbarReporteFlotantes extends Component {
    render() {
        const {
            cuentas_banco,
            es_tarjeta,
            es_deposito,
            filtro_poss,
            change_poss,
            valor_filtro,
            getPoss,
            valor_filtro_tipo,
            changeTipoFiltro,
            changeEstadoFiltro
        } = this.props;
        return (
            <div className="row col-12 m-0 text-lg-left">
                {(!es_deposito) ? (
                
                <div className={`col-lg-3 col-md-3 col-12 align-self-center`}>
                    <span className="t-azul-claro font-weight-bold">{es_tarjeta ? 'Poss' : 'Cuentas'}</span>
                        {
                            (es_tarjeta) ? (
                                <Async
                                    backspaceRemovesValue={false}
                                    isSearchable={true}
                                    value={filtro_poss}
                                    loadOptions={getPoss}
                                    getOptionValue={(option) => (option["id"])}
                                    getOptionLabel={(option) => (option["nombre"])}
                                    type="text"
                                    onChange={(e) => {
                                        change_poss(e)
                                    }}
                                    defaultOptions={true}
                                    multi={false}
                                    autoload={false}
                                    cache={false}
                                    className={classNames('react-select-container ')}
                                    placeholder="Seleccionar.."
                                />
                            )   : (
                                <select
                                    value={valor_filtro}
                                    key={`cuenta`}
                                        onChange={(e) => {
                                                this.props.changeFiltro(e.target.value);
                                        }}
                                    className={'form-control'}>
                                    <option  value="" className="select-text-default" style={{color: '#918080'}}>
                                        Seleccione
                                    </option>);
                                    {cuentas_banco.map((opcion, index) => {
                                        return (<option
                                            key={typeof (opcion) === "string"+ "s"? opcion : String(opcion["id"])+"cuenta_filtro"}
                                            value={typeof (opcion) === "string" ? opcion : opcion["id"]}>
                                            {opcion["label"]}
                                        </option>);
                                    })}
                                </select>
                            )
                        }

                </div>
                ):""}
                {
                    (changeTipoFiltro) && (
                        <div className={`col-lg-3 col-md-3 col-12 align-self-center`}>
                            <span className="t-azul-claro font-weight-bold">Tipo</span>
                                        <select
                                            value={valor_filtro_tipo}
                                            key={`tipo`}
                                                onChange={(e) => {
                                                    this.props.changeTipoFiltro(e.target.value);
                                                }}
                                            className={'form-control'}>
                                            <option  value="" className="select-text-default" style={{color: '#918080'}}>
                                                Seleccione
                                            </option>);
                                            {tipos_cheques.map((opcion, index) => {
                                                return (<option
                                                    key={typeof (opcion) === "string"+ "s"? opcion : String(opcion["id"])+"ssd"}
                                                    value={typeof (opcion) === "string" ? opcion : opcion["id"]}>
                                                    {opcion["label"]}
                                                </option>);
                                            })}
                                        </select>
                        </div>
                    )
                }
                    {
                    (changeEstadoFiltro) && (
                        <div className={`col-lg-3 col-md-3 col-12 align-self-center`}>
                            <span className="t-azul-claro font-weight-bold">Estado</span>
                            <Select
                            isClearable={false}
                            className={classNames('react-select-container')}
                            backspaceRemovesValue={false}
                            isSearchable={true}
                            options={estado}
                            placeholder={"Estado"}
                            value={this.props.valorEstado}
                            onChange={this.props.changeEstado}
                        />
                        </div>
                    )
                    }
            </div>
        )
    }
}
