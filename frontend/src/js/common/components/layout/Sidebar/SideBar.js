import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";

class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { toggleOpen, navToggle, logOut } = this.props;
        return (
            <aside className={`main-sidebar px-0 col-12 col-md-3 col-lg-2 ${toggleOpen ? '' : 'open'}`}>
                <div className="main-navbar">
                    <nav
                        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar navbar-light">
                        <a href="#" className="w-100 mr-0 navbar-brand" >
                            <div className="d-table m-auto">
                                <img id="main-logo"
                                    className="d-inline-block align-top mr-1"
                                    src={require('assets/img/logo.png')}
                                    alt="Logo" />
                            </div>
                        </a>
                        <a className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                            onClick={navToggle}>
                            <i className="material-icons"></i>
                        </a>
                    </nav>
                </div>
                <div className="nav-wrapper">
                    <ul className="nav--no-borders flex-column nav">
                        <li className="nav-item">
                            <NavLink to="/" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">edit</i>
                                </div>
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/usuarios" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Usuarios</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/producto" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Productos</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/sucursal" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Sucursales</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            {/* <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        <AccordionItemState>
                                            <span>Planta de Extracción</span>
                                        </AccordionItemState>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemState>
                                    <AccordionItemPanel>
                                        <div className="sub-nav-item">
                                            <NavLink exact to="/plantaextraccion" activeClassName={"submenu-select"}>
                                                <div className="d-inline-block item-icon-wrapper">
                                                    <span className={"t-blanco"}>Inventario</span>
                                                </div>
                                            </NavLink>
                                        </div>
                                    </AccordionItemPanel>
                                </AccordionItemState>
                            </AccordionItem> */}

                            <NavLink to="/plantaextraccion" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>PE-Inventario</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/pe-movimiento" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>PE-Movimiento</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/pe-cliente" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>PE-Cliente</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/roles" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Roles</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" onClick={logOut} className="nav-link">
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">lock</i>
                                </div>
                                <span>Log Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBar;
