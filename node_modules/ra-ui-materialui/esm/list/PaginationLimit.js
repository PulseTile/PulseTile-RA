import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import compose from 'recompose/compose';
import { translate } from 'ra-core';
var PaginationLimit = function (_a) {
    var translate = _a.translate;
    return (React.createElement(CardContent, null,
        React.createElement(Typography, { variant: "body1" }, translate('ra.navigation.no_results'))));
};
PaginationLimit.propTypes = {
    translate: PropTypes.func.isRequired,
};
var enhance = compose(pure, translate);
export default enhance(PaginationLimit);
