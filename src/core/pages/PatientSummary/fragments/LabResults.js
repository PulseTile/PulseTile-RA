import React from "react";
import get from "lodash/get";
import moment from "moment";
import { GET_LIST } from "react-admin";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import customDataProvider from "../../../dataProviders/dataProvider";
import Table from "@material-ui/core/Table";
import TableHeadBlock from "../../../../version/pages/ReSPECT/fragments/versions/TableHeadBlock";
import TableBodyBlock from "../../../../version/pages/ReSPECT/fragments/versions/TableBodyBlock";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";

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
            '& tr th span span': {
                color: "#000",
            },
            '& tr th': {
                paddingLeft: 10,
            },
            '& tr': {
                height: 48,
            },
        },
        '& tbody tr td': {
            paddingLeft: 10,
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.secondaryMainColor,
        },
        '& tbody tr:hover td span': {
            color: "#fff"
        }
    },
});

const LabResults = ({ classes }) => {
    const labResults = customDataProvider(GET_LIST, 'labresults', {});
    const labResultsArray = get(labResults, 'data', []);
    console.log('labResults', labResults)

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
                            {
                                (labResultsArray.length > 0) && labResultsArray.map((item, key) => {
                                    return (
                                        <TableRow key={key}>
                                            <TableCell scope="row" padding="none">
                                                <span>{item.testName}</span>
                                            </TableCell>
                                            <TableCell scope="row" padding="none">
                                                <span>{item.normalRange}</span>
                                            </TableCell>
                                            <TableCell scope="row" padding="none">
                                                <span>{item.value}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span>{moment(item.dateCreated).format('DD-MMM-YYYY')}</span>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </Table>
                    </div>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}

export default withStyles(styles)(LabResults);
