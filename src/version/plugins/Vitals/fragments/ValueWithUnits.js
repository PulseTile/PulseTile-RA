import React, { Component } from "react";
import get from "lodash/get";
import { Control } from "react-redux-form";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

import rangeLine from "../../../images/range-line.jpeg";
import helmLogo from "../../../images/pulsetile-logo.png";
import CardMedia from "@material-ui/core/CardMedia";

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
    units: {
        width: '30%',
        height: 25,
        paddingTop: 5,
        paddingLeft: 10,
        borderTop: `1px solid ${theme.palette.borderColor}`,
        borderRight: `1px solid ${theme.palette.borderColor}`,
        borderBottom: `1px solid ${theme.palette.borderColor}`,
    },
    rangeLineImage: {

    },
});

class ValueWithUnits extends Component {

    state = {
        anchorEl: null,
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

    render() {
        const { classes, label, units, model, hasLimits } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const modelName = "vitals." + model;
        return (
            <FormGroup className={classes.formGroup}>
                <FormLabel className={classes.formLabel}>{label}</FormLabel>
                <div className={classes.valueAndUnits}>
                    <Control.text
                        className={classes.formInputUnits}
                        type="number"
                        model={modelName}
                        required
                    />
                    { units &&
                        <div className={classes.units} onClick={e => this.handleClick(e)}>
                            <Typography>{units}</Typography>
                        </div>
                    }
                </div>
                { hasLimits &&
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Typography>The content of the Popover.</Typography>

                        <CardMedia
                            id="rangeLine-image"
                            className={classes.rangeLineImage}
                            component="img"
                            alt="Range line"
                            image={rangeLine}
                            title="Range line"
                        />

                    </Popover>
                }
            </FormGroup>
        );
    }
};

export default withStyles(styles)(ValueWithUnits);