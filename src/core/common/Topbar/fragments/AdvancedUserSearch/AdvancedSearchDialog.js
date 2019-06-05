import React, { Component } from "react";
import { LocalForm, Control } from 'react-redux-form';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import DialogTemplate from "./DialogTemplate";
import formStyles from "./fragments/formStyles";
import RangeLine from "./fragments/RangeLine";
import Button from "@material-ui/core/Button";

import { userSearchAction } from "../../../../actions/userSearchAction";
import { currentPatientAction } from "../../../../actions/currentPatientAction";

class AdvancedSearchDialog extends Component {

    state = {
        ageParams: 'ageRange',
        dateOfBirth: null,
        gender: null,
        age: [0, 100],
        nhsNumber: null,
        lastName: null,
        firstName: null,
    };

    changeAgeParams = e => {
        this.setState({
            ageParams: e.target.value,
        });
    };

    changeDateOfBirth = value => {
        this.setState({
            dateOfBirth: value,
        })
    };

    handleChangeGender = e => {
        this.setState({
            gender: e.target.value,
        })
    };

    onChangeRange = values => {
        this.setState({
            age: values
        });
    };

    changeBlockTitle = (e, paramName) => {
        this.setState({
            [paramName]: e.target.value,
        })
    };

    getBlockTitle = () => {
        const { age, ageParams, nhsNumber, firstName, lastName, dateOfBirth, gender } = this.state;
        let title = "Patient Search - Advanced";
        let titleArray = [];
        if (nhsNumber) {
            titleArray.push(`NHS number: ${nhsNumber}`)
        }
        if (firstName) {
            titleArray.push(`First Name: ${firstName}`)
        }
        if (lastName) {
            titleArray.push(`Last Name: ${lastName}`)
        }
        if (ageParams === 'ageRange') {
            titleArray.push(`Age Range: ${age[0]}-${age[1]}`)
        } else if (dateOfBirth) {
            titleArray.push(`Date of Birth: ${moment(dateOfBirth).format('DD-MMM-YYYY')}`)
        }
        if (gender) {
            titleArray.push(`Gender: ${gender}`)
        }
        if (titleArray.length > 0) {
            title += ': ';
            title += titleArray.join(', ')
        }
        return title;
    };

    submitForm = formData => {
        const { lastName, nhsNumber } = formData;
        this.props.removeUserSearch();
        if (nhsNumber) {
            this.props.setUserId(nhsNumber);
        } else if (lastName) {
            this.props.setUserSearch(lastName.toLowerCase());
        }
        window.location.replace('/#/patients');
        this.props.onClose();
    };

    render() {
        const { classes, onClose } = this.props;
        const { age, ageParams, dateOfBirth, gender } = this.state;
        const title = this.getBlockTitle();
        return (
            <DialogTemplate
                title={title}
                {...this.props}
            >
                <LocalForm model="advancedSearch" onSubmit={values => this.submitForm(values)}>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>NHS Number</FormLabel>
                        <Control.text
                            className={classes.formInput}
                            type="number"
                            model="advancedSearch.nhsNumber"
                            placeholder="e.g. 123 456 7890"
                            onChange={e => this.changeBlockTitle(e, 'nhsNumber')}
                        />
                    </FormGroup>

                    <FormGroup className={classes.smallFormGroup}>
                        <FormLabel className={classes.formLabel}>Last Name</FormLabel>
                        <Control.text
                            className={classes.formInput}
                            model="advancedSearch.lastName"
                            onChange={e => this.changeBlockTitle(e, 'lastName')}
                            placeholder="e.g. Smith"
                        />
                    </FormGroup>

                    <FormGroup className={classes.smallFormGroup}>
                        <FormLabel className={classes.formLabel}>First Name</FormLabel>
                        <Control.text
                            className={classes.formInput}
                            model="advancedSearch.firstName"
                            onChange={e => this.changeBlockTitle(e, 'firstName')}
                            placeholder="e.g. John"
                        />
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Select Age Params</FormLabel>
                        <Control.select className={classes.formSelect} model='ageParams' onChange={e => this.changeAgeParams(e)}>
                            <option value='dateOfBirth'>Date of Birth</option>
                            <option value='ageRange' selected>Age Range</option>
                        </Control.select>
                    </FormGroup>

                    { ageParams === 'ageRange'
                        ?
                            <FormGroup className={classes.formGroup}>
                                <FormLabel className={classes.formLabel}>Age Range (Years)</FormLabel>
                                <RangeLine age={age} onChangeRange={this.onChangeRange} />
                            </FormGroup>
                        :
                            <FormGroup className={classes.formGroup}>
                                <FormLabel className={classes.formLabel}>Date of Birth</FormLabel>
                                <DatePicker
                                    className={classes.formInput}
                                    popperPlacement="auto-right"
                                    selected={dateOfBirth}
                                    onChange={value => this.changeDateOfBirth(value)}
                                    dateFormat={'dd-MM-YYYY'}
                                />
                            </FormGroup>
                    }

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Gender</FormLabel>
                        <RadioGroup name="gender" className={classes.radioGroup} value={gender} onChange={e => this.handleChangeGender(e)}>
                            <FormControlLabel
                                className={classes.formControlLabel}
                                value="male"
                                control={<Radio />}
                                label="Male"
                            />
                            <FormControlLabel
                                className={classes.formControlLabel}
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                        </RadioGroup>
                    </FormGroup>

                    <div className={classes.toolbar}>
                        <Button type="button" aria-label="Close" className={classes.closeButton} onClick={() => onClose()}>Close</Button>
                        <Button type="submit" aria-label="Reload page" className={classes.searchButton}>Search</Button>
                    </div>

                </LocalForm>
            </DialogTemplate>
        );
    }
};


const mapDispatchToProps = dispatch => {
    return {
        setUserSearch(data) {
            dispatch(userSearchAction.request(data));
        },
        setUserId(data) {
            dispatch(userSearchAction.requestId(data));
        },
        removeUserSearch() {
            dispatch(userSearchAction.remove());
        },
    }
};

export default connect(null, mapDispatchToProps)(withStyles(formStyles)(AdvancedSearchDialog));
