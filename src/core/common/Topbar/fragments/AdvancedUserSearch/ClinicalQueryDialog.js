import React, { Component } from "react";
import get from "lodash/get";
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

import { userSearchAction } from "../../../../actions/userSearchAction";
import { advancedSearchAction } from "../../../../actions/advancedSearchAction";
import { clinicalQueryAction } from "../../../../actions/clinicalQueryAction";
import DialogTemplate from "./DialogTemplate";
import formStyles from "./fragments/formStyles";
import RangeLine from "./fragments/RangeLine";
import Button from "@material-ui/core/Button";

class ClinicalQueryDialog extends Component {

    state = {
        searchQuery: null,
        searchValue: null,
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

    changeBlockTitle = (e, paramName) => {
        this.setState({
            [paramName]: e.target.value,
        })
    };

    getBlockTitle = () => {
        const { searchQuery, searchValue, age, ageParams, searchType, dateOfBirth, gender } = this.state;
        let title = "Clinical Query";
        let titleArray = [];
        if (searchType) {
            titleArray.push(`Search Type: ${searchType}`)
        }
        if (searchQuery && searchValue) {
            titleArray.push(`${searchQuery}: ${searchValue}`)
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
        const { searchType, ageParams, searchQuery, searchValue, dateOfBirth, gender, age } = this.state;

        const clinicalQueryData = {
            title: this.getBlockTitle(),
            searchType: searchType,
            searchQuery: searchQuery,
            searchValue: searchValue,
            dateOfBirth: (ageParams === 'dateOfBirth' && dateOfBirth) ? moment(dateOfBirth).format('DD-MM-YYYY') : null,
            minAge: age[0],
            maxAge: age[1],
            gender: gender
        };

        this.props.removeUserSearch();
        this.props.removeAdvancedSearch();
        this.props.setClinicalQuery(clinicalQueryData);

        window.location.replace('/#/patients');
        this.props.onClose();
    };

    closeModal = () => {
        this.setState({
            searchQuery: null,
            searchValue: null,
            ageParams: 'ageRange',
            dateOfBirth: null,
            gender: null,
            age: [0, 100],
            searchType: null,
        });
        this.props.removeClinicalQuery();
        this.props.onClose();
    };

    render() {
        const { classes } = this.props;
        const { age, searchType, searchValue, searchQuery, ageParams, dateOfBirth, gender } = this.state;
        const title = this.getBlockTitle();
        return (
            <DialogTemplate
                title={title}
                {...this.props}
            >
                <LocalForm model="clinicalQuery" onSubmit={values => this.submitForm(values)}>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Search Type</FormLabel>
                        <Control.select className={classes.formSelect} model='clinicalQuery.searchType' onChange={e => this.changeSearchType(e)} required>
                            <option></option>
                            <option value='allergies' selected={searchType === 'allergies'}>Allergies</option>
                            <option value='problems' selected={searchType === 'problems'}>Problems / Diagnosis</option>
                            <option value='procedures' selected={searchType === 'procedures'}>Procedures</option>
                            <option value='medications' selected={searchType === 'medications'}>Medications</option>
                        </Control.select>
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Search Query</FormLabel>
                        <div className={classes.searchQueryBlock}>
                            <Control.select className={classes.formSelect} model='clinicalQuery.searchQuery' onChange={e => this.changeBlockTitle(e, 'searchQuery')}>
                                <option></option>
                                <option value='contains' selected={searchQuery === 'contains'}>Contains</option>
                            </Control.select>
                            <Control.text
                                className={classes.formInputRight}
                                model="clinicalQuery.searchValue"
                                defaultValue={searchValue}
                                onChange={e => this.changeBlockTitle(e, 'searchValue')}
                                required
                            />
                        </div>
                    </FormGroup>

                    <FormGroup className={classes.formGroup}>
                        <FormLabel className={classes.formLabel}>Select Age Params</FormLabel>
                        <Control.select className={classes.formSelect} model='ageParams' onChange={e => this.changeAgeParams(e)}>
                            <option value='ageRange' selected={ageParams === 'ageRange'}>Age Range</option>
                            <option value='dateOfBirth' selected={ageParams === 'dateOfBirth'}>Date of Birth</option>
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
                        <Button type="button" aria-label="Close" className={classes.closeButton} onClick={() => this.closeModal()}>Close</Button>
                        <Button type="submit" aria-label="Reload page" className={classes.searchButton}>Search</Button>
                    </div>

                </LocalForm>
            </DialogTemplate>
        );
    }
};

const mapStateToProps = state => {
    return {
        clinicalQueryInfo: get(state, 'custom.clinicalQuery.data', null),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        removeUserSearch() {
            dispatch(userSearchAction.remove());
        },
        removeAdvancedSearch() {
            dispatch(advancedSearchAction.remove());
        },
        removeClinicalQuery() {
            dispatch(clinicalQueryAction.remove());
        },
        setClinicalQuery(data) {
            dispatch(clinicalQueryAction.create(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(formStyles)(ClinicalQueryDialog));
