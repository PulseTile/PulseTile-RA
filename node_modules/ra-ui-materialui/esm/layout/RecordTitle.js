import React from 'react';
import PropTypes from 'prop-types';
import TitleDeprecated from './TitleDeprecated';
/**
 * @deprecated Use TitleForRecord instead
 */
var RecordTitle = function (_a) {
    var defaultTitle = _a.defaultTitle, record = _a.record, title = _a.title;
    return record ? (React.createElement(TitleDeprecated, { title: title, record: record, defaultTitle: defaultTitle })) : ('');
};
RecordTitle.propTypes = {
    defaultTitle: PropTypes.any,
    record: PropTypes.object,
    title: PropTypes.any,
};
export default RecordTitle;
