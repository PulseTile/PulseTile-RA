import React, { Component } from "react";
import { get } from "lodash";
import { connect } from 'react-redux';

import { initializeAction } from "../actions/initializeAction";
import { token } from "../token";

class InitializePage extends Component {

    componentDidMount() {
        if (!token) {
            this.props.initializeAction();
        }
    }

    render() {
        return (
            <h1>Loading...</h1>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initializeAction() {
            dispatch(initializeAction.request());
        }
    }
};

export default connect(null, mapDispatchToProps)(InitializePage);