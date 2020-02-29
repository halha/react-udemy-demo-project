import React, { Component } from "react";
import Modal from "../../Components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            err: null
        };

        UNSAFE_componentWillMount() {
            axios.interceptors.request.use(req => {
                this.setState({ err: null });
                return req;
            });
            axios.interceptors.response.use(
                res => res,
                err => {
                    this.setState({ err: err });
                }
            );
        }

        _ErrorConfirmedHandler = () => {
            this.setState({ err: null });
        };

        render() {
            return (
                <Auxiliary>
                    <Modal
                        show={this.state.err}
                        modalClosed={this._ErrorConfirmedHandler}
                    >
                        {this.state.err ? this.state.err.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    };
};

export default withErrorHandler;
