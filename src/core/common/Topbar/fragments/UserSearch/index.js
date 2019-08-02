import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CleanIcon from '@material-ui/icons/HighlightOff';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';

import { userSearchAction } from "../../../../actions/userSearchAction";

const styles = theme => ({
    mainBlock: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 36,
        minWidth: 350,
        borderRadius: 18,
        backgroundColor: theme.isOldDesign ? null : theme.palette.disabledColor,
    },
    input: {
        display: "block",
        width: "100%",
        height: "95%",
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 20,
        marginRight: theme.isOldDesign ? null : 10,
        borderRadius: theme.isOldDesign ? 0 : 18,
        border: theme.isOldDesign ? `1px solid ${theme.palette.disabledColor}` : 0,
        backgroundColor: theme.isOldDesign ? theme.palette.paperColor : theme.palette.disabledColor,
    },
    icon: {
        color: theme.isOldDesign ? theme.palette.paperColor : theme.palette.fontColor,
        backgroundColor: theme.isOldDesign ? theme.palette.secondaryMainColor : null,
        borderRadius: 0,
        height: 35,
        '&:hover': {
            color: theme.isOldDesign ? theme.palette.secondaryMainColor : null,
            border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
            backgroundColor: theme.isOldDesign ? theme.palette.paperColor : null,
        }
    },
});

class UserSearch extends Component {

    state = {
        searchText: this.props.userSearch ? this.props.userSearch : null,
    };

    handleChange = e => {
        this.setState({
            searchText: e.target.value,
        })
    };

    componentWillReceiveProps(nextProps) {
        const { userSearch } = nextProps;
        if (!userSearch) {
            this.setState({
                searchText: '',
            });
        } else if (userSearch) {
            this.setState({
                searchText: userSearch,
            });
        }
    }

    onRemoveClick = () => {
        this.setState(() => {
            return {
                searchText: '',
            }
        }, () => this.props.removeUserSearch());
    };

    onSearchClick = searchText => {
        this.props.removeUserSearch();
        this.props.setUserSearch(searchText);
        window.location.replace('/#/patients');
    };

    onKeyDown = e => {
        const { searchText } = this.state;
        if (e.key === 'Enter') {
            this.props.setUserSearch(searchText);
            window.location.replace('/#/patients');
        }
    };

    render() {
        const { classes, userSearch, ...rest } = this.props;
        const { searchText } = this.state;
        return (
            <div className={classes.mainBlock}>
                <input
                    className={classes.input}
                    type="text"
                    name="userSearch"
                    value={searchText}
                    placeholder="Search"
                    onChange={e => this.handleChange(e)}
                    onKeyDown={e => this.onKeyDown(e)}
                />
                { userSearch &&
                    <Tooltip title="Clean Search" disableHoverListener={true}>
                        <IconButton
                            className={classes.icon}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => this.onRemoveClick()}
                        >
                            <CleanIcon />
                        </IconButton>
                    </Tooltip>
                }
                <Tooltip title="Patients Search" disableHoverListener={true}>
                    <IconButton
                        className={classes.icon}
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => this.onSearchClick(searchText)}
                    >
                        <SearchIcon />
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        userSearch: get(state, 'custom.userSearch.data', null),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setUserSearch(data) {
            dispatch(userSearchAction.request(data));
        },
        removeUserSearch() {
            dispatch(userSearchAction.remove());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserSearch));