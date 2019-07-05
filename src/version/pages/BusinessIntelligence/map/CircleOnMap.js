import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles/index";

import PopoverInfo from "./PopoverInfo";

const styles = theme => ({
    circle: {
        opacity: 0.5,
        cursor: 'pointer',
    },
});

class CircleOnMap extends Component {

    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: false,
        });
    };

    render() {
        const { classes, id, size, color, cityName, healthScore, onClick } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <React.Fragment>
                <div
                    className={classes.circle}
                    onClick={() => onClick(id)}
                    onMouseOver={e => this.handleClick(e)}
                    onMouseOut={() => this.handleClose()}
                    style={{
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        backgroundColor: color
                    }}>
                </div>
                <PopoverInfo open={open} anchorEl={anchorEl} handleClose={this.handleClose} cityName={cityName} healthScore={healthScore} />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(CircleOnMap);
