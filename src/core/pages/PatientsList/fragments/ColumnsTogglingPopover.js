import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";

const styles = theme => ({
    checkboxItem: {
        width: 120,
    },
    selectAll: {
        display: "block",
        border: `1px solid ${theme.palette.secondaryMainColor}`,
        height: 'auto',
        width: 120,
        boxSizing: "border-box",
        borderRadius: theme.isRectangleButtons ? 0 : 25,
        color: theme.palette.secondaryMainColor,
        '&:hover': {
            color: theme.palette.paperColor,
            backgroundColor: theme.palette.secondaryMainColor
        }
    },
    formGroup: {
        paddingTop: 10,
        paddingBottom: 10,
    }
});

const CustomDisabledCheckbox = withStyles(theme => ({
    root: {
        color: theme.palette.disabledColor,
        '&$checked': {
            color: theme.palette.disabledColor,
        },
    },
    checked: {},
}))(props => <Checkbox color="default" {...props} />);

const CustomCheckbox = withStyles(theme => ({
    root: {
        color: theme.palette.secondaryMainColor,
        '&$checked': {
            color: theme.palette.secondaryMainColor,
        },
    },
    checked: {},
}))(props => <Checkbox color="default" {...props} />);

const columnsArray = [
    'name', 'address', 'born', 'gender', 'nhsNumber',
    'ordersDate', 'resultsDate', 'vitalsDate', 'problemsDate',
    'ordersCount', 'resultsCount', 'vitalsCount', 'problemsCount'
];

const defaultHiddenColumns = [
    'ordersDate', 'resultsDate', 'vitalsDate', 'problemsDate',
    'ordersCount', 'resultsCount', 'vitalsCount', 'problemsCount'
];

const PATIENT_INFO = 'patientInfo';
const DATE_TIME = 'dateTime';
const COUNT = 'count';

class ColumnsTogglingPopover extends Component {

    state = {
        patientInfo: true,
        name: true,
        gender: true,
        born: true,
        address: true,
        nhsNumber: true,
        dateTime: false,
        // ordersDate: false,
        // resultsDate: false,
        vitalsDate: false,
        problemsDate: false,
        count: false,
        // ordersCount: false,
        // resultsCount: false,
        vitalsCount: false,
        problemsCount: false,
    };

    componentDidMount() {
        const { hiddenColumns } = this.props;
        columnsArray.map(item => {
            if (hiddenColumns.length > 0) {
                this.setState({
                    [item]: (hiddenColumns.indexOf(item) === -1)
                });
            } else {
                this.setState({
                    dateTime: true,
                    ordersDate: true,
                    resultsDate: true,
                    vitalsDate: true,
                    problemsDate: true,
                    count: true,
                    ordersCount: true,
                    resultsCount: true,
                    vitalsCount: true,
                    problemsCount: true,
                });
            }
        });
    }

    handleChange = columnName => {
        const value = !this.state[columnName];
        this.setState(
            {[columnName]: value},
            () => this.props.toggleColumn(columnName, value)
        );
    };

    toggleColumnIfHidden = (columnName, value) => {
        const { hiddenColumns } = this.props;
        if (value && hiddenColumns.indexOf(columnName) !== -1) {
            this.props.toggleColumn(columnName, value);
        } else if (!value) {
            this.props.toggleColumn(columnName, value);
        }
    };

    selectAll = value => {
        const { patientInfo, dateTime, count } = this.state;
        if (value === PATIENT_INFO) {
            const patientInfoValue = !patientInfo;
            this.setState({
                patientInfo: patientInfoValue,
                address: patientInfoValue,
                nhsNumber: patientInfoValue,
            });
            this.toggleColumnIfHidden('address', patientInfoValue);
            this.toggleColumnIfHidden('nhsNumber', patientInfoValue);
        }

        if (value === DATE_TIME) {
            const dateTimeValue = !dateTime;
            this.setState({
                dateTime: dateTimeValue,
                // ordersDate: dateTimeValue,
                // resultsDate: dateTimeValue,
                vitalsDate: dateTimeValue,
                problemsDate: dateTimeValue,
            });
            // this.toggleColumnIfHidden('ordersDate', dateTimeValue);
            // this.toggleColumnIfHidden('resultsDate', dateTimeValue);
            this.toggleColumnIfHidden('vitalsDate', dateTimeValue);
            this.toggleColumnIfHidden('problemsDate', dateTimeValue);
        }

        if (value === COUNT) {
            const countValue = !count;
            this.setState({
                count: countValue,
                // ordersCount: countValue,
                // resultsCount: countValue,
                vitalsCount: countValue,
                problemsCount: countValue,
            });
            // this.toggleColumnIfHidden('ordersCount', countValue);
            // this.toggleColumnIfHidden('resultsCount', countValue);
            this.toggleColumnIfHidden('vitalsCount', countValue);
            this.toggleColumnIfHidden('problemsCount', countValue);
        }

    };

