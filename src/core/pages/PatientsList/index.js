import React, { Component } from "react";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

import Breadcrumbs from "../../common/Breadcrumbs";
import { patientStatisticAction } from "../../actions/patientsStatisticAction";
import TableHeadBlock from "./fragments/TableHead";
import TableBodyBlock from "./fragments/TableBody";
import CustomPaginator from "../../common/Buttons/CustomPaginator";
import dummyPatients from "./dummyPatients";

/**
 * This function redirects user to PatientSummary and update userID
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {number} id
 * @param {shape}  history
 */
function redirectToSummary(id, history) {
    localStorage.setItem('userId', id);
    history.push('/summary');
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableList: {
        minWidth: 1020,
        '& thead': {
            backgroundColor: "#e5e5e5",
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
            backgroundColor: theme.templates.listTemplate.tableList.backgroundColorHover,
        },
        '& tbody tr:hover td span': {
            color: "#fff"
        }
    },
});

/**
 * This component returns block with Patients list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} history
 * @param {shape} rest
 * @constructor
 */
class PatientsList extends Component   {

    state = {
        page: 1,
    };

    componentDidMount() {
        this.props.getPatientsList();
    }

    goToPage = page => {
        this.setState({ page: page });
    };

    onRowClick = id => {
        localStorage.setItem('userId', id);
        this.props.history.push('/summary');
    };

    render() {
        const { classes, patientsList } = this.props;
        const { page } = this.state;
        const breadcrumbsResource = [
            { url: "/patients", title: "Patients list", isActive: false }
        ];
        // const data = patientsList ?  Object.values(patientsList) : [];

        const data = dummyPatients;
        console.log('dummyPatients', dummyPatients);


        const total = data.length;
        return (
            <React.Fragment>
                <Breadcrumbs resource={breadcrumbsResource} />
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.tableList} aria-labelledby="tableTitle">
                            <TableHeadBlock />
                            { patientsList &&
                                <TableBodyBlock onRowClick={this.onRowClick} data={data} rowsPerPage={10} page={this.state.page} />
                            }
                            <CustomPaginator onClick={this.goToPage} classes={classes} itemsPerPage={10} total={total} />
                        </Table>
                    </div>
                </Paper>

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        patientsList: state.custom.patientsStatistic.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPatientsList() {
            dispatch(patientStatisticAction.request());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientsList));
