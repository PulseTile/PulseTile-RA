import React from "react";
import get from "lodash/get";
import { ResponsiveContainer, PieChart, Cell, Pie, Tooltip, Legend } from "recharts";

import { withStyles } from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/Typography";

import { COLOR_MALE, COLOR_FEMALE } from "../constants";

const styles = theme => ({
    mainBlock: {
        minHeight: 400,
        width: '100%',
        padding: 10,
        textAlign: 'center',
    },
    chartTitle: {
        fontSize: 14,
        fontWeight: 600,
    },
    chartBlock: {
        width: '95%',
        '& .recharts-text.recharts-pie-label-text tspan': {
            fontFamily: '"HK Grotesk SemiBold", Arial, sans-serif',
            fontSize: 16,
            fontWeight: 800,
            color: theme.palette.fontColor,
        }
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

function getCustomLabel(item, dataFilter, total) {
    if (dataFilter.length === 2) {
        const value = Math.floor(100 * item.value / total);
        return (
            <text
                x={item.x}
                y={item.y}
                stroke='none'
                alignmentBaseline='middle'
                className='recharts-text recharts-pie-label-text'
                textAnchor='end'
            >
                <tspan x={item.x} textAnchor={item.textAnchor} dy='0em'>
                    {value}
                </tspan>
            </text>
        );
    }
    return null;
};

const CustomTooltip = ({ classes, active, payload }) => {
    if (active) {
        return (
            <div className={classes.tooltip}>
                <div className={classes.tooltipRow}>
                    <Typography className={classes.parameterName}>{get(payload, '[0].name', null)}:</Typography>
                    <Typography>{get(payload, '[0].value', null)}</Typography>
                </div>
            </div>
        );
    }
    return null;
};

const PieChartByGender = ({ classes, label, male, female, isGenderVisible }) => {
    const data = [
        { name: 'Female', type: 'female', value: female, fill: COLOR_FEMALE, color: COLOR_FEMALE },
        { name: 'Male',   type: 'male',   value: male,   fill: COLOR_MALE,   color: COLOR_MALE },
    ];
    const total = male + female;
    const dataFilter = [];
    data.map(item => {
        if (isGenderVisible(item.type)) {
            dataFilter.push(item);
        }
    });
    return (
        <div className={classes.mainBlock}>
            <Typography variant="h1">{label}</Typography>
            <div className={classes.chartBlock}>
                <ResponsiveContainer width='100%' height={400}>
                    <PieChart>
                        <Pie isAnimationActive={false} data={dataFilter} label={item => getCustomLabel(item, dataFilter, total)} labelLine={false}>
                        {
                            data.map((item, key) => {
                                return (
                                    <Cell fill={item.color} color={item.color} key={key} />
                                )
                            })
                        }
                        </Pie>
                        <Tooltip
                            content={<CustomTooltip classes={classes} />}
                            cursor={false}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default withStyles(styles)(PieChartByGender);
