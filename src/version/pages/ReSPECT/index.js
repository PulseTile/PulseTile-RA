import React, { Component } from "react";

import SectionsTable from "./SectionsTable";
import VersionsTable from "./VersionsTable";

class Respect extends Component {

    state = {
        isVersionMode: true,
    };

    toggleMode = () => {
        this.setState({
            isVersionMode: !this.state.isVersionMode,
        })
    };

    render() {
        const { isVersionMode } = this.state;
        if (!isVersionMode) {
            return (
               <SectionsTable toggleMode={this.toggleMode} />
            )
        }
        return (
            <VersionsTable toggleMode={this.toggleMode} />
        )
    }
}

export default Respect;