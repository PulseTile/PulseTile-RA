import React, { Component } from "react";
import { get } from "lodash";
import { connect } from 'react-redux';

import { patientsStatisticAction } from "../actions/patientsAction";

class Charts extends Component {

    componentDidMount() {
        console.log('++++++++++++++++++++++++++')
        console.log(this.props)
    }

    render() {
        return (
            <h1>Place for Charts</h1>
        );
    }
}

const mapStateToProps = state => {
    return {
        patients: get(state, "custom.patientsStatistic.data", []),
    };
};

const mapDispatchToProps = dispatch => {
    patientsStatisticAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);