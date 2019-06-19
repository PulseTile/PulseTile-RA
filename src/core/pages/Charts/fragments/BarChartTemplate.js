import React from "react";
import { Bar, BarChart, CartesianGrid, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { withStyles } from '@material-ui/core/styles/index';
import Typography from "@material-ui/core/Typography";

const DEFAULT_STEP = 5;

const styles = theme => ({
    chartBlock: {
        width: '95%',
        height: 350,
    },
    bar: {
        cursor: "pointer",
    },
    titleBlock: {
        display: "flex",
        alignItems: "center",
        height: 49,
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        backgroundColor: theme.palette.mainColor,
        paddingLeft: 15,
    },
    title: {
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        fontSize: 18,
        fontWeight: 700,
    },
    secondTitle: {
        fontSize: 16,
        paddingTop: 10,
        paddingLeft: 10,
    },
    chartIcon: {
        paddingRight: 5,
    },
    description: {
        padding: 10,
    },
    tooltip: {
        backgroundColor: theme.palette.fontColor,
        padding: 10,
        borderRadius: 5,
        '& p': {
            color: theme.palette.paperColor,
        },
        '& span': {
            color: theme.palette.paperColor,
            marginBottom: 10,
        }
    },
    patientsNumber: {
        display: "flex",
        flexDirection: "row",
    },
    square: {
        width: 15,
        height: 15,
        marginRight: 5,
    }
});

const CustomTooltip = ({ classes, active, payload, label, barColor, borderColor }) => {
    if (active) {
        return (
            <div className={classes.tooltip}>
                <Typography variant="h3">{label}</Typography>
                <div className={classes.patientsNumber}>
                    <div className={classes.square} style={{ backgroundColor: barColor, border: `1px solid ${borderColor}` }} ></div>
                    <Typography>Patients: {payload[0].value}</Typography>
                </div>
            </div>
        );
    }
    return null;
};

function getTicksArray(data) {
    let result = [];
    let maximal = 0;
    data.map(item => {
        if (item.RespondentPercentage > maximal) {
            maximal = item.RespondentPercentage;
        }
    });
    const ticksNumber = Math.ceil(maximal / DEFAULT_STEP) + 1;
    for (let i = 0; i < ticksNumber; i++) {
        result.push(i * DEFAULT_STEP);
    }
    return result;
}

const BarChartTemplate = ({ classes, data, history, onClickAction, searchType, barColor, borderColor }) => {
    const ticksArray = getTicksArray(data);
    return (
        <div className={classes.chartBlock}>
            <ResponsiveContainer width={'100%'}>
                <BarChart
                    data={data}
                    margin={{ top: 5, right: 0, left: 0, bottom: 25 }} >
                    <XAxis dataKey="Text" fontFamily="sans-serif" tick={{ dy: 10 }} />
                    <YAxis tick={{ dx: -10 }} ticks={ticksArray} domain={[0, 'dataMax']} />
                    <CartesianGrid stroke="#ebebeb" />
                    <Tooltip
                        content={<CustomTooltip classes={classes} barColor={barColor} borderColor={borderColor} />}
                        cursor={false}
                    />
                    <Bar
                        dataKey="RespondentPercentage"
                        stroke={borderColor}
                        fillOpacity="0.7"
                        onClick={(item) => onClickAction(history, searchType, item)}
                        className={classes.bar}
                    >
                        {data.map((entry, index) => (
                            <Cell fill={barColor} />))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default withStyles(styles)(BarChartTemplate);
