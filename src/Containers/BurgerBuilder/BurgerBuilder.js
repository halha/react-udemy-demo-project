import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../Components/Burger/Burger";

export class BurgerBuilder extends Component {
    render() {
        return (
            <Auxiliary>
                <Burger />
                <div>Build Controls</div>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;
