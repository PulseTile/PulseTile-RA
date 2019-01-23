import React, { Component } from "react";
import { Route } from "react-router";
import {
  List,
  Datagrid,
  TextField
} from "react-admin";

import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import Breadcrumbs from "../../common/Breadcrumbs";
import TableHeader from "../../common/TableHeader";
import AllergiesCreate from "./AllergiesCreate";
import AllergiesShow from "./AllergiesShow";

const listStyles = {
    list: {
        width: '100%',
    },
    edit: {
        width: '100%',
    },
    show: {
        width: '100%',
    },
    create: {
        width: '100%',
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
                    <List title="Allergies" className={classes.list} {...this.props}>
                        <Datagrid rowClick="edit">
                            <TextField source="cause" />
                            <TextField source="reaction" />
                            <TextField source="source" />
                        </Datagrid>
                    </List>
                    {
                        (!this.isCreatePage())
                            ?
                            <Route
                                path="/allergies/:id"
                                render={({ match }) => <AllergiesShow mode="show" {...this.props} id={match.params.id} />}
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
