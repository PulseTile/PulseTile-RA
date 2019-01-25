import React from "react";
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    breadcrumbsBlock: {
        display: "flex",
        height: "48px",
        alignItems: "center",
        border: "1px solid #e5e5e5",
        paddingLeft: "10px",
        backgroundColor: "white",
    },
    separator: {
        width: 0,
        height: 0,
        borderTop: "5px solid transparent",
        borderBottom: "5px solid transparent",
        borderLeft: "5px solid black",
        marginLeft: "8px",
        marginRight: "8px",
        marginTop: "5px",
    },
    link: {
        textDecoration: "none",
        color: "#2196f3",
    },
    breadcrumbsItem: {
        display: "flex",
    }
};

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
            <Link to="/charts" className={classes.link} color="inherit">Home</Link>
            {
                resource.map((item, key) => {
                    return (
                        <div key={key} className={classes.breadcrumbsItem}>
                            <div className={classes.separator}></div>
                            {item.isActive
                                ? <Link to={item.url} className={classes.link} color="inherit">{item.title}</Link>
                                : <Typography>{item.title}</Typography>
                            }
                        </div>
                    );
                })
            }
        </div>
    );
};

export default withStyles(styles)(Breadcrumbs);