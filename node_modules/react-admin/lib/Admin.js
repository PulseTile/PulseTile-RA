'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _raCore = require('ra-core');

var _raUiMaterialui = require('ra-ui-materialui');

var Admin = _raCore.CoreAdmin;

Admin.defaultProps = {
    appLayout: _raUiMaterialui.Layout,
    catchAll: _raUiMaterialui.NotFound,
    loading: _raUiMaterialui.Loading,
    loginPage: _raUiMaterialui.Login,
    logoutButton: _raUiMaterialui.Logout
};

exports.default = Admin;
module.exports = exports['default'];