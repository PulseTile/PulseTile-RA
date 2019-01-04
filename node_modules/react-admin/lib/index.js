'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminRouter = exports.Admin = undefined;

var _raCore = require('ra-core');

Object.keys(_raCore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _raCore[key];
    }
  });
});

var _raUiMaterialui = require('ra-ui-materialui');

Object.keys(_raUiMaterialui).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _raUiMaterialui[key];
    }
  });
});

var _Admin2 = require('./Admin');

var _Admin3 = _interopRequireDefault(_Admin2);

var _AdminRouter2 = require('./AdminRouter');

var _AdminRouter3 = _interopRequireDefault(_AdminRouter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Admin = _Admin3.default;
exports.AdminRouter = _AdminRouter3.default;