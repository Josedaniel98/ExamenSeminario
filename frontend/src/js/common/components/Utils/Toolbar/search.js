import React, { Component } from 'react';
import './toolbar.css';

class Search extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { buscar, buscador, placeholder } = this.props;
    return (
      <div className="col-12  toolbar-search p-0">

        {(buscador !== undefined && buscar !== undefined) && (
          <div className="contenedor-search">
              {/* <button
                className="form-control-feedback boton-busqueda"
                onClick={(event) => {
                    event.preventDefault();
                    this.props.buscar(this.buscar.value);
                  }}>
                  <img src={require("../../../../../assets/img/icons/buscar.png")} alt=""/>
            </button> */}
            <input id="buscar" type="text" name="buscar" placeholder={placeholder}
                   ref={node => {
                     this.buscar = node;
                     if (this.buscar) {
                       this.buscar.value = buscador;
                     }
                   }}
                   onKeyPress={(event) => {
                     if (event.key === 'Enter') {
                       this.props.buscar(this.buscar.value);
                     }
                   }}
                   autoComplete="off" className="form-control"/>

          </div>
        )}
      </div>
    );
  }
}

export default Search;
