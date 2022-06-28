import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Grid from '../Utils/Grid'
import { standardActions } from "../Utils/Grid/StandardActions"

export default class ListProducto extends Component {

    componentWillMount = () => {
        const { getList } = this.props;

        getList();
    }

    render() {
        const { data, loader, page, getList, eliminar } = this.props;
        return (
            <React.Fragment>
                <br />
                <h3 className="text">Productos</h3>
                <div className="mb-4 card card-small mt-4 container">
                    <div>
                        <Grid
                            data={data}
                            loading={loader}
                            onPageChange={getList}
                            // onSortChange={onSortChange}
                            page={page}
                        >
                            <TableHeaderColumn
                                isKey
                                dataField="Proveedor"
                                dataSort
                            >
                                Proveedor
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="precio_mayoreo"
                                dataSort
                            >
                                Precio Mayoreo
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="precio_unitario"
                                dataSort
                            >
                                Precio Unitario
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="precio_oferta"
                                dataSort
                            >
                                Precio Oferta
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="precio_liquidacion"
                                dataSort
                            >
                                Precio Liquidacion
                            </TableHeaderColumn>


                        </Grid>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}
