import React, { Component } from "react";
import { Route } from "react-router";
import {
  List,
  Datagrid,
  TextField
} from "react-admin";

import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Breadcrumbs from "../../common/Breadcrumbs";
import TableHeader from "../../common/TableHeader";
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
    create: {
        width: '100%',
    },
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
            color: "black !important"
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

    redirectToCreate = pathname => {
        this.props.history.push(pathname)
    };

    render() {
        const { classes, location } = this.props;
        return (
            <div>
                <Breadcrumbs resource={breadcrumbsResource} />
                <TableHeader resource="allergies" />
                <div style={{ display: "flex" }}>
                    <div className={classes.list}>
                        <Typography className={classes.blockTitle} >Allergies</Typography>
                        <List title="Allergies" actions={null} bulkActions={false} {...this.props}>
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
                {
                    (!this.isCreatePage()) &&
                        <Button color="danger" onClick={() => this.redirectToCreate("/allergies/create")}>CREATE</Button>
                }
            </div>
        );
    }
}

export default withStyles(listStyles)(Allergies);
