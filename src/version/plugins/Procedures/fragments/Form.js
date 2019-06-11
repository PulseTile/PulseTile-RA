import React, { Component } from "react";
import get from "lodash/get";
import { LocalForm, Control } from 'react-redux-form';
import { connect } from 'react-redux';
import { crudUpdate, crudCreate } from 'react-admin';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from "@material-ui/core/Typography";
import {selectors} from "../../TransferOfCare/fragments/selectors";
import SectionToolbar from "../../../../core/common/Toolbars/CustomFormToolbar";

const styles = {
    formGroup: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        boxSizing: "border-box",
    },
    formLabel: {
        display: "block",
        fontWeight: 800,
        color: "#000",
        fontSize: 14,
        marginBottom: 15,
    },
    formInput: {
        width: '100%',
        height: 25,
        paddingLeft: 10,
    },
    formTextarea: {
        width: '98%',
        height: 180,
        padding: 10,
    },
};

/**
 * This component returns Procedures creation/editing form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
class ProceduresForm extends Component {

    state = {
        procedureDate: null,
    };

    componentDidMount() {
        const filledValues = this.getCurrentItem();
        this.setState({
            procedureDate: get(filledValues, 'date', null),
        })
    }

    submitForm = data => {
        const { isCreate, createProcedure, updateProcedure } = this.props;
        const { procedureDate } = this.state;
        const datetime = moment(procedureDate).format('DD-MM-YYYY HH:mm:ss');
        const datetimeArray = datetime.split(' ');
        const dateTimeUnix = moment(datetime, 'DD-MM-YYYY HH:mm:ss').unix();
        const dateUnix = moment(datetimeArray[0], 'DD-MM-YYYY').unix();
        const time = dateTimeUnix - dateUnix;
        const additionalData = {
            currentStatus: "",
            date: dateUnix * 1000,
            dateSubmitted: moment(data.dateCreated, 'DD-MM-YYYY HH:mm').format(),
            name: data.procedureName,
            originalComposition: "",
            originalSource: "",
            source: "ethercis",
            time: time * 1000,
            userId: localStorage.getItem('userId'),
        };
        const formData = Object.assign({}, data, additionalData);
        if (isCreate) {
            createProcedure(formData);
        } else {
            const filledValues = this.getCurrentItem();
            const id = get(filledValues, 'sourceId', null);
            const source = get(filledValues, 'source', "ethercis");
            formData.id = id;
            formData.source = source;
            updateProcedure(id, formData, filledValues);
        }
    };

    getCurrentItem = () => {
        const { proceduresList, location } = this.props;
        const pathname = get(location, 'pathname', null);
        const pathnameArray = pathname.split('/');
        const sourceId = get(pathnameArray, [2], null);
        const proceduresListArray = Object.values(proceduresList);
        let result = null;
        for (let i = 0, n = proceduresListArray.length; i < n; i++) {
            let item = proceduresListArray[i];
            if (item.sourceId === sourceId) {
                result = item;
                break;
            }
        }
        return result;
    };

    changeProcedureDate = value => {
        this.setState({
            procedureDate: value,
        })
    };


    render() {
        const { classes, isCreate } = this.props;
        const { procedureDate } = this.state;
        let filledValues = isCreate ? null : this.getCurrentItem();
        return (
            <React.Fragment>
                <LocalForm model="procedures" onSubmit={values => this.submitForm(values)}>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Procedure Name</FormLabel>
                        <Control.text
                            className={classes.formInput}
                            model="procedures.procedureName"
                            defaultValue={get(filledValues, 'name', null)}
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Date of Procedure</FormLabel>
                        <DatePicker
                            className={classes.formInput}
                            selected={procedureDate}
                            onChange={value => this.changeProcedureDate(value)}
                            todayButton="Today"
                            dateFormat={'dd-MM-YYYY HH:mm'}
                            showTimeSelect
                            timeFormat="HH:mm"
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Procedure Performed By</FormLabel>
                        <Control.text
                            className={classes.formInput}
                            model="procedures.performer"
                            defaultValue={get(filledValues, 'performer', null)}
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Procedure Notes</FormLabel>
                        <Control.textarea
                            className={classes.formTextarea}
                            model="procedures.notes"
                            defaultValue={get(filledValues, 'notes', null)}
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Terminology</FormLabel>
                        <Control.text
                            className={classes.formInput}
                            model="procedures.procedureTerminology"
                            defaultValue={get(filledValues, 'procedureTerminology', null)}
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Code</FormLabel>
                        <Control.text
                            className={classes.formInput}
                            model="procedures.procedureCode"
                            defaultValue={get(filledValues, 'procedureCode', null)}
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Author</FormLabel>
                        <Control.text
                            className={classes.formInput}
                            model="procedures.author"
                            defaultValue={get(filledValues, 'author', localStorage.getItem('username'))}
                            disabled={true}
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Date</FormLabel>
                        <Control.text
                            className={classes.formInput}
                            model="procedures.dateCreated"
                            defaultValue={get(filledValues, 'dateCreated', moment().format('DD-MM-YYYY HH:mm'))}
                            disabled={true}
                        />
                    </FormGroup>

                    <SectionToolbar {...this.props} />

                </LocalForm>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        proceduresList: get(state, 'admin.resources.procedures.data', []),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createProcedure(formData) {
            dispatch(crudCreate('procedures', formData, '/procedures', '/procedures'));
        },
        updateProcedure(id, formData, filledValues) {
            dispatch(crudUpdate('procedures', id, formData,  filledValues, '/procedures', '/procedures'));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProceduresForm));
