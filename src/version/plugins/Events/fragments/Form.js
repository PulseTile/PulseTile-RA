import React, { Component } from "react";
import get from "lodash/get";
import moment from "moment";

import { LocalForm, Control } from 'react-redux-form';
import { connect } from 'react-redux';
import { crudUpdate, crudCreate } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

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
    formSelect: {
        width: '100%',
        height: 30,
        paddingLeft: 10,
        backgroundColor: "#fff",
    },
    formTextarea: {
        width: '98%',
        height: 180,
        padding: 10,
    },
    text: {
        padding: 20,
    }
};

const eventTypes = [
    { id: "Appointment", label: "Appointment" },
    { id: "Admission", label: "Admission" },
    { id: "Transfer", label: "Transfer" },
    { id: "Discharge", label: "Discharge" },
];

/**
 * This component returns Events creation/editing form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  classes
 * @param {string} modelName
 */
class Form extends Component {

    state = {
        eventType: null,
    };

    submitForm = data => {
        const { isCreate, createNewItem, updateItem } = this.props;
        const additionalData = {

        };
        const formData = Object.assign({}, data, additionalData);
        if (isCreate) {
            createNewItem(formData);
        } else {
            const filledValues = this.getCurrentItem();
            const id = get(filledValues, 'sourceId', null);
            const source = get(filledValues, 'source', null);
            formData.id = id;
            formData.source = source;
            updateItem(id, formData, filledValues);
        }
    };

    getCurrentItem = () => {
        const { eventsList, location } = this.props;
        const pathname = get(location, 'pathname', null);
        const pathnameArray = pathname.split('/');
        const sourceId = get(pathnameArray, [2], null);
        const eventsListArray = Object.values(eventsList);
        let result = null;
        for (let i = 0, n = eventsListArray.length; i < n; i++) {
            let item = eventsListArray[i];
            if (item.sourceId === sourceId) {
                result = item;
                break;
            }
        }
        return result;
    };

    render() {
        const { classes, isCreate } = this.props;
        let filledValues = isCreate ? null : this.getCurrentItem();
        return (
            <React.Fragment>
                <LocalForm model="event" onSubmit={values => this.submitForm(values)}>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Event Name</FormLabel>
                        <Control.text
                            className={classes.formInput}
                            model='event.name'
                            defaultValue={get(filledValues, 'name', null)}
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Event Type</FormLabel>
                        <Control.select className={classes.formSelect} model='event.type' required>
                            <option value=''>-- Select from --</option>
                            { eventTypes.map((item, key) => {
                                return (
                                    <option key={key} value={item.id}>{item.label}</option>
                                )
                            })}
                        </Control.select>
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Notes</FormLabel>
                        <Control.textarea
                            className={classes.formTextarea}
                            model='event.description'
                            defaultValue={get(filledValues, 'description', null)}
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Event Name</FormLabel>
                        <Control.text
                            className={classes.formInput}
                            model='event.author'
                            defaultValue={get(filledValues, 'author', localStorage.getItem('username'))}
                            disabled={true}
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Date</FormLabel>
                        <Control.text
                            className={classes.formInput}
                            model="event.dateCreated"
                            defaultValue={get(filledValues, 'dateCreated', moment().format('DD-MM-YYYY HH:mm'))}
                            disabled={true}
                        />
                    </FormGroup>

                    <SectionToolbar {...this.props} />

                </LocalForm>
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        eventsList: get(state, 'admin.resources.events.data', []),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewItem(formData) {
            dispatch(crudCreate('events', formData, '/events', '/events'));
        },
        updateItem(id, formData, filledValues) {
            dispatch(crudUpdate('events', id, formData,  filledValues, '/events', '/events'));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Form));
