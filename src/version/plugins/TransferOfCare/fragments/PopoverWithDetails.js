import React from "react";
import moment from "moment";
import get from "lodash/get";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        display: "block",
        width: "600px !important",
        padding: 0,
        margin: 0,
        borderRadius: 0,
    },
    blockTitle: {
        display: "flex",
        alignItems: "center",
        height: 49,
        color: theme.palette.paperColor,
        backgroundColor: theme.palette.mainColor,
        paddingLeft: 15,
    },
    title: {
        color: theme.palette.paperColor,
        fontSize: 18,
        fontWeight: 700,
    },
    blockDouble: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "start"
    },
    infoItem: {
        width: 290,
        margin: 10,
    }
});

const ProblemsDetails = ({ classes, details }) => {
    const dateOfOnset = get(details, 'dateOfOnset', null);
    const dateOfOnsetConvert = dateOfOnset ? moment(dateOfOnset).format('DD-MM-YYYY') : moment().format('DD-MM-YYYY');
    return (
        <div className={classes.detailsPopover}>
            <div className={classes.blockTitle}>
                <Typography className={classes.title}>Problems / Issue</Typography>
            </div>
            { details ?
                <React.Fragment>
                    <div>
                        <div className={classes.blockDouble}>
                            <div className={classes.infoItem}>
                                <Typography variant="h1">Problem / Issue</Typography>
                                <Typography variant="body1">{get(details, 'problem', null)}</Typography>
                            </div>
                            <div className={classes.infoItem}>
                                <Typography variant="h1">Date of Onset</Typography>
                                <Typography variant="body1">{dateOfOnsetConvert}</Typography>
                            </div>
                        </div>
                    </div>
                    <div className={classes.infoItem}>
                        <Typography variant="h1">Description</Typography>
                        <Typography variant="body1">{get(details, 'description', null)}</Typography>
                    </div>
                    <div>
                        <div className={classes.blockDouble}>
                            <div className={classes.infoItem}>
                                <Typography variant="h1">Terminology</Typography>
                                <Typography variant="body1">{get(details, 'terminology', null)}</Typography>
                            </div>
                            <div className={classes.infoItem}>
                                <Typography variant="h1">Code</Typography>
                                <Typography variant="body1">{get(details, 'code', null)}</Typography>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                :
                <div className={classes.infoItem}>
                    <Typography variant="body1">No data</Typography>
                </div>
            }
        </div>
    );
};

const MedicationsDetails = ({ classes, details }) => {
    return (
        <div>
            <div className={classes.blockTitle}>
                <Typography className={classes.title}>Medications</Typography>
            </div>
        </div>
    );
};

const ReferralsDetails = ({ classes, details }) => {
    return (
        <div>
            <div className={classes.blockTitle}>
                <Typography className={classes.title}>Referrals</Typography>
            </div>
        </div>
    );
};

const PopoverWithDetails = ({ classes, anchorEl, handlePopoverClose, popoverItem, loadingDetails, details }) => {
    const open = Boolean(anchorEl);

    console.log(popoverItem);

    if (!popoverItem) {
        return null;
    }

    return (
        <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{ paper: classes.paper }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
            { loadingDetails &&
                <div>
                    <Typography>Loading...</Typography>
                </div>
            }

            { popoverItem.type === 'problems' && <ProblemsDetails details={details} classes={classes} /> }
            { popoverItem.type === 'medications' && <MedicationsDetails details={details} classes={classes} /> }
            { popoverItem.type === 'referrals' && <ReferralsDetails details={details} classes={classes} /> }

        </Popover>
    );
};

export default withStyles(styles)(PopoverWithDetails);
