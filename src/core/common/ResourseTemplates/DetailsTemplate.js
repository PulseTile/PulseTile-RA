import React, { Component } from "react";

/**
 * This component returns Details block template
 * (fork to Edit and Show)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class DetailsTemplate extends Component {

    state = {
        view: this.props.mode,
    };

    changeViewType = viewType => {
        this.setState({
            view: viewType,
        })
    };

    render() {
        const { classes, show, edit, ...rest } = this.props;
        const { view } = this.state;
        const ShowTemplate = show;
        const EditTemplate = edit;
        if (view === 'show') {
            return (
                <ShowTemplate changeViewType={this.changeViewType} {...this.props} />
            );
        } else if (view === 'edit') {
            return (
                <EditTemplate changeViewType={this.changeViewType} {...this.props} />
            );
        }
        return null;
    }
}

export default DetailsTemplate;