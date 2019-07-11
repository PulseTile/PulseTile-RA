import React, { Component } from "react";
import get from "lodash/get";
import {AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, ResponsiveContainer, Legend, Line} from "recharts";

import { withStyles } from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/Typography/index";

import { COLOR_DIABETES, COLOR_MEASLES, COLOR_ASTHMA, COLOR_DEMENTIA } from "../constants";

const styles = theme => ({
    mainBlock: {
        minHeight: 400,
    },
    chartTitle: {
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: 600,
    },
    chartBlock: {
        width: '100%',
        textAlign: 'center',
        paddingTop: 10,
        '& .recharts-text.recharts-cartesian-axis-tick-value': {
            fontFamily: '"HK Grotesk SemiBold", Arial, sans-serif',
            fontSize: 14,
        },
    },
    tooltip: {
        padding: 5,
        backgroundColor: theme.palette.paperColor,
    },
    tooltipRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    parameterName: {
        fontWeight: 600,
        marginRight: 10,
    }
});

const CustomTooltip = ({ classes, active, payload }) => {
    if (active) {
        return (
            <div className={classes.tooltip}>
                <div className={classes.tooltipRow}>
                    <Typography className={classes.parameterName}>Age: </Typography>
                    <Typography>{get(payload, '[0].payload.name', null)}</Typography>
                </div>
                <div className={classes.tooltipRow}>
                    <Typography className={classes.parameterName}>Diabetes: </Typography>
                    <Typography>{get(payload, '[0].payload.diabetes', null)}</Typography>
                </div>
                <div className={classes.tooltipRow}>
                    <Typography className={classes.parameterName}>Measles: </Typography>
                    <Typography>{get(payload, '[0].payload.measles', null)}</Typography>
                </div>
                <div className={classes.tooltipRow}>
                    <Typography className={classes.parameterName}>Asthma: </Typography>
                    <Typography>{get(payload, '[0].payload.asthma', null)}</Typography>
                </div>
                <div className={classes.tooltipRow}>
                    <Typography className={classes.parameterName}>Dementia: </Typography>
                    <Typography>{get(payload, '[0].payload.dementia', null)}</Typography>
                </div>
            </div>
        );
    }
    return null;
};


class DiagnosisByAge extends Component {

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

    isAreaVisible = item => {
        const { isDiagnosisVisible } = this.props;
        const { disabledLines } = this.state;
        return disabledLines.indexOf(item) === -1 && isDiagnosisVisible(item);
    };

    render() {
        const { classes, diagnosisByAge, isDiagnosisVisible, isAgeRangeVisible } = this.props;

        const linesArray = [
            { dataKey: "measles", color: COLOR_MEASLES, label: <Typography>Measles</Typography> },
            { dataKey: "asthma", color: COLOR_ASTHMA, label: <Typography>Asthma</Typography> },
            { dataKey: "diabetes", color: COLOR_DIABETES, label: <Typography>Diabetes</Typography> },
            { dataKey: "dementia", color: COLOR_DEMENTIA, label: <Typography>Dementia</Typography> },
        ];

        const ticksArray = [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ];

        const legendInfo = linesArray
            .filter(item => isDiagnosisVisible(item.dataKey))
            .map(item => ({
                dataKey: item.dataKey,
                color: item.color,
                value: item.label,
            }));

        const dummyDataFilter = diagnosisByAge.filter(item => isAgeRangeVisible(item.name));

        return (
            <div className={classes.mainBlock}>
                <Typography variant="body1" className={classes.chartTitle}>Diagnosis By Age</Typography>
                <div className={classes.chartBlock}>
                    <ResponsiveContainer height={300}>
                        <AreaChart data={dummyDataFilter} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid stroke="#ebebeb" />
                            <XAxis dataKey="name" tick={{ dy: 10 }} />
                            <YAxis  tick={{ dx: -10 }} ticks={ticksArray} domain={[0, 'dataMax']} />
                            <Tooltip
                                content={<CustomTooltip classes={classes} />}
                                cursor={false}
                            />
                            {
                                linesArray.map((item, key) => {
                                    if (this.isAreaVisible(item.dataKey)) {
                                        return (
                                            <Area
                                                key={key}
                                                type="linear"
                                                dataKey={item.dataKey}
                                                stackId="1"
                                                stroke={item.color}
                                                fill={item.color}
                                            />
                                        )
                                    }
                                })
                            }
                            <Legend
                                payload={legendInfo}
                                onClick={e => this.toggleLine(e)}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
};

export default withStyles(styles)(DiagnosisByAge);
