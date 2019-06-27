import React, { Component } from "react";
import get from "lodash/get";
import {AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, ResponsiveContainer, Legend, Line} from "recharts";

import { withStyles } from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/Typography/index";

const COLOR_DIABETES = '#8784d8';
const COLOR_MEASLES = '#80ca9d';
const COLOR_ASTHMA = '#44afa0';
const COLOR_DEMENTIA = '#ab43af';

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
        console.log('payload', payload)
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

    render() {
        const { classes } = this.props;
        const { disabledLines } = this.state;

        const data = [
            { name: '0-10',   diabetes: 20, measles: 45, asthma: 50, dementia: 52 },
            { name: '11-20',  diabetes: 15, measles: 25, asthma: 45, dementia: 48 },
            { name: '21-30',  diabetes: 16, measles: 34, asthma: 60, dementia: 60 },
            { name: '31-40',  diabetes: 18, measles: 38, asthma: 65, dementia: 75 },
            { name: '41-50',  diabetes: 19, measles: 28, asthma: 57, dementia: 70 },
            { name: '51-60',  diabetes: 20, measles: 35, asthma: 52, dementia: 65 },
            { name: '61-70',  diabetes: 27, measles: 38, asthma: 55, dementia: 72 },
            { name: '71-80',  diabetes: 33, measles: 40, asthma: 58, dementia: 81 },
            { name: '81+',    diabetes: 40, measles: 55, asthma: 60, dementia: 92 },
        ];

        const linesArray = [
            { dataKey: "diabetes", color: COLOR_DIABETES, label: <Typography>Diabetes</Typography> },
            { dataKey: "measles", color: COLOR_MEASLES, label: <Typography>Measles</Typography> },
            { dataKey: "asthma", color: COLOR_ASTHMA, label: <Typography>Asthma</Typography> },
            { dataKey: "dementia", color: COLOR_DEMENTIA, label: <Typography>Dementia</Typography> },
        ];

        const ticksArray = [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ];

        return (
            <div className={classes.mainBlock}>
                <Typography variant="body1" className={classes.chartTitle}>Diagnosis By Age</Typography>
                <div className={classes.chartBlock}>
                    <ResponsiveContainer height={300}>
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid stroke="#ebebeb" />
                            <XAxis dataKey="name" tick={{ dy: 10 }} />
                            <YAxis  tick={{ dx: -10 }} ticks={ticksArray} domain={[0, 'dataMax']} />
                            <Tooltip
                                content={<CustomTooltip classes={classes} />}
                                cursor={false}
                            />
                            {
                                linesArray.map((item, key) => {
                                    if (disabledLines.indexOf(item.dataKey) !== -1) {
                                        return null;
                                    }
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
                                })
                            }
                            <Legend
                                payload={linesArray.map(item => ({
                                    dataKey: item.dataKey,
                                    color: item.color,
                                    value: item.label,
                                }))}
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
