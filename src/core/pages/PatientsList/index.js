import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';
import { TextField, DateField, setSidebarVisibility } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TodayIcon from "@material-ui/icons/Today";
import CheckIcon from "@material-ui/icons/Check";

import image from "../../../version/images/pulsetile-logo.png";
import ListTemplate from "../../common/ResourseTemplates/ListTemplate";
import ViewButton from "../../common/Buttons/ViewButton";
import PatientCreate from "./PatientCreate";
import PatientEdit from "./PatientEdit";
import PatientShow from "./PatientShow";

import DatagridRow from "./fragments/DatagridRow";
import ColumnsTogglingPopover from "./fragments/ColumnsTogglingPopover";

import { themeCommonElements } from "../../../version/config/theme.config";

const styles = theme => ({
    content: {
        width: "100%",
        height: "100%",
        backgroundImage: theme.patientSummaryPanel.container.background,
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    imageBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "10%",
    },
    image: {
        width: "30%",
        height: "30%",
    },
    labelWithIcon: {
        marginBottom: 10,
    },
    icon: {
        marginTop: 5,
        marginLeft: 5,
    },
});

const LabelWithIcon = ({ classes, title, icon }) => {
    return (
        <Typography className={classes.labelWithIcon}  variant="h1">{ title }{ icon }</Typography>
    )
};

const defaultHiddenColumns = [
    'ordersDate', 'resultsDate', 'vitalsDate', 'problemsDate',
    'ordersCount', 'resultsCount', 'vitalsCount', 'problemsCount'
];

/**
 * This component returns block with Patients list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
class PatientsList extends Component {

    state = {
        key: 0,
    };

    componentDidMount() {
        this.props.setSidebarVisibility(false);
    }

    updateTableHead = () => {
        this.setState({
            key: this.state.key + 1,
        })
    };

    render() {
        const { userSearch, classes, hiddenColumns } = this.props;

        if (!userSearch) {
            return (
                <div className={classes.content}>
                    <div className={classes.imageBlock} >
                        <CardMedia
                            className={classes.image}
                            component="img"
                            alt="NHS Scotland"
                            image={image}
                        />
                    </div>
                </div>
            )
        }

        return (
            <React.Fragment>
                <ListTemplate
                    basePath="/patients"
                    create={PatientCreate}
                    edit={PatientEdit}
                    show={PatientShow}
                    resourceUrl="patients"
                    title="Patients List"
                    headerFilterAbsent={true}
                    CustomRow={DatagridRow}
                    isCustomDatagrid={true}
                    ColumnsTogglingPopover={ColumnsTogglingPopover}
                    hasColumnsToggling={get(themeCommonElements, 'patientListColumnToggling', false)}
                    updateTableHead={this.updateTableHead}
                    defaultHiddenColumns={defaultHiddenColumns}
                    {...this.props}
                >
                    <TextField source="name" label="Name"/>
                    { (hiddenColumns.indexOf('address') === -1) && <TextField source="address" label="Address" /> }
                    <TextField source="gender" label="Gender"/>
                    <DateField source="birthDate" label="Born"/>
                    { (hiddenColumns.indexOf('nhsNumber') === -1) && <TextField source="nhsNumber" label="NHS No." /> }

                    {(hiddenColumns.indexOf('ordersDate') === -1) &&
                        <DateField source="ordersDate" label={<LabelWithIcon classes={classes} title="Orders" icon={<TodayIcon className={classes.icon}/>}/>} />
                    }

                    {(hiddenColumns.indexOf('ordersCount') === -1) &&
                        <DateField source="ordersCount" label={<LabelWithIcon classes={classes} title="Orders" icon={<CheckIcon className={classes.icon}/>}/>} />
                    }

                    {(hiddenColumns.indexOf('resultsDate') === -1) &&
                        <DateField source="resultsDate" label={<LabelWithIcon classes={classes} title="Results" icon={<TodayIcon className={classes.icon} />} />} />
                    }

                    {(hiddenColumns.indexOf('resultsCount') === -1) &&
                        <DateField source="resultsCount" label={<LabelWithIcon classes={classes} title="Results" icon={<CheckIcon className={classes.icon} />} />} />
                    }

                    {(hiddenColumns.indexOf('vitalsDate') === -1) &&
                        <DateField source="vitalsDate" label={<LabelWithIcon classes={classes} title="Vitals" icon={<TodayIcon className={classes.icon} />} />} />
                    }

                    {(hiddenColumns.indexOf('vitalsCount') === -1) &&
                        <DateField source="vitalsCount" label={<LabelWithIcon classes={classes} title="Vitals" icon={<CheckIcon className={classes.icon}/>}/>} />
                    }

                    {(hiddenColumns.indexOf('problemsDate') === -1) &&
                        <DateField source="problemsDate" label={<LabelWithIcon classes={classes} title="Problems" icon={<TodayIcon className={classes.icon} />} />}/>
                    }

                    {(hiddenColumns.indexOf('problemsCount') === -1) &&
                        <DateField source="problemsCount" label={<LabelWithIcon classes={classes} title="Problems" icon={<CheckIcon className={classes.icon} />} />} />
                    }

                    <ViewButton />

                </ListTemplate>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        userSearch: state.custom.userSearch.data,
        hiddenColumns:  get(state, 'custom.toggleColumns.data.patients', []),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setSidebarVisibility(params) {
            dispatch(setSidebarVisibility(params));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientsList));