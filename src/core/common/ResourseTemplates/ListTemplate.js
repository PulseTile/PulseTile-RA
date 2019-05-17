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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';

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
        border: `1px solid ${theme.palette.borderColor}`,
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
    emptyBlock: {
        flexGrow: 1,
    },
    title: {
        color: theme.palette.paperColor,
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 700,
    },
    filterIcon: {
        color: `${theme.palette.paperColor} !important`,
        paddingRight: 15,
    },
    expandIcon: {
        height: 20,
        color: `${theme.palette.paperColor} !important`,
        paddingRight: 7,
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
        },
        '& tbody tr:hover td button span p': {
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
        isListOpened: true,
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

    toggleListBlock = () => {
        this.setState({
            isListOpened: !this.state.isListOpened,
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

    filterByUserSearch = () => {
        this.setState((state, props) => {
            if (state.filterText !== props.userSearch) {
                return {
                    filterText: props.userSearch,
                    key: this.state.key + 1,
                }
            }
        });
    };

    hasNewItem = (newListArray, prevListArray, nextProps, userSearch) => {
        let result = false;
        const newDataArray = Object.values(get(nextProps, 'currentData', {}));
        for (let i = 0, n = newDataArray.length; i < n; i++) {
            let item = newDataArray[i];
            if (get(item, 'isNew', false) && get(item, 'lastName', null) === userSearch) {
                result = true;
                break;
            }
        }
        return result;
    };

    componentWillReceiveProps(nextProps, nextContext) {
        const newListArray = Object.values(get(nextProps, 'currentList', {}));
        const prevListArray = Object.values(get(nextContext, 'currentList', {}));
        const userSearch = get(nextProps, 'userSearch', null);
        const hasNewItem = this.hasNewItem(newListArray, prevListArray, nextProps, userSearch);
        if (newListArray.length === 1 && prevListArray.length === 0 && hasNewItem) {
            this.setState({
                key: this.state.key + 1
            });
        }
    }

    render() {
        const { create, resourceUrl, title, children, classes, history, userSearch, headerFilterAbsent, currentList } = this.props;
        const { isFilterOpened, key, isListOpened, filterText } = this.state;
        const breadcrumbsResource = [
            { url: "/" + resourceUrl, title: title, isActive: false },
        ];
        const CreateBlock = create;
        const createUrl = this.getCreateUrl();

        let titleTable = title;
        if (userSearch && resourceUrl === 'patients') {
            titleTable = `Patients matching '${userSearch}'`;
            this.filterByUserSearch();
        }

        const currentListArray = Object.values(currentList);
        const idsNumber = currentListArray.length > 0 ? currentListArray.length : 0;

        return (
            <React.Fragment>
                <Breadcrumbs resource={breadcrumbsResource} />
                <TableHeader resource={resourceUrl} />
                <Grid id="listTemplate" container spacing={16} className={classes.mainBlock}>
                    { isListOpened &&
                    <Grid className={classes.list} item xs={12} sm={this.isListPage() ? 12 : 6}>
                        <React.Fragment>
                            <div className={classes.blockTitle}>
                                <Typography className={classes.title}>{titleTable}</Typography>
                                <div className={classes.emptyBlock}></div>
                                {!this.isListPage() &&
                                <Tooltip title="Expand">
                                    <IconButton onClick={() => history.push("/" + resourceUrl)}  >
                                        <FontAwesomeIcon icon={faExpandArrowsAlt} className={classes.expandIcon}  size="1x" />
                                    </IconButton>
                                </Tooltip>
                                }
                                { !headerFilterAbsent &&
                                <Tooltip title="Search">
                                    <IconButton onClick={() => this.toggleFilter()}>
                                        <SearchIcon className={classes.filterIcon}/>
                                    </IconButton>
                                </Tooltip>
                                }
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
                            filter={{ filterText: (userSearch && resourceUrl === 'patients') ? userSearch : filterText }}
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
                    }
                    {
                        (!this.isCreatePage())
                            ?
                            <Route
                                path={this.getDetailsUrl()}
                                render={({ match }) => <DetailsTemplate mode="show" isListOpened={isListOpened} toggleListBlock={this.toggleListBlock} {...this.props} id={match.params.id} />}
                            />
                            :
                            <Route
                                path={createUrl}
                                render={({ match }) => <CreateBlock isListOpened={isListOpened} toggleListBlock={this.toggleListBlock} id={match.params.id} {...this.props} />}
                            />
                    }
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps)  => {
    return {
        userSearch: state.custom.userSearch.data,
        currentList: get(state, 'admin.resources[' + ownProps.resource + '].list.ids', []),
        currentData: get(state, 'admin.resources[' + ownProps.resource + '].data', []),
    }
};

export default withStyles(listStyles)(connect(mapStateToProps, null)(ListTemplate));
