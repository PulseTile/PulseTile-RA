import React, { Component } from "react";
import { LocalForm, Control } from 'react-redux-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Range } from "react-range";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import DialogTemplate from "./DialogTemplate";

import RenderTrack from "./fragments/RenderTrack";
import RenderThumb from "./fragments/RenderThumb";
import formStyles from "./fragments/formStyles";

class ClinicalQueryDialog extends Component {

    state = {
        ageParams: 'ageRange',
        dateOfBirth: null,
        gender: 'male',
        age: [50]
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

    render() {
        const { classes } = this.props;
        const { age, ageParams, dateOfBirth, gender } = this.state;
        return (
            <DialogTemplate
                title="Clinical Query"
                {...this.props}
            >
                <LocalForm model="clinicalQuery" onSubmit={values => this.submitForm(values)}>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Select Age Params</FormLabel>
                        <Control.select className={classes.formSelect} model='clinicalQuery.searchType' required>
                            <option value='allergies'>Allergies</option>
                            <option value='problems' selected>Problems / Diagnosis</option>
                            <option value='procedures'>Procedures</option>
                            <option value='medications' selected>Medications</option>
                        </Control.select>
                    </FormGroup>

                    <FormGroup className={classes.smallFormGroup}>
                        <FormLabel className={classes.formLabel}>Search Query</FormLabel>
                        <Control.select className={classes.formSelect} model='clinicalQuery.searchQuery' required>
                            <option value='contains'>Contains</option>
                        </Control.select>
                        <Control.text
                            className={classes.formInput}
                            model="advancedSearch.value"
                        />
                    </FormGroup>


                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Select Age Params</FormLabel>
                        <Control.select className={classes.formSelect} model='clinicalQuery.ageParams' onChange={e => this.changeAgeParams(e)} required>
                            <option value='dateOfBirth'>Date of Birth</option>
                            <option value='ageRange' selected>Age Range</option>
                        </Control.select>
                    </FormGroup>

                    { ageParams === 'ageRange' ?

                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Age Range (Years)</FormLabel>
                            <div className={classes.rangeLine}>
                                <Range
                                    values={age} step={10} min={0} max={100} onChange={values => this.onChangeRange(values)}
                                    renderTrack={({ props, children }) =>
                                        <RenderTrack props={props} children={children} preferencesValue={age} min={0} max={100} />}
                                    renderThumb={({ props, isDragged }) =>
                                        <RenderThumb props={props} isDragged={isDragged} />}
                                />
                            </div>
                        </FormGroup>

                        :

                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Date of Birth</FormLabel>
                            <DatePicker
                                className={classes.formInput}
                                selected={dateOfBirth}
                                onChange={value => this.changeDateOfBirth(value)}
                                dateFormat={'DD-MM-YYYY'}
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


                </LocalForm>
            </DialogTemplate>
        );
    }
};

export default withStyles(formStyles)(ClinicalQueryDialog);
