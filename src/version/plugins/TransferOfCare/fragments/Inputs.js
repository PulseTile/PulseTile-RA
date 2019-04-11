import React from "react";
import { DisabledInput, TextInput, DateInput, LongTextInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';

const styles = {
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns TransferOfCare creation/editing form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const TransferOfCareInputs = ({ classes, ...rest }) => (
    <React.Fragment>
       <h1>asjdlajskljasdkljas</h1>
    </React.Fragment>
);

export default withStyles(styles)(TransferOfCareInputs);
