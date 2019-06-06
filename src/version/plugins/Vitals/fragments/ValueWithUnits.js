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
    parameterBlock: {
        display: 'flex',
        textAlign: 'center',
        width: '20%',
        height: 25,
        paddingTop: 5,
        paddingLeft: 10,
        border: `1px solid ${theme.palette.borderColor}`,
    },
    parameterBlockDanger: {
        display: 'flex',
        textAlign: 'center',
        width: '20%',
        height: 25,
        paddingTop: 5,
        paddingLeft: 10,
        backgroundColor: DANGER_COLOR,
        border: `1px solid ${theme.palette.borderColor}`,
    },
    parameterBlockWarning: {
        display: 'flex',
        textAlign: 'center',
        width: '20%',
        height: 25,
        paddingTop: 5,
        paddingLeft: 10,
        backgroundColor: WARNING_COLOR,
        border: `1px solid ${theme.palette.borderColor}`,
    },
    parameterBlockSuccess: {
        display: 'flex',
        textAlign: 'center',
        width: '20%',
        height: 25,
        paddingTop: 5,
        paddingLeft: 10,
        backgroundColor: SUCCESS_COLOR,
        border: `1px solid ${theme.palette.borderColor}`,
    },
});

class ValueWithUnits extends Component {

    state = {
        anchorEl: null,
        formGroupClassName: 'formGroupInside',
        formInputClassName: 'formInputUnits',
        parameterClassName: 'parameterBlock'
    };

    componentDidMount() {
        const { model, value } = this.props;
        this.defineColors(model, value);
    }

    defineColors = (model, value) => {
        const limits = get(rangeLineLimits, model, null);
        let formInput = 'formInputUnits';
        let formGroup = 'formGroupInside';
        let parameterBlock = 'parameterBlock';
        let nonScoreValue = 0;
        if (value && limits) {
            if (value <= limits.redMin || value >= limits.redMax) {
                formInput = 'formInputUnitsDanger';
                formGroup = 'formGroupInsideDanger';
                parameterBlock = 'parameterBlockDanger';
                nonScoreValue = 3;
            } else if (value >= limits.greenMin && value <= limits.greenMax) {
                formInput = 'formInputUnitsSuccess';
                formGroup = 'formGroupInsideSuccess';
                parameterBlock = 'parameterBlockSuccess';
                nonScoreValue = 1;
            } else {
                formInput = 'formInputUnitsWarning';
                formGroup = 'formGroupInsideWarning';
                parameterBlock = 'parameterBlockWarning';
                nonScoreValue = 2;
            }
        }
        this.setState({
            formInputClassName: formInput,
            formGroupClassName: formGroup,
            parameterClassName: parameterBlock,
        }, () => this.props.updateInput(model, nonScoreValue))
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

    changeColor = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const nameStr = name.replace('vitals.', '');
        this.defineColors(nameStr, value);
    };

    componentWillReceiveProps(nextProps, props) {
        const newItemId = get(nextProps, 'sourceId', null);
        const prevItemId = get(this.props, 'sourceId', null);
        if (newItemId !== prevItemId) {
            const { model, value } = nextProps;
            this.defineColors(model, value);
        }
    }

    render() {
        const { classes, label, units, model, hasPopup, value, isDetailsPage } = this.props;
        const { formGroupClassName, formInputClassName, parameterClassName } = this.state;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const modelName = "vitals." + model;
        return (
            <FormGroup className={classes.formGroup}>
                <div className={classes[formGroupClassName]}>
                    <FormLabel className={classes.formLabel}>{label}</FormLabel>
                    <div className={classes.valueAndUnits}>
                        {
                            isDetailsPage
                                ?
                                <div className={classes[parameterClassName]}>
                                    <Typography>{value}</Typography>
                                </div>
                                :
                                <Control.text
                                    className={classes[formInputClassName]}
                                    type="number"
                                    model={modelName}
                                    onBlur={e => this.changeColor(e)}
                                    defaultValue={value}
                                    disabled={isDetailsPage}
                                />
                        }
                        { units &&
                            <div className={classes.units} onMouseOver={e => this.handleClick(e)} onMouseOut={() => this.handleClose()}>
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