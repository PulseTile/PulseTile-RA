import React, { Component } from "react";

import { withStyles } from '@material-ui/core/styles/index';
import Typography from "@material-ui/core/Typography/index";

const styles = theme => ({
    expansionPanel: {
        height: "49px !important",
        border: `1px solid ${theme.palette.borderColor}`,
        '& > div': {
            minHeight: "49px !important",
        }
    },
    currentExpansionPanel: {
        margin: "0px !important",
        border: `1px solid ${theme.palette.borderColor}`,
        '& > div': {
            minHeight: "49px !important",
        }
    },
    expansionPanelSummary: {
        backgroundColor: theme.palette.mainColor,
        paddingLeft: 16,
        '& > div': {
            margin: "0px !important",
            marginTop: "0px",
            marginBottom: "0px",
        }
    },
    emptyBlock: {
        flexGrow: 1,
    },
    expandIcon: {
        height: 35,
        paddingLeft: 10,
        paddingRight: 10,
        border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        color: theme.isOldDesign ? theme.palette.secondaryMainColor : theme.palette.paperColor,
    },
    expandBlockIcon: {
        height: 35,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 35,
        border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        color: theme.isOldDesign ? theme.palette.secondaryMainColor : theme.palette.paperColor,
    },
    expansionTypography: {
        paddingTop: 10,
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        fontSize: 18,
        fontWeight: 700,
    },
    expansionPanelDetails: {
        display: "flex",
        flexDirection: "column",
        padding: 0,
    },
    itemBlock: {
        margin: 10,
    },
    blockContent: {
        marginTop: 5,
    },
    showAll: {
        color: theme.palette.secondaryMainColor,
        fontWeight: 800,
        cursor: 'pointer',
    }
});

class ItemBlock extends Component {

    state = {
        isShowAll: false,
    };

    toggleShowAll = () => {
        this.setState({
            isShowAll: !this.state.isShowAll,
        })
    };

    componentDidMount() {
        const { list } = this.props;
        if (list.length > 4) {
            this.setState({
                isShowAll: true,
            })
        }
    }

    getShortRow = list => {
        let result = [];
        for (let i = 0; i < 4; i++) {
            let item = list[i];
            result.push(item);
        }

        return result;
    };

    render() {
        const { classes, list, title, isLoading } = this.props;
        const { isShowAll } = this.state;
        const shortRow = (list.length > 4) ? this.getShortRow(list) : list;
        return (
            <div className={classes.itemBlock}>
                <Typography variant="h3">{title}</Typography>
                {
                    isLoading && <Typography className={classes.blockContent}>Loading...</Typography>
                }
                {
                    isShowAll
                        ?
                            <React.Fragment>
                                <Typography className={classes.blockContent}>{list.join(', ')}</Typography>
                                { (list.length > 4) && <Typography className={classes.showAll} onClick={() => this.toggleShowAll()}>Hide</Typography> }
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <Typography className={classes.blockContent}>{shortRow.join(', ')}</Typography>
                                { (list.length > 4) && <Typography className={classes.showAll} onClick={() => this.toggleShowAll()}>ShowAll</Typography> }
                            </React.Fragment>
                }
            </div>
        )
    }
}

export default withStyles(styles)(ItemBlock);
