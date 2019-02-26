import React, { Component } from "react";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { personalDetailsAction } from "../../actions/ReSPECT/personalDetailsAction";
import { summaryInformationAction } from "../../actions/ReSPECT/summaryInformationAction";
import { personalPreferencesAction } from "../../actions/ReSPECT/personalPreferencesAction";
import { clinicalRecommendationsAction } from "../../actions/ReSPECT/clinicalRecommendationsAction";

import Breadcrumbs from "../../../core/common/Breadcrumbs";
import TableHeader from "../../../core/common/TableHeader";
import TableHeadBlock from "./fragments/TableHeadBlock";
import TableBodyBlock from "./fragments/TableBodyBlock";
import CurrentSectionBlock from "./fragments/CurrentSectionBlock";
import sections from "./sections";

const styles = theme => ({
    root: {
        width: '100%',
    },
    mainBlock: {
        padding: 10,
    },
    blockTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 49,
        color: "#fff",
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 700,
        paddingLeft: 15,
    },
    title: {
        color: "#fff",
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 700,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableList: {
        '& thead': {
            backgroundColor: "#e5e5e5",
            '& tr th span span': {
                color: "#000",
            },
            '& tr th': {
                paddingLeft: 10,
            },
            '& tr': {
                height: 48,
            },
        },
        '& tbody tr td': {
            paddingLeft: 10,
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.mainColor,
        },
        '& tbody tr:hover td span': {
            color: "#fff"
        }
    },
});

class Respect extends Component {

    state = {
        currentRow: null,
    };

    componentDidMount() {
        const userId = localStorage.getItem('userId');
        this.props.getSectionsInfo(userId);
    }

    onRowClick = id => {
        this.setState({
            currentRow: id,
        })
    };

    getCurrentSection = id => {
        let result = null;
        sections.forEach(item => {
            if (item.id === id) {
                result = item;
            }
        });
        return result;
    };

    render() {
        const { classes, sectionsInfo } = this.props;
        const { currentRow } = this.state;
        const breadcrumbsResource = [
            { url: "/respect", title: "ReSPECT", isActive: false }
        ];
        const currentSection = this.getCurrentSection(currentRow);
        return (
            <React.Fragment>
                <TableHeader resource="respect" />
                <Breadcrumbs resource={breadcrumbsResource} />
                <Grid container spacing={16} className={classes.mainBlock}>
                    <Grid className={classes.list} item xs={12} sm={currentRow ? 6 : 12}>
                        <div className={classes.blockTitle}>
                            <Typography className={classes.title}>ReSPECT Sections</Typography>
                        </div>
                        <Paper className={classes.root}>
                            <div className={classes.tableWrapper}>
                                <Table className={classes.tableList} aria-labelledby="tableTitle">
                                    <TableHeadBlock />
                                    <TableBodyBlock sections={sections} currentRow={currentRow} onRowClick={this.onRowClick} sectionsInfo={sectionsInfo} />
                                </Table>
                            </div>
                        </Paper>
                    </Grid>
                    {
                        currentRow &&
                            <CurrentSectionBlock
                                currentSection={currentSection}
                                currentRow={currentRow}
                                onRowClick={this.onRowClick}
                            />
                    }
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        sectionsInfo: {
            personalDetails: state.custom.personalDetails.data,
            summaryInformation: state.custom.summaryInformation.data,
            personalPreferences: state.custom.personalPreferences.data,
            clinicalRecommendations: state.custom.clinicalRecommendations.data,
        }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getSectionsInfo(userId) {
            dispatch(personalDetailsAction.request(userId));
            dispatch(summaryInformationAction.request(userId));
            dispatch(personalPreferencesAction.request(userId));
            dispatch(clinicalRecommendationsAction.request(userId));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Respect));
