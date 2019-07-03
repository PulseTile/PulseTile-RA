import React from "react";

import { ResponsiveContainer, Cell, Pie, PieChart } from "recharts";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = {
    chartBlock: {
        width: '100%',
        height: 180,
        textAlign: 'center',
        paddingTop: 10,
    },
    value: {
        marginTop: -145,
    },

    diagnosis: {
        marginTop: 10,
    }
};

const COLOR_EMPTY = '#e9e4e4';

const PieChartBlock = ({ classes, value, units, color, title, maximal, diagnosis }) => {
    const data = [
        { name: 'Group A', value: value },
        { name: 'Group B', value: (maximal - value) }
    ];
    return (
        <div className={classes.chartBlock}>
            <Typography variant="h1">{title}</Typography>
            <ResponsiveContainer height={200}>
                <PieChart>
                    <Pie
                        data={data}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        <Cell fill={color} />
                        <Cell fill={COLOR_EMPTY} />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <Typography variant="h1" className={classes.value}>{value}</Typography>
            <Typography variant="body1" className={classes.units}>{units}</Typography>
            <Typography variant="caption" className={classes.diagnosis}>{diagnosis}</Typography>
        </div>
    )
}

export default withStyles(styles)(PieChartBlock);
