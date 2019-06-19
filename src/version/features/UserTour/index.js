import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';
import { setSidebarVisibility } from 'react-admin';

import { PATIENT_SUMMARY } from "../../../core/config/clientUrls";
import { homepage } from './content';
import RunUserTour from "./fragments/RunTourButton";
import LinkToCustomer from "./fragments/LinkToCustomer";
import LinkToHomepage from "./fragments/LinkToHomepage";

class UserTour extends Component {

    state = {
        isTourRun: false,
        isTourMode: true,
    };

    /**
     * This function add info to Cookie that user tour was passed
     *
     * @param tour
     */
    callback = (tour) => {
        const { type } = tour;
        const { actions } = this.props;

        if (type === 'tour:end') {
            document.cookie = 'userTour=passed';
            this.setState({
                isTourMode: !this.state.isTourMode,
            })
        }

        if (type === 'tooltip' && window.innerWidth < 768) {
            actions.setSidebarVisibility(false);
        }
    };

    /**
     * This function runs User Tour
     */
    runTour = () => {
        this.setState(
            state => ({ isTourRun: !state.isTourRun }),
            () => this.props.setSidebarVisibility(!this.props.isSidebarOpen)
        );
    };

    /**
     * This function toggles User Tour mode
     */
    toggleMode = () => {
        this.setState({
            isTourMode: true,
        })
    };

    /**
     * This function check that UserTour was passed
     *
     * @return {boolean}
     */
    checkIsPassed = () => {
        const decodedCookie = decodeURIComponent(document.cookie).split(';');
        return !(decodedCookie.indexOf('userTour=passed') !== -1 || decodedCookie.indexOf(' userTour=passed') !== -1);
    };

    render() {
        const { classes, location } = this.props;
        const { isTourRun, isTourMode } = this.state;
        const isPassed = (this.checkIsPassed() || isTourRun);
        const pathName = get(location, 'pathname', null);
        return (
            <div className={classes.rightBlockItem}>
                {(pathName === PATIENT_SUMMARY)
                    ?
                    (isTourMode
                        ? <RunUserTour classes={classes} runTour={this.runTour} isPassed={isPassed} callback={this.callback} />
                        : <LinkToCustomer classes={classes} homepage={homepage} />
                    )
                    : <LinkToHomepage classes={classes} toggleMode={this.toggleMode} />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isSidebarOpen: state.admin.ui.sidebarOpen,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setSidebarVisibility(params) {
            dispatch(setSidebarVisibility(params));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTour);
