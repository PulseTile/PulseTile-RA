import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
var TitleForRecord = function (_a) {
    var defaultTitle = _a.defaultTitle, record = _a.record, title = _a.title;
    return record ? (React.createElement(Title, { title: title, record: record, defaultTitle: defaultTitle })) : ('');
};
TitleForRecord.propTypes = {
    defaultTitle: PropTypes.any,
    record: PropTypes.object,
    title: PropTypes.any,
};
export default TitleForRecord;
