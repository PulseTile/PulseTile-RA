import React, { Component } from "react";
import { Route } from "react-router";
import {
  List,
  Filter,
  TextInput,
  Datagrid,
  TextField
} from "react-admin";

import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

import Breadcrumbs from "../../common/Breadcrumbs";
import TableHeader from "../../common/TableHeader";
import ListToolbar from "../../common/Toolbars/ListToolbar";
import AllergiesCreate from "./AllergiesCreate";
import DetailsBlock from "./DetailsBlock";
import { MAIN_COLOR } from "../../config/styles";

const listStyles = {
    list: {
        width: '100%',
        margin: "15px",
    },
    edit: {
        width: '100%',
    },
    mainBlock: {
        display: "flex",
    blockTitle: {
        display: "flex",
        alignItems: "center",
        height: "49px",
        color: "white",
        backgroundColor: MAIN_COLOR,
        fontSize: "18px",
        fontWeight: "700",
        paddingLeft: "15px",
    },
    tableList: {
        '& thead': {
            backgroundColor: "#e5e5e5",
            color: "black !important",
            '& tr': {
                height: "48px !important",
            },
        },
        '& tbody tr:hover': {
            backgroundColor: MAIN_COLOR + " !important",
            color: "white !important"
        }
    }
};

const breadcrumbsResource = [
    { url: "/allergies", title: "Allergies", isActive: false },
];

/**
 * This component returns block with Allergies list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
class Allergies extends Component {

    isCreatePage = () => {
        return (this.props.location.pathname === "/allergies/create");
    };

    render() {
        const { classes, history, location } = this.props;
        const isCreatePage = (this.props.location.pathname === "/allergies/create");
        return (
            <React.Fragment>
                <Breadcrumbs resource={breadcrumbsResource} />
                <TableHeader resource="allergies" />
                <div style={{ display: "flex" }}>
                    <div className={classes.list}>
                        <Typography className={classes.blockTitle} >Allergies</Typography>
                        <List
                            title="Allergies"
                            actions={null}
                            bulkActions={false}
                            pagination={<ListToolbar history={history} isCreatePage={this.isCreatePage()} createPath="/allergies/create" />}
                            {...this.props}
                        >
                            <Datagrid className={classes.tableList} rowClick="edit">
                                <TextField source="cause" />
                                <TextField source="reaction" />
                                <TextField source="source" />
                            </Datagrid>
                        </List>
                    </div>
                    {
                        (!this.isCreatePage())
                            ?
                            <Route
                                path="/allergies/:id"
                                render={({ match }) => <DetailsBlock mode="show" {...this.props} id={match.params.id} />}
                            />
                            :
                            <Route
                                path="/allergies/create"
                                render={({ match }) => <AllergiesCreate {...this.props} id={match.params.id} />}
                            />
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(listStyles)(Allergies);
