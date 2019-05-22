import React, { Component } from "react";
import get from "lodash/get";
import { Control } from "react-redux-form";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import RangeLinePopover from "./RangeLinePopover";

const styles = theme => ({
    formGroup: {
        width: '50%',
        float: "left",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        boxSizing: "border-box",
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
        backgroundColor: '#CA9193',
    },
    formInputUnitsWarning: {
        width: '20%',
        height: 25,
        paddingLeft: 10,
        backgroundColor: '#E4D19D',
    },
    formInputUnitsSuccess: {
        width: '20%',
        height: 25,
        paddingLeft: 10,
        backgroundColor: '#94CFAA',
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

const rangeLineSettings = {
    respirationRate: {
        greenMin: 9,
        greenMax: 21,
        redMin: 8,
        redMax: 25
    }
};

class ValueWithUnits extends Component {

    state = {
        anchorEl: null,
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
        const value = e.target.value;
        const limits = get(rangeLineSettings, model, null);

        let result = 'formInputUnits';
        if (limits) {
            if (value <= limits.redMin || value >= limits.redMax) {
                result = 'formInputUnitsDanger';
            } else if (value >= limits.greenMin && value <= limits.greenMax) {
                result = 'formInputUnitsSuccess';
            } else {
                result = 'formInputUnitsWarning';
            }
        }

        this.setState({
            formInputClassName: result
        })
    };

    render() {
        const { classes, label, units, model } = this.props;
        const { formInputClassName } = this.state;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const modelName = "vitals." + model;
        return (
            <FormGroup className={classes.formGroup}>
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
                    <RangeLinePopover
                        anchorEl={anchorEl}
                        open={open}
                        handleClose={this.handleClose}
                        label={label}
                        model={model}
                    />
                </div>

            </FormGroup>
        );
    }
};

export default withStyles(styles)(ValueWithUnits);