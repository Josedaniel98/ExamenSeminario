import React, { Component } from 'react';
import "./toolbar.css";
import Search from "./search"
import { Link, Redirect } from 'react-router-dom';


export default class ToolbarSimple extends Component {

  render() {
    return (
      <div className={`col-12 p-0 m-0 ${this.props.margen ? "" : "px-4"} row d-flex justify-content-center justify-content-md-end`}>


        {
          this.props.estatefilterBar && (
            <div className="col-lg-4 col-md-4 col-12 p-0 pr-md-3 pb-2">
              {this.props.filterbar}
            </div>
          )
        }
        <div className={`col-lg-4 col-md-4 p-0 search ${this.props.margen}`}>

          {(this.props.buscar !== undefined) && (
            <Search buscar={this.props.buscar} buscador={this.props.buscador} placeholder={this.props.placeholder} />
          )}


        </div>
        {
          (this.props.splitboton) && (
            <div className="col-auto pr-md-0 pt-3 pt-md-0">
              {this.props.splitboton}
             </div>
          )
        }
        {
          (this.props.textBoton) && (
            <div className="col-auto pr-md-0 pt-3 pt-md-0">
              <Link className={`btn btn-${this.props.textBoton2 ? 'secondary' : 'primary'} text-uppercase`} to={this.props.ruta}>{this.props.textBoton}</Link>
            </div>
          )
        }

        {
          (this.props.textBoton2) && (
            <div className="col-auto pr-md-0 pt-3 pt-md-0">
              <Link className="btn btn-primary text-uppercase" to={this.props.ruta2}>{this.props.textBoton2}</Link>
            </div>
          )
        }

      </div>
    )
  }
}
