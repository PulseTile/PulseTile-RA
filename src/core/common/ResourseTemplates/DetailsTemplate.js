import React, { Component } from "react";

/**
 * This component returns Details block template
 * (fork to Edit and Show)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class DetailsTemplate extends Component {

    state = {
        viewType: this.props.mode,
    };

    changeViewType = viewType => {
        this.setState({
            viewType: viewType,
        })
    };

    render() {
        const { classes, show, edit, ...rest } = this.props;
        const { viewType } = this.state;
        const ShowTemplate = show;
        const EditTemplate = edit;
        if (viewType === 'show') {
            return (
                <ShowTemplate changeViewType={this.changeViewType} {...this.props} />
            );
        } else if (viewType === 'edit') {
            return (
                <EditTemplate changeViewType={this.changeViewType} {...this.props} />
            );
        }
        return null;
    }
}

export default DetailsTemplate;