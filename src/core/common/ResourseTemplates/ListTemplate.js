import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';
import { Route } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import TableIcon from '@material-ui/icons/List';
import ChartIcon from '@material-ui/icons/ShowChart';
import TimelineIcon from '@material-ui/icons/Timeline';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';

import { columnsTogglingAction } from "../../actions/columnsTogglingAction";

import Breadcrumbs from "../../common/Breadcrumbs";
import TableHeader from "../../common/TableHeader";
import DetailsTemplate from "./DetailsTemplate";

import { MODE_TIMELINE, MODE_TABLE, MODE_CHART } from "./fragments/constants";
import TableContent from "./fragments/TableContent";
import ChartContent from "./fragments/ChartContent";
import TimelineContent from "./fragments/TimelineContent";

import ListModePopover from "./popovers/ListModePopover";

import ColumnsTogglingIcon from "./icons/ColumnsTogglingIcon";

const listStyles = theme => ({
    mainBlock: {
        margin: 0,
        paddingLeft: 10,
        paddingTop: 15,
        paddingRight: 25,
        border: `1px solid ${theme.palette.borderColor}`,
    },
    headerBlock: {
        marginBottom: theme.isOldDesign ? 5 : null,
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
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 700,
        paddingLeft: 15,
        paddingRight: 10,
    },
    emptyBlock: {
        flexGrow: 1,
    },
    title: {
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 700,
    },
    filterIcon: {
        color: theme.isOldDesign ? `${theme.palette.secondaryMainColor} !important` : `${theme.palette.paperColor} !important`,
        paddingLeft: 10,
        paddingRight: 10,
        border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        height: 35,
    },
    listModeIcon: {
        color: theme.isOldDesign ? `${theme.palette.secondaryMainColor} !important` : `${theme.palette.paperColor} !important`,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 5,
        border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        height: 35,
    },
    expandIcon: {
        color: theme.isOldDesign ? `${theme.palette.secondaryMainColor} !important` : `${theme.palette.paperColor} !important`,
        border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
        height: 35,
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
        width: 'calc(100% - 30px)',
        backgroundColor: "#fff",
        borderRadius: 2,
        paddingLeft: 5,
        marginLeft: 10,
        marginBottom: 10,
    },
});

/**
 * This component returns template for List page
 * (it used in List blocks for the plugins Allergies, Contacts, Medications, Problems etc.)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class ListTemplate extends Component {

    state = {
        listMode: MODE_TABLE,
        anchorEl: null,
        isListOpened: true,
        isFilterOpened: false,
        filterText: null,
        key: 0,
        hiddenColumns: [],
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

    componentDidMount() {
        const { resourceUrl, toggleColumnStore, defaultHiddenColumns } = this.props;
        if (defaultHiddenColumns) {
            defaultHiddenColumns.map(item => {
                toggleColumnStore(resourceUrl, item);
            });
        }
        this.setState({
            hiddenColumns: defaultHiddenColumns,
            key: this.state.key + 1,
        })
    }

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

    getListModeIcon = () => {
        const { listMode } = this.state;
        let result = TableIcon;
        if (listMode === MODE_CHART) {
            result = ChartIcon;
        } else if (listMode === MODE_TIMELINE) {
            result = TimelineIcon;
        }
        return result;
    };

    getContentBlock = () => {
        const { listMode } = this.state;
        let result = TableContent;
        if (listMode === MODE_CHART) {
            result = ChartContent;
        } else if (listMode === MODE_TIMELINE) {
            result = TimelineContent;
        }
        return result;
    };

    changeListMode = mode => {
        this.setState({
            listMode: mode,
            anchorEl: false,
        });
    };

    popoverOpen = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    popoverClose = () => {
        this.setState({
            anchorEl: false,
        });
    };

    toggleColumn = value => {
        const { resourceUrl, toggleColumnStore, updateTableHead } = this.props;

        let hiddenColumnsArray = this.state.hiddenColumns;
        let key = this.state.key;

        if (hiddenColumnsArray.indexOf(value) !== -1) {
            let index = hiddenColumnsArray.indexOf(value);
            hiddenColumnsArray.splice(index, 1);
        } else {
            hiddenColumnsArray.push(value);
        }
        key++;

        this.setState({
            hiddenColumns: hiddenColumnsArray,
            key: key,
        }, () => {
            updateTableHead();
            toggleColumnStore(resourceUrl, value)
        });
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

    render() {
        const { create, resourceUrl, title, classes, history, userSearch, headerFilterAbsent, currentList, hasChart, hasTimetable, isCustomDatagrid } = this.props;
        const { isFilterOpened, isListOpened, anchorEl, hiddenColumns, key } = this.state;

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

        const ListModeIcon = this.getListModeIcon();
        const ContentBlock = this.getContentBlock();

        const open = Boolean(anchorEl);

        return (
            <React.Fragment>
                <Breadcrumbs resource={breadcrumbsResource} />
                <TableHeader resource={resourceUrl} />
                <Grid container spacing={16} className={classes.mainBlock}>
                    { isListOpened &&
                    <Grid className={classes.list} item xs={12} sm={this.isListPage() ? 12 : 6}>
                        <div className={classes.headerBlock}>
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
                                <ColumnsTogglingIcon hiddenColumns={hiddenColumns} toggleColumn={this.toggleColumn} {...this.props} />
                                {
                                    (hasChart || hasTimetable) &&
                                        <React.Fragment>
                                            <Tooltip title="Table">
                                                <IconButton onClick={e => this.popoverOpen(e)}>
                                                    <ListModeIcon className={classes.listModeIcon}/>
                                                </IconButton>
                                            </Tooltip>
                                            <ListModePopover
                                                anchorEl={anchorEl}
                                                open={open}
                                                changeListMode={this.changeListMode}
                                                handleClose={this.popoverClose}
                                                resourse={title}
                                                hasChart={hasChart}
                                                hasTimetable={hasTimetable}
                                            />
                                        </React.Fragment>
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
                                    <InputBase className={classes.inputBlock} onChange={e => this.filterByText(e)} placeholder="Filter..." />
                                </Paper>
                            }
                        </div>
                        <ContentBlock
                            key={key}
                            hiddenColumns={hiddenColumns}
                            createUrl={createUrl}
                            idsNumber={idsNumber}
                            isCustomDatagrid={isCustomDatagrid}
                            history={history}
                            {...this.props}
                        />
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

const mapDispatchToProps = dispatch => {
    return {
        toggleColumnStore(resource, columnName) {
            dispatch(columnsTogglingAction.toggle(resource, columnName));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(listStyles)(ListTemplate));
