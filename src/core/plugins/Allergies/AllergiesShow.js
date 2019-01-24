import React, { Component } from "react";
import {
    Show,
    SimpleShowLayout,
    TextField,
    DateField
} from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { MAIN_COLOR } from "../../config/styles";

const styles = {
    showBlock: {
        width: '100%',
        backgroundColor: "white",
        margin: "15px 15px 15px 0px",
    },
    details: {
        '& > div': {
            boxShadow: "none",
        }
    }
};

const AllergiesShow = ({ classes, changeViewType, ...rest }) => {

    return (
        <div className={classes.showBlock}>
            <Typography className={classes.blockTitle} >Allergy</Typography>
            <Show className={classes.details} title="Allergies Details" {...rest}>
                <SimpleShowLayout>
                    <TextField source="cause" />
                    <TextField source="reaction" />
                    <TextField source="author" />
                    <DateField source="dateCreated" />
                    <TextField source="source" />
                </SimpleShowLayout>
            </Show>
            <Button color="primary" onClick={() => changeViewType('edit')}>Edit</Button>
        </div>
    );
}

export default withStyles(styles)(AllergiesShow);
