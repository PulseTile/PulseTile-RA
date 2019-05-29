import React, { Component } from "react";
import { connect } from 'react-redux';
import { TextField, DateField, setSidebarVisibility } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";

import image from "../../../version/images/pulsetile-logo.png";
import ListTemplate from "../../common/ResourseTemplates/ListTemplate";
import ViewButton from "../../common/Buttons/ViewButton";
import PatientCreate from "./PatientCreate";
import PatientEdit from "./PatientEdit";
import PatientShow from "./PatientShow";
import DatagridRow from "./fragments/DatagridRow";

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
});

/**
 * This component returns block with Patients list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
class PatientsList extends Component {

    componentDidMount() {
        this.props.setSidebarVisibility(false);
    }

    render() {
        const { userSearch, classes } = this.props;
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
                    {...this.props}
                >
                    <TextField source="name" label="Name"/>
                    <TextField source="address" label="Address"/>
                    <DateField source="birthDate" label="Born"/>
                    <TextField source="nhsNumber" label="NHS No."/>
                    <ViewButton />
                </ListTemplate>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        userSearch: state.custom.userSearch.data,
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