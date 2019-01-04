var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import ChipInput from 'material-ui-chip-input';
import { withStyles } from '@material-ui/core/styles';
var chipInputStyles = {
    label: {
        top: 18,
    },
    labelShrink: {
        top: 8,
    },
    chipContainer: {
        alignItems: 'center',
        display: 'flex',
        minHeight: 50,
    },
};
var AutocompleteArrayInputChip = function (props) { return React.createElement(ChipInput, __assign({}, props)); };
export default withStyles(chipInputStyles)(AutocompleteArrayInputChip);
