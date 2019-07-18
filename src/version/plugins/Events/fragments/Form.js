import React, { Component } from "react";
import get from "lodash/get";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { LocalForm, Control } from 'react-redux-form';
import { connect } from 'react-redux';
import { crudUpdate, crudCreate } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import SectionToolbar from "../../../../core/common/Toolbars/CustomFormToolbar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomSwitch from "../../Vitals/fragments/CustomSwitch";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";

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
    formControlLabel: {
        marginLeft: -10,
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
    },
    checkboxBlock: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
    },
    switcherLabel: {
        marginLeft: 10,
    },
};

const eventTypes = [
    { id: "Appointment", label: "Appointment" },
    { id: "Admission", label: "Admission" },
    { id: "Transfer", label: "Transfer" },
    { id: "Discharge", label: "Discharge" },
];

const connectionTypes = [
    { id: "connection1", label: "Connection 1" },
    { id: "connection2", label: "Connection 2" },
    { id: "connection3", label: "Connection 3" },
    { id: "connection4", label: "Connection 4" },
];

const detailsTypes = [
    { id: "details1", label: "Details 1" },
    { id: "details2", label: "Details 2" },
    { id: "details3", label: "Details 3" },
    { id: "details4", label: "Details 4" },
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
        eventDateTime: null,
        // toMakeConnection: false,
    };

    componentDidMount() {
        const { isCreate } = this.props;
        const filledValues = isCreate ? null : this.getCurrentItem();
        this.setState({
            eventType: get(filledValues, 'type', null),
        });
    }

    changeDate = value => {
        this.setState({
            eventDateTime: value,
        });
    };

    changeEventType = e => {
        this.setState({
            eventType: e.target.value,
        });
    };

    // toggleMakeConnection = () => {
    //     this.setState({
    //         toMakeConnection: !this.state.toMakeConnection,
    //     });
    // };

    getConvertDateTime = () => {
        const { isCreate } = this.props;
        const filledValues = isCreate ? null : this.getCurrentItem();
        const dateTime = get(filledValues, 'dateTime', null)
        const dateObj = new Date(dateTime);
        return dateObj.toISOString();
    };

    submitForm = data => {
        const { isCreate, createNewItem, updateItem } = this.props;
        const { eventDateTime } = this.state;
        const filledValues = isCreate ? null : this.getCurrentItem();
        const newType =  get(data, 'type', null);
        const additionalData = {
            dateTime: eventDateTime ? eventDateTime.toISOString() : this.getConvertDateTime(),
            type: newType ? newType : get(filledValues, 'type', null),
            dateCreated: isCreate ? 1000 * moment().unix() : get(filledValues, 'dateCreated', null),
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
        const { eventDateTime, eventType, toMakeConnection } = this.state;
        const filledValues = isCreate ? null : this.getCurrentItem();
        const dateTime= get(filledValues, 'dateTime', null);
        const dateCreated = get(filledValues, 'dateCreated', null);
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
                        <Control.select className={classes.formSelect} model='event.type' onChange={(e) => this.changeEventType(e)} required>
                            <option value=''>-- Select from --</option>
                            { eventTypes.map((item, key) => {
                                return (
                                    <option key={key} value={item.id} selected={item.id === get(filledValues, 'type', null)}>{item.label}</option>
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
                        <FormLabel className={classes.formLabel}>Event date</FormLabel>
                        <DatePicker
                            className={classes.formInput}
                            selected={eventDateTime ? eventDateTime : dateTime}
                            onChange={value => this.changeDate(value)}
                            showTimeSelect
                            dateFormat="dd-MM-yyyy HH:mm"
                            timeFormat="HH:mm"
                            timeIntervals={15}
                        />
                    </FormGroup>

                    {/*{*/}
                    {/*    (eventType === "Discharge") &&*/}

                    {/*        <React.Fragment>*/}

                    {/*            <div className={classes.checkboxBlock}>*/}
                    {/*                <FormControl className={classes.formControl}>*/}
                    {/*                    <FormLabel className={classes.formLabel}>To make connection</FormLabel>*/}
                    {/*                    <FormControlLabel*/}
                    {/*                        className={classes.formControlLabel}*/}
                    {/*                        control={*/}
                    {/*                            <CustomSwitch*/}
                    {/*                                checked={toMakeConnection}*/}
                    {/*                                value={toMakeConnection}*/}
                    {/*                                onChange={() => this.toggleMakeConnection()}*/}
                    {/*                            />*/}
                    {/*                        }*/}
                    {/*                        label={<Typography className={classes.switcherLabel}>{toMakeConnection ? "Yes" : "No"}</Typography>}*/}
                    {/*                    />*/}
                    {/*                </FormControl>*/}
                    {/*            </div>*/}

                    {/*            {*/}
                    {/*                toMakeConnection &&*/}
                    {/*                    <FormGroup className={classes.formGroup}>*/}
                    {/*                        <FormLabel className={classes.formLabel}>To make connection with</FormLabel>*/}
                    {/*                        <Control.select className={classes.formSelect} model='event.connection' required>*/}
                    {/*                            <option value=''>-- Select from --</option>*/}
                    {/*                            { connectionTypes.map((item, key) => {*/}
                    {/*                                return (*/}
                    {/*                                    <option key={key} value={item.id} selected={item.id === get(filledValues, 'connection', null)}>{item.label}</option>*/}
                    {/*                                )*/}
                    {/*                            })}*/}
                    {/*                        </Control.select>*/}
                    {/*                    </FormGroup>*/}
                    {/*            }*/}

                    {/*            <FormGroup className={classes.formGroup}>*/}
                    {/*                <FormLabel className={classes.formLabel}>Details</FormLabel>*/}
                    {/*                <Control.select className={classes.formSelect} model='event.details' required>*/}
                    {/*                    <option value=''>-- Select from --</option>*/}
                    {/*                    { detailsTypes.map((item, key) => {*/}
                    {/*                        return (*/}
                    {/*                            <option key={key} value={item.id} selected={item.id === get(filledValues, 'details', null)}>{item.label}</option>*/}
                    {/*                        )*/}
                    {/*                    })}*/}
                    {/*                </Control.select>*/}
                    {/*            </FormGroup>*/}

                    {/*        </React.Fragment>*/}
                    {/*}*/}

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Author</FormLabel>
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
                            defaultValue={dateCreated ? moment(dateCreated).format('DD-MM-YYYY') : moment().format('DD-MM-YYYY')}
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
