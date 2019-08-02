import React, { Component } from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core";
import get from "lodash/get";

const styles = {
    chartBlock: {
        width: '100%',
        height: 500,
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
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

class DummyVitalsChart extends Component {


    state = {
        disabledLines: [],
    };

    /**
     * This action is run when user click on the dot on the legend to toggle lines visibility
     *
     * @author BogdanScherban <bsc@piogroup.net>
     * @param {shape} e
     */
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
        const { classes,  } = this.props;
        const { disabledLines } = this.state;

        const vitalsListArray = [
            {
                number: 1,
                dateCreate: 'Jan',
                newsScore: 13,
                respirationRate: 7,
                oxygenSupplemental: true,
                heartRate: 92,
                temperature: 38,
                levelOfConsciousness: "Pain",
                systolicBP: 92,
                diastolicBP: 92,
                oxygenSaturation: 77,
            },
            {
                number: 2,
                dateCreate: 'Feb',
                newsScore: 11,
                respirationRate: 9,
                oxygenSupplemental: true,
                heartRate: 91,
                temperature: 37,
                levelOfConsciousness: "Pain",
                systolicBP: 91,
                diastolicBP: 92,
                oxygenSaturation: 78,
            },
            {
                number: 3,
                dateCreate: 'Mar',
                newsScore: 10,
                respirationRate: 9,
                oxygenSupplemental: true,
                heartRate: 91,
                temperature: 37,
                levelOfConsciousness: "Pain",
                systolicBP: 92,
                diastolicBP: 91,
                oxygenSaturation: 72,
            },
            {
                number: 4,
                dateCreate: 'Apr',
                newsScore: 11,
                respirationRate: 9,
                oxygenSupplemental: true,
                heartRate: 95,
                temperature: 36,
                levelOfConsciousness: "Pain",
                systolicBP: 90,
                diastolicBP: 95,
                oxygenSaturation: 73,
            },
            {
                number: 5,
                dateCreate: 'May',
                newsScore: 12,
                respirationRate: 9,
                oxygenSupplemental: true,
                heartRate: 91,
                temperature: 36,
                levelOfConsciousness: "Pain",
                systolicBP: 93,
                diastolicBP: 93,
                oxygenSaturation: 77,
            },
            {
                number: 6,
                dateCreate: 'Jun',
                newsScore: 14,
                respirationRate: 9,
                oxygenSupplemental: true,
                heartRate: 91,
                temperature: 37,
                levelOfConsciousness: "Pain",
                systolicBP: 95,
                diastolicBP: 92,
                oxygenSaturation: 76,
            },
            {
                number: 7,
                dateCreate: 'Jul',
                newsScore: 14,
                respirationRate: 9,
                oxygenSupplemental: true,
                heartRate: 94,
                temperature: 36,
                levelOfConsciousness: "Pain",
                systolicBP: 93,
                diastolicBP: 93,
                oxygenSaturation: 79,
            },
            {
                number: 8,
                dateCreate: 'Aug',
                newsScore: 13,
                respirationRate: 9,
                oxygenSupplemental: true,
                heartRate: 91,
                temperature: 37,
                levelOfConsciousness: "Pain",
                systolicBP: 89,
                diastolicBP: 88,
                oxygenSaturation: 81,
            },
        ];

        let chartData = [];
        for (let i = 0, n = vitalsListArray.length; i < n; i++) {

            let item = vitalsListArray[i];
            chartData.push({
                name: item.dateCreate,
                // diastolicBP: item.diastolicBP,
                heartRate: item.heartRate,
                oxygenSaturation: item.oxygenSaturation,
                respirationRate: item.respirationRate,
                systolicBP: item.systolicBP,
                // temperature: item.temperature,
                sourceId: item.sourceId,
            });
        }

        const DOT_RADIUS = 8;
        const STROKE_WIDTH = 4;

        const linesArray = [
            { dataKey: "respirationRate", color: "#99C78C", label: <Typography>Respiration Rate, resps/min</Typography> },
            { dataKey: "oxygenSaturation", color: "#E18FC0", label: <Typography>Oxygen Saturation, %</Typography> },
            { dataKey: "heartRate", color: "#ACC2D7", label: <Typography>Heart Rate, bpm</Typography> },
            { dataKey: "systolicBP", color: "#EABA97", label: <Typography>Systolic BP, mmHg</Typography> },
            // { dataKey: "diastolicBP", color: "#99D9DE", label: <Typography>Diastolic BP, mmHg</Typography> },
            // { dataKey: "temperature", color: "#E3A08F", label: <Typography>Temperature, C</Typography> },
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
        )
    }

};

export default (withStyles(styles)(DummyVitalsChart));