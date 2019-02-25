import React, { Component } from "react";
import { Route } from "react-router";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Clear';

const styles = {
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};

class SectionBlock extends Component {

    render() {
        const { classes, title, currentRow, onRowClick, SectionBlock } = this.props;
        return (
            <Grid className={classes.list} item xs={12} sm={currentRow ? 6 : 12}>
                <div className={classes.blockTitle}>
                    <Typography className={classes.title}>{title}</Typography>
                    <CloseIcon className={classes.closeIcon} onClick={() => onRowClick(null)} />
                </div>
                <SectionBlock classes={classes} />
            </Grid>
        );
    }
};

export default withStyles(styles)(SectionBlock);