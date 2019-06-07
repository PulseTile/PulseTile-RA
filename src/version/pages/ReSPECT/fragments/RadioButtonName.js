import React from "react";
import { withStyles } from '@material-ui/core/styles';

const styles = {
    radioMainTitle: {
        marginBottom: 0,
        fontSize: 18,
        fontWeight: 800,
    },
    radioHelpTitle: {
        marginTop: 0,
    },
};

const RadioButtonName = ({ classes, mainTitle, helpTitle }) => (
    <React.Fragment>
        <p className={classes.radioMainTitle}>{mainTitle}</p>
        <p className={classes.radioHelpTitle}>{helpTitle}</p>
    </React.Fragment>
);

export default withStyles(styles)(RadioButtonName);
