import React from "react";
import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";

import { withStyles } from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/Typography/index";

const COLOR_EMPTY = '#e9e4e4';

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
    emptyBlock: {
        width: '100%',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
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

const AverageHealthScore = ({ classes, color, healthScore }) => {
    const data = [
        { name: 'Group A', value: healthScore },
        { name: 'Group B', value: 100 - healthScore }
    ];
    return (
        <React.Fragment>
            <Typography variant="body1" className={classes.chartTitle}>Average Health Score</Typography>
            {
                (healthScore > 0)
                    ?
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
                                        <Cell fill={color} />
                                        <Cell fill={COLOR_EMPTY} />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <Typography variant="h1" className={classes.value}>{healthScore} %</Typography>
                            <Typography variant="body1">Moderate</Typography>
                            <div className={classes.bordersLabels}>
                                <Typography variant="caption">Unhealthy</Typography>
                                <Typography variant="caption">Healthy</Typography>
                            </div>
                        </div>
                    :
                    <div className={classes.emptyBlock}>
                        <Typography variant="body1">No Records Found</Typography>
                    </div>
            }

        </React.Fragment>
    );
};

export default withStyles(styles)(AverageHealthScore);
