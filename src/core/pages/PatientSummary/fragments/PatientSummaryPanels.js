import React from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { getSynopsisProps, synopsisData } from "../config";
import DashboardCardRoll from "../../../common/DashboardCard/DashboardCardRoll";

const styles = {

};

const PatientSummaryPanels = props => {
    const { classes, loading, showMode, showHeadings } = props;
    return (
        <Grid container xs={12} className={classes.content}>
            {
                synopsisData.map((item, key) => {
                    if (item.list === 'problems' || item.list === 'medications' || item.list === 'allergies') {
                        return (
                            <DashboardCardRoll
                                key={key}
                                showMode={showMode}
                                showHeadings={showHeadings}
                                id={item.id}
                                title={item.title}
                                list={item.list}
                                loading={loading}
                                items={get(props, item.list, [])}
                                icon={item.icon}
                                {...props}
                            />
                        );
                    }
                    return null;

                })
            }
        </Grid>
    );
};

const mapStateToProps = state => {
    const patientSummaryProps = {
        loading: state.custom.demographics.loading,
        showMode: state.custom.showMode.data,
        showHeadings: state.custom.showHeadings.data,
    };
    const synopsisProps = getSynopsisProps(state);
    return Object.assign({}, patientSummaryProps, synopsisProps);
};

export default connect(mapStateToProps, null)(withStyles(styles)(PatientSummaryPanels));
