import React, { Component } from "react";
import { connect } from 'react-redux';
import { TextField, DateField, ShowButton } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";

import image from "../../../version/images/logo-landing.png";
import ListTemplate from "../../common/ResourseTemplates/ListTemplate";
import ViewButton from "../../common/Buttons/ViewButton";
import PatientCreate from "./PatientCreate";
import PatientEdit from "./PatientEdit";
import PatientShow from "./PatientShow";

const styles = {
    imageBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "5%",
    },
    image: {
        width: "50%",
    },
};

/**
 * This component returns block with Patients list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
class PatientsList extends Component {

    /**
     * This function redirects to Patient Summary page
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @param {shape}  e
     * @param {number} userId
     */
    redirectToSummary = (e, userId) => {
        e.stopPropagation();
        localStorage.setItem('userId', userId);
        this.props.history.push('/summary');
    };

    render() {
        const { userSearch, classes } = this.props;
        if (!userSearch) {
            return (
                <div className={classes.imageBlock} >
                    <CardMedia
                        className={classes.image}
                        component="img"
                        alt="NHS Scotland"
                        image={image}
                        title="ReSPECT"
                    />
                </div>
            )
        }
        return (
            <ListTemplate
                basePath="/patients"
                create={PatientCreate}
                edit={PatientEdit}
                show={PatientShow}
                resourceUrl="patients"
                title="Patients List"
                headerFilterAbsent={true}
                {...this.props}
            >
                <TextField source="name" label="Name" />
                <TextField source="address" label="Address" />
                <DateField source="dateOfBirth" label="Born (age)" />
                <TextField source="nhsNumber" label="CHI No." />
                <ViewButton viewAction={this.redirectToSummary} />
            </ListTemplate>
        )
    }
}

const mapStateToProps = state => {
    return {
        userSearch: state.custom.userSearch.data,
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(PatientsList));
