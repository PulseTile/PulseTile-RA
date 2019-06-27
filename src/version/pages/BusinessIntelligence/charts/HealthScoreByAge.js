import React, { Component } from "react";
import get from "lodash/get";
import {ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Legend} from "recharts";

import { withStyles } from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/Typography/index";

import dummyData from "./dummyDiagnosisByAge";

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
        return (
            <div className={classes.tooltip}>
                <div className={classes.tooltipRow}>
                    <Typography className={classes.parameterName}>Age: </Typography>
                    <Typography>{get(payload, '[0].payload.x', null)}</Typography>
                </div>
                <div className={classes.tooltipRow}>
                    <Typography className={classes.parameterName}>Value: </Typography>
                    <Typography>{get(payload, '[0].payload.y', null)}</Typography>
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
        const linesArray = [
            { dataKey: "diabetes", color: COLOR_DIABETES, label: <Typography>Diabetes</Typography> },
            { dataKey: "measles", color: COLOR_MEASLES, label: <Typography>Measles</Typography> },
            { dataKey: "asthma", color: COLOR_ASTHMA, label: <Typography>Asthma</Typography> },
            { dataKey: "dementia", color: COLOR_DEMENTIA, label: <Typography>Dementia</Typography> },
        ];
        const ticksArray = [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ];
        let dummyDiabetes = [];
        let dummyAsthma = [];
        let dummyMeasles = [];
        let dummyDementia = [];
        for (let i = 0, n = dummyData.length; i < n; i++) {
            let item = dummyData[i];
            dummyDiabetes.push({ x: item.name, y: item.diabetes });
            dummyAsthma.push({ x: item.name, y: item.asthma });
            dummyMeasles.push({ x: item.name, y: item.measles });
            dummyDementia.push({ x: item.name, y: item.dementia });
        }
        return (
            <div className={classes.mainBlock}>
                <div className={classes.chartBlock}>
                    <ResponsiveContainer height={400}>
                        <ScatterChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid stroke="#ebebeb" />
                            <XAxis dataKey={"x"} tick={{ dy: 10 }} allowDuplicatedCategory={false} />
                            <YAxis dataKey={"y"} tick={{ dx: -10 }} ticks={ticksArray} domain={[0, 'dataMax']} />
                            <Tooltip
                                content={<CustomTooltip classes={classes} />}
                                cursor={false}
                            />
                            { (disabledLines.indexOf('diabetes') === -1) && <Scatter data={dummyDiabetes} name="Diabetes" stroke={COLOR_DIABETES} fill={COLOR_DIABETES} /> }
                            { (disabledLines.indexOf('asthma') === -1) && <Scatter data={dummyAsthma} name="Asthma" stroke={COLOR_ASTHMA} fill={COLOR_ASTHMA} /> }
                            { (disabledLines.indexOf('measles') === -1) && <Scatter data={dummyMeasles} name="Measles" stroke={COLOR_MEASLES} fill={COLOR_MEASLES} /> }
                            { (disabledLines.indexOf('dementia') === -1) && <Scatter data={dummyDementia} name="Dementia" stroke={COLOR_DEMENTIA} fill={COLOR_DEMENTIA} /> }
                            <Legend
                                payload={linesArray.map(item => ({
                                    dataKey: item.dataKey,
                                    color: item.color,
                                    value: item.label,
                                }))}
                                onClick={e => this.toggleLine(e)}
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
};

export default withStyles(styles)(DiagnosisByAge);
