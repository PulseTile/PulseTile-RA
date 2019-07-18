import React, { Component } from "react";
import get from "lodash/get";
import moment from "moment";
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from "recharts";
import { connect } from 'react-redux';
import { Toolbar } from "react-admin";

import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

import { vitalsAction } from "../../actions/vitalsAction";
import CreateButton from "../../../core/common/Buttons/CreateButton";
import EmptyListBlock from "../../../core/common/ResourseTemplates/EmptyListBlock";

const styles = theme => ({
    chartBlock: {
        width: '100%',
        height: 500,
        backgroundColor: theme.palette.paperColor,
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 0,
    },
});

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

    componentDidMount() {
        this.props.getVitalsForChart();
    }

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

    /**
     * This action is run when user click on the dot on the chart
     *
     * @author BogdanScherban <bsc@piogroup.net>
     * @param {shape} e
     */
    onPointClick = e => {
        const { history } = this.props;
        const sourceId = get(e, 'payload.sourceId', null);
        const detailsUrl = '/vitalsigns/' + sourceId;
        history.push(detailsUrl);
    };

    render() {
        const { classes, currentList, vitalsList, vitalsEmergencySummary, history, createUrl } = this.props;
        const { disabledLines } = this.state;
        // const vitalsListArray = vitalsEmergencySummary ? Object.values(vitalsEmergencySummary) : vitalsList;


        let chartData = [];
        if (vitalsList) {
            for (let i = 0, n = vitalsList.length; i < n; i++) {

                let item = vitalsList[i];
                chartData.push({
                    name: moment(item.dateCreated).format('MM-DD-YYYY'),
                    diastolicBP: item.diastolicBP,
                    heartRate: item.heartRate,
                    oxygenSaturation: item.oxygenSaturation,
                    respirationRate: item.respirationRate,
                    systolicBP: item.systolicBP,
                    temperature: item.temperature,
                    sourceId: item.sourceId,
                });
            }
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

        if (currentList.length === 0) {
            return (
                <EmptyListBlock />
            )
        }

        return (
            <div className={classes.chartBlock}>
                <ResponsiveContainer width={'98%'}>
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
                                        activeDot={{ r: DOT_RADIUS, onClick: e => this.onPointClick(e) }}
                                        strokeWidth={STROKE_WIDTH}
                                    />
                                )
                            })
                        }
                    </LineChart>
                </ResponsiveContainer>
                {
                    createUrl &&
                        <Toolbar className={classes.toolbar}>
                            <CreateButton history={history} redirectPath={createUrl} />
                        </Toolbar>
                }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        vitalsList: get(state, 'custom.vitalsForChart.data', []),
        currentList: get(state, 'admin.resources.vitalsigns.list.ids', []),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getVitalsForChart() {
            dispatch(vitalsAction.request());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VitalsChart));