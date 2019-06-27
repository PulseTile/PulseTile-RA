import React from "react";
import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";

import { withStyles } from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/Typography/index";

const COLOR_EMPTY = '#e9e4e4';
const COLOR_AMBER = '#ffac5a';
const COLOR_GREEN = '#2dcd0d';
const COLOR_YELLOW = '#fbf800';
const COLOR_RED = '#ff5d00';

const styles = theme => ({
    chartTitle: {
        padding: 10,
        fontSize: 14,
        fontWeight: 600,
    },
    chartBlock: {
        width: '100%',
        height: 180,
        textAlign: 'center',
        paddingTop: 10,
    },
    value: {
        marginTop: -140,
    },
    bordersLabels: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: -20,
    }
});

const HARDCORE_VALUE = 68;

const AverageHealthScore = ({ classes }) => {
    const data = [
        { name: 'Group A', value: HARDCORE_VALUE },
        { name: 'Group B', value: 100 - HARDCORE_VALUE }
    ];
    return (
        <React.Fragment>
            <Typography variant="body1" className={classes.chartTitle}>Average Health Score</Typography>
            <div className={classes.chartBlock}>
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
                            <Cell fill={COLOR_AMBER} />
                            <Cell fill={COLOR_EMPTY} />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <Typography variant="h1" className={classes.value}>{HARDCORE_VALUE} %</Typography>
                <Typography variant="body1">Moderate</Typography>
                <div className={classes.bordersLabels}>
                    <Typography variant="caption">Unhealthy</Typography>
                    <Typography variant="caption">Healthy</Typography>
                </div>
            </div>
        </React.Fragment>
    );
};

export default withStyles(styles)(AverageHealthScore);
