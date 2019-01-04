"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var compose_1 = __importDefault(require("recompose/compose"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var FileInput_1 = require("./FileInput");
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
    ImageInput.defaultProps = __assign({}, FileInput_1.FileInput.defaultProps, { labelMultiple: 'ra.input.image.upload_several', labelSingle: 'ra.input.image.upload_single' });
    return ImageInput;
}(FileInput_1.FileInput));
exports.ImageInput = ImageInput;
exports.default = compose_1.default(ra_core_1.addField, ra_core_1.translate, styles_1.withStyles(styles))(ImageInput);
