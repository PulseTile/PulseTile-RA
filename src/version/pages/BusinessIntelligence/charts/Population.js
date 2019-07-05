import React, { Component } from "react";
import get from "lodash/get";
import {AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, ResponsiveContainer} from "recharts";

import { withStyles } from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/Typography/index";

const COLOR_EMPTY = '#e9e4e4';
const COLOR_AMBER = '#ffac5a';
const COLOR_GREEN = '#2dcd0d';
const COLOR_YELLOW = '#fbf800';
const COLOR_RED = '#ff5d00';

const styles = theme => ({
    mainBlock: {
        minHeight: 300,
    },
    chartTitle: {
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: 600,
    },
    populationNumber: {
        paddingLeft: 10,
    },
    chartBlock: {
        width: '100%',
        height: 180,
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
                    <Typography className={classes.parameterName}>Year: </Typography>
                    <Typography>{get(payload, '[0].payload.name', null)}</Typography>
                </div>
                <div className={classes.tooltipRow}>
                    <Typography className={classes.parameterName}>Population: </Typography>
                    <Typography>{get(payload, '[0].value', null)}</Typography>
                </div>
            </div>
        );
    }
    return null;
};


class Population extends Component {

    render() {
        const { classes, color, population } = this.props;

        const data = [
            { name: '2008', uv: 3 },
            { name: '2009', uv: 2.8 },
            { name: '2010', uv: 3.5 },
            { name: '2011', uv: 3.1 },
            { name: '2012', uv: 3.6 },
            { name: '2013', uv: 2.4 },
            { name: '2014', uv: 3.4 },
            { name: '2015', uv: 3.6 },
            { name: '2016', uv: 2.7 },
            { name: '2017', uv: 3.3 },
            { name: '2018', uv: 3.5 },
        ];

        const ticksArray = [ 0, 1, 2, 3, 4, 5 ];

        return (
            <div className={classes.mainBlock}>
                <Typography variant="body1" className={classes.chartTitle}>Population</Typography>
                <Typography variant="body1" className={classes.populationNumber}>{population}</Typography>
                <div className={classes.chartBlock}>
                    <ResponsiveContainer height={200}>
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid stroke="#ebebeb" />
                            <XAxis dataKey="name" tick={{ dy: 10 }} />
                            <YAxis  tick={{ dx: -10 }} ticks={ticksArray} domain={[0, 'dataMax']} unit="m" />
                            <Tooltip
                                content={<CustomTooltip classes={classes} />}
                                cursor={false}
                            />
                            <Area type="linear" dataKey="uv" stroke={color} fill={color} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
};

export default withStyles(styles)(Population);
