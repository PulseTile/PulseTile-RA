import React, { Component } from "react";
import get from "lodash/get";
import { Control } from "react-redux-form";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import RangeLinePopover from "./RangeLinePopover";
import { rangeLineLimits, DANGER_COLOR, WARNING_COLOR, SUCCESS_COLOR } from "./settings";

const styles = theme => ({
    formGroup: {
        width: '50%',
        float: "left",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        boxSizing: "border-box",
    },
    formGroupInside: {
        width: '100%',
        paddingLeft: 10,
        borderLeft: `2px solid ${theme.palette.borderColor}`
    },
    formGroupInsideDanger: {
        width: '100%',
        paddingLeft: 10,
        borderLeft: `5px solid ${DANGER_COLOR}`
    },
    formGroupInsideWarning: {
        width: '100%',
        paddingLeft: 10,
        borderLeft: `5px solid ${WARNING_COLOR}`
    },
    formGroupInsideSuccess: {
        width: '100%',
        paddingLeft: 10,
        borderLeft: `5px solid ${SUCCESS_COLOR}`
    },
    formLabel: {
        display: "block",
        fontWeight: 800,
        color: theme.palette.fontColor,
        fontSize: 14,
        marginBottom: 15,
    },
    valueAndUnits: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "start"
    },
    formInputUnits: {
        width: '20%',
        height: 25,
        paddingLeft: 10,
    },
    formInputUnitsDanger: {
        width: '20%',
        height: 25,
        paddingLeft: 10,
        backgroundColor: DANGER_COLOR,
    },
    formInputUnitsWarning: {
        width: '20%',
        height: 25,
        paddingLeft: 10,
        backgroundColor: WARNING_COLOR,
    },
    formInputUnitsSuccess: {
        width: '20%',
        height: 25,
        paddingLeft: 10,
        backgroundColor: SUCCESS_COLOR,
    },
    units: {
        width: '30%',
        height: 25,
        paddingTop: 5,
        paddingLeft: 10,
        borderTop: `1px solid ${theme.palette.borderColor}`,
        borderRight: `1px solid ${theme.palette.borderColor}`,
        borderBottom: `1px solid ${theme.palette.borderColor}`,
    },
});

class ValueWithUnits extends Component {

    state = {
        anchorEl: null,
        formGroupClassName: 'formGroupInside',
        formInputClassName: 'formInputUnits',
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: false,
        });
    };

    changeColor = (e, model) => {
        const name = e.target.name;
        const value = e.target.value;

        const limits = get(rangeLineLimits, model, null);

        let formInput = 'formInputUnits';
        let formGroup = 'formGroupInside';
        let nonScoreValue = 0;

        if (value && limits) {
            if (value <= limits.redMin || value >= limits.redMax) {
                formInput = 'formInputUnitsDanger';
                formGroup = 'formGroupInsideDanger';
                nonScoreValue = 3;
            } else if (value >= limits.greenMin && value <= limits.greenMax) {
                formInput = 'formInputUnitsSuccess';
                formGroup = 'formGroupInsideSuccess';
                nonScoreValue = 1;
            } else {
                formInput = 'formInputUnitsWarning';
                formGroup = 'formGroupInsideWarning';
                nonScoreValue = 2;
            }
        }

        let nameStr = name.replace('vitals.', '');

        this.setState({
            formInputClassName: formInput,
            formGroupClassName: formGroup,
        }, () => this.props.updateInput(nameStr, nonScoreValue))
    };

    render() {
        const { classes, label, units, model, hasPopup } = this.props;
        const { formGroupClassName, formInputClassName } = this.state;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const modelName = "vitals." + model;
        return (
            <FormGroup className={classes.formGroup}>
                <div className={classes[formGroupClassName]}>
                    <FormLabel className={classes.formLabel}>{label}</FormLabel>
                    <div className={classes.valueAndUnits}>
                        <Control.text
                            className={classes[formInputClassName]}
                            type="number"
                            model={modelName}
                            onBlur={e => this.changeColor(e, model)}
                            required
                        />
                        { units &&
                            <div className={classes.units} onClick={e => this.handleClick(e)}>
                                <Typography>{units}</Typography>
                            </div>
                        }
                        { hasPopup &&
                            <RangeLinePopover
                                anchorEl={anchorEl}
                                open={open}
                                handleClose={this.handleClose}
                                label={label}
                                model={model}
                            />
                        }
                    </div>
                </div>
            </FormGroup>
        );
    }
};

export default withStyles(styles)(ValueWithUnits);