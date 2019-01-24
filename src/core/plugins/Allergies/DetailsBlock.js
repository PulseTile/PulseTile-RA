import React, { Component } from "react";

import EditToolbarWithoutDelete from "../../common/EditToolbarWithoutDelete";
import AllergiesEdit from "./AllergiesEdit";
import AllergiesShow from "./AllergiesShow";

/**
 * This component returns Details block for Allergies
 * (fork to Edit and Show)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
export default class DetailsBlock extends Component {

    state = {
        view: this.props.mode,
    };

    changeViewType = viewType => {
        this.setState({
            view: viewType,
        })
    };

    render() {
        const { classes, ...rest } = this.props;
        const { view } = this.state;
        if (view === 'show') {
            return (
                <AllergiesShow changeViewType={this.changeViewType} {...this.props} />
            );
        } else if (view === 'edit') {
            return (
                <AllergiesEdit changeViewType={this.changeViewType} {...this.props} />
            );
        }
        return null;
    }
}