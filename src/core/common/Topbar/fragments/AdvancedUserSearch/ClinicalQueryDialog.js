import React, { Component } from "react";
import { LocalForm, Control } from 'react-redux-form';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

class ClinicalQueryDialog extends Component {

    state = {
        ageParams: 'ageRange',
        dateOfBirth: null,
        gender: null,
        age: [0, 100],
        searchType: null,
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

    changeSearchType = e => {
        this.setState({
            searchType: e.target.value,
        })
    };

    getBlockTitle = () => {
        const { age, ageParams, searchType, dateOfBirth, gender } = this.state;
        let title = "Clinical Query";
        let titleArray = [];
        if (searchType) {
            titleArray.push(`Search Type: ${searchType}`)
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

    render() {
        const { classes, onClose } = this.props;
        const { age, ageParams, dateOfBirth, gender } = this.state;
        const title = this.getBlockTitle();
        return (
            <DialogTemplate
                title={title}
                {...this.props}
            >
                <LocalForm model="clinicalQuery" onSubmit={values => this.submitForm(values)}>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Search Type</FormLabel>
                        <Control.select className={classes.formSelect} model='searchType' onChange={e => this.changeSearchType(e)} required>
                            <option></option>
                            <option value='allergies'>Allergies</option>
                            <option value='problems'>Problems / Diagnosis</option>
                            <option value='procedures'>Procedures</option>
                            <option value='medications'>Medications</option>
                        </Control.select>
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Search Query</FormLabel>
                        <div className={classes.searchQueryBlock}>
                            <Control.select className={classes.formSelect} model='searchQuery' required>
                                <option value='contains'>Contains</option>
                            </Control.select>
                            <Control.text
                                className={classes.formInputRight}
                                model="value"
                            />
                        </div>
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Select Age Params</FormLabel>
                        <Control.select className={classes.formSelect} model='ageParams' onChange={e => this.changeAgeParams(e)} required>
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

export default withStyles(formStyles)(ClinicalQueryDialog);