    render() {
        const { classes } = this.props;
        const {
            name, gender, born, address, nhsNumber,
            ordersDate, resultsDate, vitalsDate, problemsDate,
            ordersCount, resultsCount, vitalsCount, problemsCount,
        } = this.state;

        return (
            <React.Fragment>

                <div>
                    <Typography>PATIENT INFO</Typography>
                    <Divider />
                    <FormGroup row>
                        <FormControlLabel
                            className={classes.checkboxItem}
                            control={<CustomDisabledCheckbox checked={name} onChange={() => this.handleChange("name")} value="name" disabled={true} />}
                            label="Name"
                        />
                        <FormControlLabel
                            className={classes.checkboxItem}
                            control={<CustomDisabledCheckbox checked={gender} onChange={() => this.handleChange("gender")} value="gender" disabled={true} />}
                            label="Gender"
                        />
                        <FormControlLabel
                            className={classes.checkboxItem}
                            control={<CustomDisabledCheckbox checked={born} onChange={() => this.handleChange("born")} value="born" disabled={true} />}
                            label="Born"
                        />
                    </FormGroup>
                    <FormGroup row>
                        <FormControlLabel
                            className={classes.checkboxItem}
                            control={<CustomCheckbox checked={address} onChange={() => this.handleChange("address")} value="address" />}
                            label="Address"
                        />
                        <FormControlLabel
                            className={classes.checkboxItem}
                            control={<CustomCheckbox checked={nhsNumber} onChange={() => this.handleChange("nhsNumber")} value="nhsNumber" />}
                            label="NHS No."
                        />
                        <Button onClick={() => this.selectAll(PATIENT_INFO)} aria-label="Select All" className={classes.selectAll}>
                            Select all
                        </Button>
                    </FormGroup>
                </div>

                <div>
                    <Typography>DATE / TIME</Typography>
                    <Divider />
                    <FormGroup row>
                        {/*<FormControlLabel*/}
                        {/*    className={classes.checkboxItem}*/}
                        {/*    control={<CustomCheckbox checked={ordersDate} onChange={() => this.handleChange("ordersDate")} value="ordersDate" />}*/}
                        {/*    label="Orders"*/}
                        {/*/>*/}
                        {/*<FormControlLabel*/}
                        {/*    className={classes.checkboxItem}*/}
                        {/*    control={<CustomCheckbox checked={resultsDate} onChange={() => this.handleChange("resultsDate")} value="resultsDate" />}*/}
                        {/*    label="Results"*/}
                        {/*/>*/}

                    </FormGroup>
                    <FormGroup className={classes.formGroup} row>
                        <FormControlLabel
                            className={classes.checkboxItem}
                            control={<CustomCheckbox checked={vitalsDate} onChange={() => this.handleChange("vitalsDate")} value="vitalsDate" />}
                            label="Vitals"
                        />
                        <FormControlLabel
                            className={classes.checkboxItem}
                            control={<CustomCheckbox checked={problemsDate} onChange={() => this.handleChange("problemsDate")} value="problemsDate" />}
                            label="Problems"
                        />
                        <Button onClick={() => this.selectAll(DATE_TIME)} aria-label="Select All" className={classes.selectAll}>
                            Select all
                        </Button>
                    </FormGroup>
                </div>

                <div>
                    <Typography>COUNT</Typography>
                    <Divider />
                    <FormGroup row>
                        {/*<FormControlLabel*/}
                        {/*    className={classes.checkboxItem}*/}
                        {/*    control={<CustomCheckbox checked={ordersCount} onChange={() => this.handleChange("ordersCount")} value="ordersCount" />}*/}
                        {/*    label="Orders"*/}
                        {/*/>*/}
                        {/*<FormControlLabel*/}
                        {/*    className={classes.checkboxItem}*/}
                        {/*    control={<CustomCheckbox checked={resultsCount} onChange={() => this.handleChange("resultsCount")} value="resultsCount" />}*/}
                        {/*    label="Results"*/}
                        {/*/>*/}

                    </FormGroup>
                    <FormGroup className={classes.formGroup} row>
                        <FormControlLabel
                            className={classes.checkboxItem}
                            control={<CustomCheckbox checked={vitalsCount} onChange={() => this.handleChange("vitalsCount")} value="vitalsCount" />}
                            label="Vitals"
                        />
                        <FormControlLabel
                            className={classes.checkboxItem}
                            control={<CustomCheckbox checked={problemsCount} onChange={() => this.handleChange("problemsCount")} value="problemsCount" />}
                            label="Problems"
                        />
                        <Button onClick={() => this.selectAll(COUNT)} aria-label="Select All" className={classes.selectAll}>
                            Select all
                        </Button>
                    </FormGroup>
                </div>

            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        hiddenColumns:  get(state, 'custom.toggleColumns.data.patients', []),
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(ColumnsTogglingPopover));
