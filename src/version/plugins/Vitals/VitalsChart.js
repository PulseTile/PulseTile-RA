import React, { Component } from "react";
import get from "lodash/get";
import moment from "moment";
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from "recharts";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const styles = {
    chartBlock: {
        width: '100%',
        height: 500,
    }
};

function getTooltipFormatter(value, name) {
    const row = get(name, 'props.children', null);
    if (!row) {
        return null;
    }
    const nameArray = row.split(', ');
    const parameter = nameArray[0];
    const units = nameArray[1];
    return (
        <span>
            <Typography variant="h1">{parameter}:</Typography>
            <Typography> {value}, {units}</Typography>
        </span>

    );
}

class VitalsChart extends Component {

    state = {
        disabledLines: [],
    };

    toggleLine = e => {
        const { disabledLines } = this.state;
        const dataKey = e.dataKey;
        let newDisabledLinesArray = [];
        if (disabledLines.indexOf(dataKey) !== -1) {
            newDisabledLinesArray = disabledLines.filter(item => item !== dataKey);
        } else {
            newDisabledLinesArray = disabledLines.concat(dataKey);
        }
        this.setState({
            disabledLines: newDisabledLinesArray
        })
    };

    render() {
        const { classes, vitalsList } = this.props;
        const { disabledLines } = this.state;

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

        const DOT_RADIUS = 8;
        const STROKE_WIDTH = 4;

        const linesArray = [
            { dataKey: "respirationRate", color: "#99C78C", label: <Typography>Respiration Rate, resps/min</Typography> },
            { dataKey: "oxygenSaturation", color: "#E18FC0", label: <Typography>Oxygen Saturation, %</Typography> },
            { dataKey: "heartRate", color: "#ACC2D7", label: <Typography>Heart Rate, bpm</Typography> },
            { dataKey: "systolicBP", color: "#EABA97", label: <Typography>Systolic BP, mmHg</Typography> },
            { dataKey: "diastolicBP", color: "#99D9DE", label: <Typography>Diastolic BP, mmHg</Typography> },
            { dataKey: "temperature", color: "#E3A08F", label: <Typography>Temperature, C</Typography> },
        ];

        return (
            <div className={classes.chartBlock}>
                <ResponsiveContainer width={'99%'}>
                    <LineChart data={chartData} margin={{ top: 25, left: 0 }}>
                        <XAxis dataKey="name" tick={{ fontFamily: '"HK Grotesk Regular", Arial, sans-serif', fontSize: 14 }} />
                        <YAxis tick={{ fontFamily: '"HK Grotesk Regular", Arial, sans-serif', fontSize: 14 }} />
                        <Tooltip
                            formatter={(value, name) => getTooltipFormatter(value, name)}
                            labelFormatter={function(value) {
                                return (
                                    <Typography>Date: {value}</Typography>
                                );
                            }}
                        />
                        <Legend
                            payload={linesArray.map(item => ({
                                dataKey: item.dataKey,
                                color: item.color,
                                value: item.label,
                            }))}
                            onClick={e => this.toggleLine(e)}
                        />
                        <CartesianGrid stroke="#e5e5e5" strokeDasharray="5 5"/>
                        {
                            linesArray.map((item, key) => {
                                if (disabledLines.indexOf(item.dataKey) !== -1) {
                                    return null;
                                }
                                return (
                                    <Line
                                        key={key}
                                        type="monotone"
                                        name={item.label}
                                        dataKey={item.dataKey}
                                        stroke={item.color}
                                        activeDot={{ r: DOT_RADIUS }}
                                        strokeWidth={STROKE_WIDTH}
                                    />
                                )
                            })
                        }
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        vitalsList: get(state, 'admin.resources.vitalsigns.data', []),
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(VitalsChart));