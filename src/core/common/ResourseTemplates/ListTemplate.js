import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';
import { Route } from "react-router";
import {
    List,
    Filter,
    TextInput,
    Datagrid,
    TextField
} from "react-admin";

import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FilterIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import Breadcrumbs from "../../common/Breadcrumbs";
import TableHeader from "../../common/TableHeader";
import ListToolbar from "../../common/Toolbars/ListToolbar";
import EmptyListBlock from "./EmptyListBlock";
import DetailsTemplate from "./DetailsTemplate";
import { ITEMS_PER_PAGE } from "../../config/styles";

const listStyles = theme => ({
    mainBlock: {
        margin: 0,
        paddingLeft: 10,
        paddingTop: 15,
        paddingRight: 25,
    },
    list: {
        paddingLeft: 0,
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
    filterIcon: {
        paddingRight: 15,
    },
    filterInput: {
        backgroundColor: theme.palette.mainColor,
        borderRadius: 0,
        boxShadow: "none",
        '& button': {
            color: "#fff",
        },
    },
    inputBlock: {
        width: 'calc(100% - 105px)',
        backgroundColor: "#fff",
        borderRadius: 2,
        paddingLeft: 5,
    },
    tableList: {
        '& thead': {
            '& tr th': {
                paddingLeft: 10,
            },
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.mainColor + '!important',
        },
        '& tbody tr:hover td span': {
            color: "#fff"
        }
    }
});

/**
 * This component returns template for List page
 * (it used in List blocks for the plugins Allergies, Contacts, Medications, Problems etc.)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class ListTemplate extends Component {

    state = {
        isFilterOpened: false,
        filterText: null,
        key: 0,
    };

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

    /**
     * This function toggle filter input
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     */
    toggleFilter = () => {
        this.setState({
            isFilterOpened: !this.state.isFilterOpened,
        })
    };

    /**
     * This function check is current page is list page with table (it also used at create and show pages).
     * Settings of <Grid /> component of <ListTemplate /> depends on result of this function.
     *
     * Second part of condition - for the case when list page is a homepage
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @return {boolean}
     */
    isListPage = () => {
        return (this.props.location.pathname === `/${this.props.resourceUrl}`) || (this.props.location.pathname === '/');
    };

    /**
     * This function set filter string to state
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @param {shape} e
     */
    filterByText = e => {
        this.setState({
            filterText: e.target.value,
            key: this.state.key + 1,
        })
    };

    render() {
        const { create, resourceUrl, title, children, classes, history, currentList } = this.props;
        const { isFilterOpened, key, filterText } = this.state;
        const breadcrumbsResource = [
            { url: "/" + resourceUrl, title: title, isActive: false },
        ];
        const CreateBlock = create;
        const createUrl = this.getCreateUrl();
        const currentListArray = Object.values(currentList);
        const idsNumber = currentListArray.length > 0 ? currentListArray.length : 0;
        return (
            <React.Fragment>
                <Breadcrumbs resource={breadcrumbsResource} />
                <TableHeader resource={resourceUrl} />
                <Grid container spacing={16} className={classes.mainBlock}>
                    <Grid className={classes.list} item xs={12} sm={this.isListPage() ? 12 : 6}>
                        <React.Fragment>
                            <div className={classes.blockTitle}>
                                <Typography className={classes.title}>{title}</Typography>
                                <SearchIcon className={classes.filterIcon} onClick={() => this.toggleFilter()} />
                            </div>
                            {
                                isFilterOpened &&
                                <Paper className={classes.filterInput} elevation={1}>
                                    <Tooltip title="Menu">
                                        <IconButton className={classes.iconButton}>
                                            <FilterIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <InputBase className={classes.inputBlock} onChange={e => this.filterByText(e)} placeholder="Filter..." />
                                </Paper>
                            }
                        </React.Fragment>
                        <List
                            resource={resourceUrl}
                            key={key}
                            filter={{ filterText: filterText }}
                            title={title}
                            perPage={ITEMS_PER_PAGE}
                            actions={null}
                            bulkActions={false}
                            pagination={<ListToolbar resourceUrl={resourceUrl} history={history} isCreatePage={this.isCreatePage()} createPath={createUrl} />}
                            {...this.props}
                        >
                            { (idsNumber > 0) ?
                                <Datagrid className={classes.tableList} rowClick="edit">
                                    {children}
                                </Datagrid>
                                :
                                <EmptyListBlock />
                            }
                        </List>
                    </Grid>
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
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentList: state.admin.resources[ownProps.resource].list.ids,
    };
};

export default connect(mapStateToProps, null)(withStyles(listStyles)(ListTemplate));
