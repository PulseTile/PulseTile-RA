import React from "react";
import get from "lodash/get";
import moment from "moment";
import { GET_LIST } from "react-admin";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import customDataProvider from "../../../dataProviders/dataProvider";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import HorizontalBarChart from "./HorizontalBarChart";

const styles = theme => ({
    root: {
        width: '100%',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableList: {
        '& thead': {
            backgroundColor: theme.palette.tableHeadColor,
            '& tr th': {
                fontSize: 14,
                paddingLeft: 10,
            },
        },
        '& tbody tr td span': {
            paddingLeft: 10,
            fontSize: 14,
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.secondaryMainColor,
            '& td span': {
                color: theme.palette.paperColor,
            }
        },
    },
    value: {
        marginTop: 15,
    },
    valueWithBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    chartBlock: {
        width: '60%',
    }
});

const LabResults = ({ classes }) => {
    // const labResults = customDataProvider(GET_LIST, 'labresults', {});
    // const labResultsArray = get(labResults, 'data', []);

    const COLOR_AMBER = '#ffac5a';
    const COLOR_GREEN = '#2dcd0d';
    const COLOR_YELLOW = '#fbf800';
    const COLOR_RED = '#ff5d00';

    const dummyLabResults = [
        { testName: 'HBA1C', normalRange: '5-7 mmol/l', value: 7, units: 'mmol/l', dateCreated: '22-Jun-2019', color: COLOR_GREEN, maximal: 10 },
        { testName: 'Glucose', normalRange: '5-9 mmol/l', value: 6, units: 'mmol/l', dateCreated: '15-Jul-2019', color: COLOR_GREEN, maximal: 60  },
        { testName: 'Glucose', normalRange: '5-9 mmol/l', value: 10, units: 'mmol/l', dateCreated: '26-Jun-2019', color: COLOR_AMBER, maximal: 20  },
        { testName: 'Glucose', normalRange: '5-9 mmol/l', value: 15, units: 'mmol/l', dateCreated: '05-May-2019', color: COLOR_RED, maximal: 20  },
    ];

    return (
        <React.Fragment>
            <div className={classes.blockTitle}>
                <Typography className={classes.title}>Lab Results</Typography>
            </div>
            <Grid container xs={12} className={classes.content}>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.tableList} aria-labelledby="tableTitle">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Normal Range</TableCell>
                                    <TableCell>Value</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                dummyLabResults.map((item, key) => {
                                    return (
                                        <TableRow key={key}>
                                            <TableCell scope="row" padding="none">
                                                <span>{item.testName}</span>
                                            </TableCell>
                                            <TableCell scope="row" padding="none">
                                                <span>{item.normalRange}</span>
                                            </TableCell>
                                            <TableCell scope="row" padding="none">
                                                <div className={classes.valueWithBar}>
                                                    <span className={classes.value}>{item.value} {item.units}</span>
                                                    <div className={classes.chartBlock}>
                                                        <HorizontalBarChart value={item.value} color={item.color} maximal={item.maximal} />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {/*<span>{moment(item.dateCreated).format('DD-MMM-YYYY')}</span>*/}
                                                <span>{item.dateCreated}</span>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}

export default withStyles(styles)(LabResults);
