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
import FilterIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import Breadcrumbs from "../../common/Breadcrumbs";
import TableHeader from "../../common/TableHeader";
import ListToolbar from "../../common/Toolbars/ListToolbar";
import DetailsTemplate from "./DetailsTemplate";
import { ITEMS_PER_PAGE } from "../../config/styles";

const listStyles = theme => ({
    mainBlock: {
        display: "flex",
    },
    list: {
        width: '100%',
        margin: 15,
    },
    edit: {
        width: '100%',
    },
    blockTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 49,
        color: "white",
        backgroundColor: theme.templates.listTemplate.blockTitle.backgroundColor,
        fontSize: 18,
        fontWeight: 700,
        paddingLeft: 15,
    },
    title: {
        color: "white",
        backgroundColor: theme.templates.listTemplate.title.backgroundColor,
        fontSize: 18,
        fontWeight: 700,
    },
    filterIcon: {
        paddingRight: 15,
    },
    filterInput: {
        backgroundColor: theme.templates.listTemplate.filterInput.backgroundColor,
        borderRadius: 0,
        boxShadow: "none",
        '& button': {
            color: "white",
        },
    },
    inputBlock: {
        width: 'calc(100% - 105px)',
        backgroundColor: "white",
        borderRadius: 2,
        paddingLeft: 5,
    },
    tableList: {
        '& thead': {
            backgroundColor: "#e5e5e5",
            color: "black !important",
            '& tr': {
                height: 48,
            },
        },
        '& tbody tr:hover': {
            backgroundColor: theme.templates.listTemplate.tableList.backgroundColorHover,
            color: "white !important"
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
        const { details, create, resourceUrl, title, children, classes, history } = this.props;
        const { isFilterOpened, key, filterText } = this.state;
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
                        <React.Fragment>
                            <div className={classes.blockTitle}>
                                <Typography className={classes.title}>{title}</Typography>
                                <FilterIcon className={classes.filterIcon} onClick={() => this.toggleFilter()} />
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
                                        <Tooltip title="Search">
                                            <IconButton className={classes.iconButton}>
                                                <SearchIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Paper>
                            }
                        </React.Fragment>
                        <List
                            key={key}
                            filter={{ filterText: filterText }}
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
