import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { userSearchAction } from "../actions/userSearchAction";

const styles = theme => ({
    breadcrumbsBlock: {
        display: "flex",
        height: 48,
        alignItems: "center",
        border: `1px solid ${theme.palette.borderColor}`,
        paddingLeft: 10,
        backgroundColor: "#fff",
    },
    separator: {
        width: 0,
        height: 0,
        borderTop: "5px solid transparent",
        borderBottom: "5px solid transparent",
        borderLeft: "5px solid black",
        marginLeft: 8,
        marginRight: 8,
        marginTop: 5,
    },
    link: {
        textDecoration: "none",
        color: theme.palette.secondaryMainColor,
        cursor: "pointer",
    },
    breadcrumbsItem: {
        display: "flex",
    }
});

/**
 * This component returns breadcrumbs block
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class Breadcrumbs extends Component {

    goHomePage = () => {
        this.props.removeUserSearch();
        window.location.replace('/#/');
    };

    render() {
        const { classes, resource } = this.props;
        return (
            <div className={classes.breadcrumbsBlock}>
                <Typography className={classes.link} onClick={() => this.goHomePage()}>Home</Typography>
                {
                    resource.map((item, key) => {
                        return (
                            <div key={key} className={classes.breadcrumbsItem}>
                                <div className={classes.separator}></div>
                                {item.isActive
                                    ?
                                    <Typography>
                                        <Link to={item.url} className={classes.link} aria-label={item.title} color="inherit">{item.title}</Link>
                                    </Typography>
                                    : (item.onClickAction
                                            ? <Typography className={classes.link} onClick={() => item.onClickAction()}>{item.title}</Typography>
                                            : <Typography>{item.title}</Typography>
                                    )
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        removeUserSearch() {
            dispatch(userSearchAction.remove());
        },
    }
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(Breadcrumbs));