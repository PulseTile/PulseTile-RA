var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { addField, translate } from 'ra-core';
import { FileInput } from './FileInput';
var styles = {
    root: { width: '100%' },
    dropZone: {
        background: '#efefef',
        cursor: 'pointer',
        padding: '1rem',
        textAlign: 'center',
        color: '#999',
    },
    preview: {},
    removeButton: {
        display: 'inline-block',
        position: 'relative',
        float: 'left',
        '& button': {
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            minWidth: '2rem',
            opacity: 0,
        },
        '&:hover button': {
            opacity: 1,
        },
    },
};
var ImageInput = /** @class */ (function (_super) {
    __extends(ImageInput, _super);
    function ImageInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageInput.defaultProps = __assign({}, FileInput.defaultProps, { labelMultiple: 'ra.input.image.upload_several', labelSingle: 'ra.input.image.upload_single' });
    return ImageInput;
}(FileInput));
export { ImageInput };
export default compose(addField, translate, withStyles(styles))(ImageInput);
