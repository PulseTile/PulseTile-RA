import React, { Component } from "react";
import { get } from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import CleanIcon from '@material-ui/icons/HighlightOff';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';

import { userSearchAction } from "../../../../actions/userSearchAction";

const styles = theme => ({
    mainBlock: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginRight: 25,
        height: 36,
        minWidth: 350,
        borderRadius: 18,
        backgroundColor: theme.palette.disabledColor,
    },
    input: {
        display: "block",
        width: "80%",
        height: "95%",
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 15,
        border: 0,
        backgroundColor: theme.palette.disabledColor,
    },
    icon: {
        color: "#000",
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

    onRemoveClick = () => {
        this.setState(() => {
            return {
                searchText: '',
            }
        }, () => this.props.removeUserSearch());
    };

    onSearchClick = searchText => {
        this.props.setUserSearch(searchText);
        window.location.replace('/#/patients');
    };

    render() {
        const { classes, userSearch, ...rest } = this.props;
        const { searchText } = this.state;
        return (
            <div className={classes.mainBlock}>
                <Tooltip>
                    <IconButton
                        className={classes.icon}
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>
                <input
                    className={classes.input}
                    type="text"
                    name="userSearch"
                    value={searchText}
                    placeholder="Search"
                    onChange={e => this.handleChange(e)}
                />
                { userSearch &&
                    <Tooltip title="Clean Search">
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
                <Tooltip title="Patients Search">
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
        userSearch: state.custom.userSearch.data,
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