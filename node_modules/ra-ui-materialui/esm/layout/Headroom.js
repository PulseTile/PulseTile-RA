import React from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
var defaultStyle = {
    position: 'fixed',
    zIndex: 1300,
};
var HeadroomCustom = function (_a) {
    var children = _a.children;
    return (React.createElement(Headroom, { style: defaultStyle }, children));
};
HeadroomCustom.propTypes = {
    children: PropTypes.node.isRequired,
};
export default HeadroomCustom;
