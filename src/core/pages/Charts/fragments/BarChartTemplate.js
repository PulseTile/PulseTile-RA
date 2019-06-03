import React from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { withStyles } from '@material-ui/core/styles/index';

const styles = theme => ({
    chartBlock: {
        width: '95%',
        height: 500,
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
    }
});

const BarChartTemplate = ({ classes, data, barSize, history, onClickAction, barColor }) => {
    return (
        <div className={classes.chartBlock}>
            <ResponsiveContainer width={'99%'}>
                <BarChart
                    data={data}
                    height={400}
                    margin={{ top: 5, right: 0, left: 0, bottom: 25 }} >
                    <XAxis dataKey="Text" fontFamily="sans-serif" tickSize dy="25" />
                    <YAxis />
                    <CartesianGrid vertical={false} stroke="#E8E8E8" />
                    <Bar
                        dataKey="RespondentPercentage"
                        barSize={barSize}
                        fontFamily="sans-serif"
                        onClick={(item) => onClickAction(history, item)}
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
