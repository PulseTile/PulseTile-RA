import React from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { withStyles } from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({
    chartBlock: {
        width: '100%',
        height: 500,
        display: "inline-block",
        border: `1px solid ${theme.palette.borderColor}`,
        margin: 20,
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

const BarChartTemplate = ({ classes, mainTitle, secondTitle, description, data, barSize, history, onClickAction, barColor }) => {
    return (
        <div className={classes.chartBlock}>
            <div className={classes.titleBlock}>
                <Tooltip title="Chart">
                    <FontAwesomeIcon className={classes.chartIcon} icon={faChartBar} size="1.5x" />
                </Tooltip>
                <Typography className={classes.title}>{mainTitle}</Typography>
            </div>
            <Typography variant="h1" className={classes.secondTitle}>{secondTitle}</Typography>
            <Typography className={classes.description}>{description}</Typography>
            <ResponsiveContainer width={'99%'}>
                <BarChart
                    data={data}
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
                            <Cell fill={barColor} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default withStyles(styles)(BarChartTemplate);
