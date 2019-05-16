import React, { Component } from "react";

import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import CleanIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
    icon: {
        color: theme.palette.dangerColor,
    }
});

class TableBodyBlock extends Component {

    render() {
        const { classes, removeItem, list } = this.props;
        return (
            <TableBody>
                {
                    list.map((item, key) => {
                        return (
                            <TableRow key={key}>
                                <TableCell scope="row" padding="none">
                                    <Typography>{item.name}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography>{item.type}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography>{item.date}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography>{item.source}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Clean Search" disableHoverListener={true}>
                                        <IconButton
                                            className={classes.icon}
                                            aria-haspopup="true"
                                            color="inherit"
                                            onClick={() => removeItem(item.sourceId)}
                                        >
                                            <CleanIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        );
    }
};

export default withStyles(styles)(TableBodyBlock);