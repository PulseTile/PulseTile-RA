import React from "react";
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
        color: theme.palette.mainColor,
    },
    breadcrumbsItem: {
        display: "flex",
    }
});

/**
 * This component returns breadcrumbs block
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} resource
 */
const Breadcrumbs = ({ classes, resource }) => {
    return (
        <div className={classes.breadcrumbsBlock}>
            <Typography>
                <Link to="/" className={classes.link} color="inherit" aria-label="Home">Home</Link>
            </Typography>
            {
                resource.map((item, key) => {
                    return (
                        <div key={key} className={classes.breadcrumbsItem}>
                            <div className={classes.separator}></div>
                            {item.isActive
                                ? <Link to={item.url} className={classes.link} aria-label={item.title} color="inherit">{item.title}</Link>
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
};

export default withStyles(styles)(Breadcrumbs);