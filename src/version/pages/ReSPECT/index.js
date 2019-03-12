import React, { Component } from "react";

import SectionsTable from "./SectionsTable";
import VersionsTable from "./VersionsTable";

class Respect extends Component {

    state = {
        isVersionMode: true,
        currentVersion: null,
        currentSection: null,
    };

    toggleMode = (currentVersion, currentSection) => {
        this.setState({
            isVersionMode: !this.state.isVersionMode,
            currentVersion: currentVersion,
            currentSection: currentSection,
        })

    };

    render() {
        const { isVersionMode, currentVersion, currentSection } = this.state;
        if (!isVersionMode) {
            return (
               <SectionsTable
                   toggleMode={this.toggleMode}
                   currentVersion={currentVersion}
                   sectionForShow={currentSection}
               />
            )
        }
        return (
            <VersionsTable toggleMode={this.toggleMode} />
        )
    }
}

export default Respect;