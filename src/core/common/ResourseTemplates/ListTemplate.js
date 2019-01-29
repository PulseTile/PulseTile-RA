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
import DetailsTemplate from "./DetailsTemplate";
import { MAIN_COLOR, ITEMS_PER_PAGE } from "../../config/styles";

const listStyles = {
    mainBlock: {
        display: "flex",
    },
    list: {
        width: '100%',
        margin: "15px",
    },
    edit: {
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

/**
 * This component returns template for List page
 * (it used in List blocks for the plugins Allergies, Contacts, Medications, Problems etc.)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class ListTemplate extends Component {

    /**
     * This function returns create page URL
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @return {string}
     */
    getCreateUrl = () => {
        return "/" + this.props.resourceUrl + "/create";
    };

    /**
     * This function returns details page URL
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @return {string}
     */
    getDetailsUrl = () => {
        return "/" + this.props.resourceUrl + "/:id";
    };

    /**
     * This function checks is current create page
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @return {string}
     */
    isCreatePage = () => {
        return (this.props.location.pathname === this.getCreateUrl());
    };

    render() {
        const { details, create, resourceUrl, title, children, classes, history } = this.props;
        const breadcrumbsResource = [
            { url: "/" + resourceUrl, title: title, isActive: false },
        ];
        const CreateBlock = create;
        const createUrl = this.getCreateUrl();
        return (
            <React.Fragment>
                <Breadcrumbs resource={breadcrumbsResource} />
                <TableHeader resource={resourceUrl} />
                <div className={classes.mainBlock}>
                    <div className={classes.list}>
                        <Typography className={classes.blockTitle}>{title}</Typography>
                        <List
                            title={title}
                            perPage={ITEMS_PER_PAGE}
                            actions={null}
                            bulkActions={false}
                            pagination={<ListToolbar resourceUrl={resourceUrl} history={history} isCreatePage={this.isCreatePage()} createPath={createUrl} />}
                            {...this.props}
                        >
                            <Datagrid className={classes.tableList} rowClick="edit">
                                {children}
                            </Datagrid>
                        </List>
                    </div>
                    {
                        (!this.isCreatePage())
                        ?
                            <Route
                                path={this.getDetailsUrl()}
                                render={({ match }) => <DetailsTemplate mode="show" {...this.props} id={match.params.id} />}
                            />
                        :
                            <Route
                                path={createUrl}
                                render={({ match }) => <CreateBlock {...this.props} id={match.params.id} />}
                            />
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(listStyles)(ListTemplate);
