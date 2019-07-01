import React from "react";
import Typography from "@material-ui/core/Typography";
import { ResponsiveContainer, PieChart, Cell, Pie, Tooltip, Legend } from "recharts";

import { withStyles } from "@material-ui/core/styles/index";

const COLOR_HEALTHY = '#8784d8';
const COLOR_UNHEALTHY = '#ff78a6';

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
        '& .recharts-text.recharts-pie-label-text tspan': {
            fontFamily: '"HK Grotesk SemiBold", Arial, sans-serif',
            fontSize: 16,
            fontWeight: 800,
            color: theme.palette.fontColor,
        }
    }
});

function getCustomLabel(item) {
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
                {item.value / 10}% ({item.value})
            </tspan>
        </text>
    );
};

const PieChartByGender = ({ classes, label, startAngle, healthy, unhealthy }) => {

    const data = [
        {name: 'Female', value: healthy, color: COLOR_HEALTHY },
        {name: 'Male', value: unhealthy, color: COLOR_UNHEALTHY },
    ];

    return (
        <div className={classes.mainBlock}>
            <Typography variant="h1">{label}</Typography>
            <div className={classes.chartBlock}>
                <ResponsiveContainer height={400}>
                    <PieChart>
                        <Pie isAnimationActive={false} data={data} outerRadius={120} fill="#8884d8" label={item => getCustomLabel(item)} labelLine={false}>
                        {
                            data.map((item, key) => <Cell fill={item.color} key={key} />)
                        }
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default withStyles(styles)(PieChartByGender);
