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
        backgroundColor: theme.palette.secondaryMainColor,
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

function getRecordInfo(details, sourceId) {
    let result = null;
    for (let i = 0, n = details.length; i < n; i++) {
        let item = details[i];
        if (item.sourceId === sourceId) {
            result = item;
            break;
        }
    }
    return result;
}

const ProblemsDetails = ({ classes, details, sourceId }) => {
    const recordInfo = getRecordInfo(details, sourceId);
    const dateOfOnset = get(recordInfo, 'dateOfOnset', null);
    const dateOfOnsetConvert = dateOfOnset ? moment(dateOfOnset).format('DD-MM-YYYY') : moment().format('DD-MM-YYYY');
    return (
        <div className={classes.detailsPopover}>
            <div className={classes.blockTitle}>
                <Typography className={classes.title}>Problems / Issue</Typography>
            </div>
            { recordInfo ?
                <React.Fragment>
                    <div>
                        <div className={classes.blockDouble}>
                            <div className={classes.infoItem}>
                                <Typography variant="h1">Problem / Issue</Typography>
                                <Typography variant="body1">{get(recordInfo, 'problem', null)}</Typography>
                            </div>
                            <div className={classes.infoItem}>
                                <Typography variant="h1">Date of Onset</Typography>
                                <Typography variant="body1">{dateOfOnsetConvert}</Typography>
                            </div>
                        </div>
                    </div>
                    <div className={classes.infoItem}>
                        <Typography variant="h1">Description</Typography>
                        <Typography variant="body1">{get(recordInfo, 'description', null)}</Typography>
                    </div>
                    <div>
                        <div className={classes.blockDouble}>
                            <div className={classes.infoItem}>
                                <Typography variant="h1">Terminology</Typography>
                                <Typography variant="body1">{get(recordInfo, 'terminology', null)}</Typography>
                            </div>
                            <div className={classes.infoItem}>
                                <Typography variant="h1">Code</Typography>
                                <Typography variant="body1">{get(recordInfo, 'code', null)}</Typography>
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

const MedicationsDetails = ({ classes, details, sourceId }) => {
    const recordInfo = getRecordInfo(details, sourceId);
    const startDate = get(recordInfo, 'startDate', null);
    const startDateConvert = startDate ? moment(startDate).format('DD-MM-YYYY') : moment().format('DD-MM-YYYY');
    return (
        <div className={classes.detailsPopover}>
            <div className={classes.blockTitle}>
                <Typography className={classes.title}>Medications</Typography>
            </div>
            { recordInfo ?
                <React.Fragment>
                    <div>
                        <div className={classes.blockDouble}>
                            <div className={classes.infoItem}>
                                <Typography variant="h1">Name</Typography>
                                <Typography variant="body1">{get(recordInfo, 'name', null)}</Typography>
                            </div>
                            <div className={classes.infoItem}>
                                <Typography variant="h1">Date start</Typography>
                                <Typography variant="body1">{startDateConvert}</Typography>
                            </div>
                        </div>
                    </div>
                    <div className={classes.infoItem}>
                        <Typography variant="h1">Dose amount</Typography>
                        <Typography variant="body1">{get(recordInfo, 'doseAmount', null)}</Typography>
                    </div>
                    <div className={classes.infoItem}>
                        <Typography variant="h1">Dose directions</Typography>
                        <Typography variant="body1">{get(recordInfo, 'doseDirections', null)}</Typography>
                    </div>
                    <div>
                        <div className={classes.blockDouble}>
                            <div className={classes.infoItem}>
                                <Typography variant="h1">Terminology</Typography>
                                <Typography variant="body1">{get(recordInfo, 'medicationTerminology', null)}</Typography>
                            </div>
                            <div className={classes.infoItem}>
                                <Typography variant="h1">Code</Typography>
                                <Typography variant="body1">{get(recordInfo, 'medicationCode', null)}</Typography>
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

const ReferralsDetails = ({ classes, details, sourceId }) => {
    const recordInfo = getRecordInfo(details, sourceId);
    const dateOfReferral = get(recordInfo, 'dateOfReferral', null);
    const dateOfReferralConvert = dateOfReferral ? moment(dateOfReferral).format('DD-MM-YYYY') : moment().format('DD-MM-YYYY');
    return (
        <div className={classes.detailsPopover}>
            <div className={classes.blockTitle}>
                <Typography className={classes.title}>Referrals</Typography>
            </div>
            { recordInfo ?
                <React.Fragment>
                    <div>
                        <div className={classes.blockDouble}>
                            <div className={classes.infoItem}>
                                <Typography variant="h1">From</Typography>
                                <Typography variant="body1">{get(recordInfo, 'referralFrom', null)}</Typography>
                            </div>
                            <div className={classes.infoItem}>
                                <Typography variant="h1">To</Typography>
                                <Typography variant="body1">{get(recordInfo, 'referralTo', null)}</Typography>
                            </div>
                        </div>
                    </div>
                    <div className={classes.infoItem}>
                        <Typography variant="h1">Date of Referral</Typography>
                        <Typography variant="body1">{dateOfReferralConvert}</Typography>
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

const PopoverWithDetails = ({ classes, anchorEl, handlePopoverClose, popoverItem, loadingDetails, details }) => {
    const open = Boolean(anchorEl);

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

            { popoverItem.type === 'problems' && <ProblemsDetails details={details} classes={classes} sourceId={popoverItem.sourceId} /> }
            { popoverItem.type === 'medications' && <MedicationsDetails details={details} classes={classes} sourceId={popoverItem.sourceId} /> }
            { popoverItem.type === 'referrals' && <ReferralsDetails details={details} classes={classes} sourceId={popoverItem.sourceId} /> }

        </Popover>
    );
};

export default withStyles(styles)(PopoverWithDetails);
