import React from "react";
import get from "lodash/get";
import moment from "moment";
import {
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Line,
} from "recharts";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";


const styles = {

};

const VitalsChart = ({ vitalsList }) => {
    const vitalsListArray = Object.values(vitalsList);
    let chartData = [];
    for (let i = 0, n = vitalsListArray.length; i < n; i++) {

        let item = vitalsListArray[i];
        chartData.push({
            name: moment(item.dateCreate).format('MM-DD-YYYY'),
            diastolicBP: item.diastolicBP,
            heartRate: item.heartRate,
            oxygenSaturation: item.oxygenSaturation,
            respirationRate: item.respirationRate,
            systolicBP: item.systolicBP,
            temperature: item.temperature
        });
    }
    return (
        <LineChart width={500} height={300} data={chartData}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid stroke="#e5e5e5" strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="respirationRate" stroke="#99C78C" />
            <Line type="monotone" dataKey="oxygenSaturation" stroke="#E18FC0" />
            <Line type="monotone" dataKey="heartRate" stroke="#ACC2D7" />
            <Line type="monotone" dataKey="systolicBP" stroke="#EABA97" />
            <Line type="monotone" dataKey="diastolicBP" stroke="#99D9DE" />
            <Line type="monotone" dataKey="temperature" stroke="#E3A08F" />
        </LineChart>
    );
};

const mapStateToProps = state => {
    return {
        vitalsList: get(state, 'admin.resources.vitalsigns.data', []),
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(VitalsChart));