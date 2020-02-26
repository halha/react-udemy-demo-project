import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Components/Navigation/SideDrawer/SideDrawer";

export class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    _SideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    _SideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    render() {
        return (
            <Auxiliary>
                <Toolbar drawerToggleClicked={this._SideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this._SideDrawerClosedHandler}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Auxiliary>
        );
    }
}

export default Layout;
