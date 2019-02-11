import React, { Component } from "react";
import { connect } from 'react-redux';

import { initializeAction } from "../actions/initializeAction";

class InitializePage extends Component {

    componentDidMount() {
        if (!this.props.initialize) {
            this.props.initializeAction();
        }
    }

    render() {
        return (
            <h1>Loading...</h1>
        )
    }
}

const mapStateToProps = state => {
    return {
        initialize: state.custom.initialize.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initializeAction() {
            dispatch(initializeAction.request());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InitializePage);