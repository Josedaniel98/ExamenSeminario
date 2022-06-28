import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// maquetado base
import SiderBar from './common/components/layout/Sidebar/SideBar';

class PrivateRouteBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleOpen: true,
        };
    }

    navToggle = () => {
        this.setState({toggleOpen: !this.state.toggleOpen });
    };


    render() {
        const { component: Component, logOut, login: { }, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    <div>
                            <SiderBar toggleOpen={this.state.toggleOpen} navToggle={this.navToggle} />
                            <main className="main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
                                <div className="main-content-container px-4 container-fluid">
                                    <Component {...props} />
                                </div>
                                <Footer />
                            </main>
                    </div>
                }
            />
        );
    }
}

const mstp = state => ({ ...state });

const mdtp = { };

const ProtectedRoute = connect(
    mstp,
    mdtp
)(PrivateRouteBase);

export default ProtectedRoute;

