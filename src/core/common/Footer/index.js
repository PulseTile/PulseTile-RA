import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { httpErrorAction } from '../../actions/httpErrorAction';
import DefaultFooter from "./DefaultFooter";
import HandleErrorModal from "../HandleErrorModal";
import { themeCommonElements } from "../../../version/config/theme.config";

class Footer extends Component {

    state = {
        isErrorModalOpen: false,
    };

    closeModal = () => {
        this.setState(
            { isErrorModalOpen: false },
            () => this.props.removeErrorNotification()
        );
    };

    render() {
        const { httpErrors } = this.props;
        const { isErrorModalOpen } = this.state;

        const errorStatus = get(httpErrors, 'status', null);
        const errorMessage = get(httpErrors, 'message', null);
        const isOpen = isErrorModalOpen || (errorStatus && errorMessage);

        const ThemeFooter = get(themeCommonElements, 'footer', false);
        const isFooterAbsent = get(themeCommonElements, 'isFooterAbsent', false);

        return (
            <React.Fragment>
                <HandleErrorModal
                    open={isOpen}
                    status={errorStatus}
                    message={errorMessage}
                    onClose={this.closeModal}
                />
                {
                    isFooterAbsent ? null :
                        (ThemeFooter ? <ThemeFooter /> : <DefaultFooter />)
                }
            </React.Fragment>
        );
    }


};

const mapStateToProps = state => {
    return {
        httpErrors: state.custom.httpErrors.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeErrorNotification() {
             dispatch(httpErrorAction.remove());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
