import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";

export class App extends Component {
    // state = {
    //     show: true
    // };

    // componentDidMount() {
    //     setInterval(() => {
    //         this.setState({ show: false });
    //     }, 5000);
    // }

    render() {
        return (
            <div>
                <Layout>
                    {/* {this.state.show ? <BurgerBuilder /> : null} */}
                    <BurgerBuilder />
                </Layout>
            </div>
        );
    }
}

export default App;
