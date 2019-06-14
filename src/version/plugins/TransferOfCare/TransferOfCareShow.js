import React from "react";
import { TextField, DateField } from "react-admin";
import { withStyles } from '@material-ui/core/styles';

import ShowTemplate from "../../../core/common/ResourseTemplates/ShowTemplate";

const styles = {
    labelBlock: {
        '& > div': {
            marginTop: "0px !important",
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns block with Transfers of Care details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const TransferOfCareShow = ({ classes, ...rest }) => {

    return (
        <ShowTemplate pageTitle="Transfers of Care" {...rest}>
            <TextField className={classes.labelBlock} label="From (Site / Org)" source="from" />
            <TextField className={classes.labelBlock} label="To (Site / Org)" source="to" />
            <DateField className={classes.labelBlock} label="Date / Time" source="transferDateTime" />
            <TextField className={classes.labelBlock} label="Source" source="source" />
        </ShowTemplate>
    );
};

export default withStyles(styles)(TransferOfCareShow);