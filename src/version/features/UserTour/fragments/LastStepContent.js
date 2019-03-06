import React from "react";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    link: {
        color: theme.palette.mainColor,
        textDecoration: "none",
    },
});

const LastStepContent = ({ classes, title, link }) => {
    return (
        <p className="tour-body-content">
            For more information and a guide on how to use {title}, please go to <a className={classes.link} href={link} title={title} target="_blank">
            {link}</a>
        </p>
    );
};

export default withStyles(styles)(LastStepContent);
