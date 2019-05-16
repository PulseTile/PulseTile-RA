import React, { Component } from "react";
import { connect } from 'react-redux';

import { initializeAction } from "../actions/initializeAction";
import LoadingSlider from "../common/LoadingSlider";
import { token } from "../token";

class InitializePage extends Component {

    componentDidMount() {
        if (!token) {
            this.props.initializeAction();
        }
    }

    render() {
        return (
            <LoadingSlider />
        );
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
