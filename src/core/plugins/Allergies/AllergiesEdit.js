import React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    DisabledInput,
    DateInput,
    LongTextInput
} from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import EditToolbarWithoutDelete from "../../common/EditToolbarWithoutDelete";
import { MAIN_COLOR } from "../../config/styles";

const styles = {
    editBlock: {
        width: '100%',
        backgroundColor: "white",
        margin: "15px 15px 15px 0px",
    },
    blockTitle: {
        display: "flex",
        alignItems: "center",
        height: "49px",
        color: "white",
        backgroundColor: MAIN_COLOR,
        fontSize: "18px",
        fontWeight: "700",
        paddingLeft: "15px",
    },
    editForm: {
        '& > div': {
            paddingTop: "0px !important",
            paddingLeft: "10px !important",
            paddingRight: "10px !important",
        },
    },
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns block with edit form for Allergies
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {func}  changeViewType
 * @param {shape} rest
 * @constructor
 */
const AllergiesEdit = ({ classes, changeViewType, ...rest }) => (
    <div className={classes.editBlock}>
        <Typography className={classes.blockTitle} >Allergy</Typography>
        <Edit title="Edit Allergy" {...rest}>
            <SimpleForm className={classes.editForm} toolbar={<EditToolbarWithoutDelete changeViewType={changeViewType} />}>
                <TextInput className={classes.labelBlock} source="cause" label="Cause" />
                <LongTextInput className={classes.labelBlock} source="reaction" label="Reaction / Description" />
                <DisabledInput className={classes.labelBlock} source="author" label="Author" />
                <DisabledInput className={classes.labelBlock} source="dateCreated" label="Date" />
            </SimpleForm>
        </Edit>
    </div>
);

export default withStyles(styles)(AllergiesEdit);
