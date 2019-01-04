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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import { MuiThemeProvider, createMuiTheme, withStyles, } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import defaultTheme from '../defaultTheme';
import Notification from '../layout/Notification';
import DefaultLoginForm from './LoginForm';
var styles = function (theme) { return ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        height: '1px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    card: {
        minWidth: 300,
        marginTop: '6em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.secondary[500],
    },
}); };
var sanitizeRestProps = function (_a) {
    var array = _a.array, backgroundImage = _a.backgroundImage, classes = _a.classes, className = _a.className, location = _a.location, staticContext = _a.staticContext, theme = _a.theme, title = _a.title, rest = __rest(_a, ["array", "backgroundImage", "classes", "className", "location", "staticContext", "theme", "title"]);
    return rest;
};
/**
 * A standalone login page, to serve as authentication gate to the admin
 *
 * Expects the user to enter a login and a password, which will be checked
 * by the `authProvider` using the AUTH_LOGIN verb. Redirects to the root page
 * (/) upon success, otherwise displays an authentication error message.
 *
 * Copy and adapt this component to implement your own login logic
 * (e.g. to authenticate via email or facebook or anything else).
 *
 * @example
 *     import MyLoginPage from './MyLoginPage';
 *     const App = () => (
 *         <Admin loginPage={MyLoginPage} authProvider={authProvider}>
 *             ...
 *        </Admin>
 *     );
 */
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        var _this = _super.call(this, props) || this;
        // Even though the React doc ensure the ref creation is done before the
        // componentDidMount, it can happen that the ref is set to null until the
        // next render.
        // So, to handle this case the component will now try to load the image on
        // the componentDidMount, but if the ref doesn't exist, it will try again
        // on the following componentDidUpdate. The try will be done only once.
        // @see https://reactjs.org/docs/refs-and-the-dom.html#adding-a-ref-to-a-dom-element
        _this.updateBackgroundImage = function (lastTry) {
            if (lastTry === void 0) { lastTry = false; }
            if (!_this.backgroundImageLoaded && _this.containerRef.current) {
                var backgroundImage = _this.props.backgroundImage;
                _this.containerRef.current.style.backgroundImage = "url(" + backgroundImage + ")";
                _this.backgroundImageLoaded = true;
            }
            if (lastTry) {
                _this.backgroundImageLoaded = true;
            }
        };
        _this.theme = createMuiTheme(props.theme);
        _this.containerRef = React.createRef();
        _this.backgroundImageLoaded = false;
        return _this;
    }
    // Load background image asynchronously to speed up time to interactive
    Login.prototype.lazyLoadBackgroundImage = function () {
        var backgroundImage = this.props.backgroundImage;
        if (backgroundImage) {
            var img = new Image();
            img.onload = this.updateBackgroundImage;
            img.src = backgroundImage;
        }
    };
    Login.prototype.componentDidMount = function () {
        this.lazyLoadBackgroundImage();
    };
    Login.prototype.componentDidUpdate = function () {
        if (!this.backgroundImageLoaded) {
            this.lazyLoadBackgroundImage(true);
        }
    };
    Login.prototype.render = function () {
        var _a = this.props, classes = _a.classes, className = _a.className, loginForm = _a.loginForm, rest = __rest(_a, ["classes", "className", "loginForm"]);
        return (React.createElement(MuiThemeProvider, { theme: this.theme },
            React.createElement("div", __assign({ className: classnames(classes.main, className) }, sanitizeRestProps(rest), { ref: this.containerRef }),
                React.createElement(Card, { className: classes.card },
                    React.createElement("div", { className: classes.avatar },
                        React.createElement(Avatar, { className: classes.icon },
                            React.createElement(LockIcon, null))),
                    loginForm),
                React.createElement(Notification, null))));
    };
    return Login;
}(Component));
Login.propTypes = {
    authProvider: PropTypes.func,
    backgroundImage: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    input: PropTypes.object,
    loginForm: PropTypes.element,
    meta: PropTypes.object,
    previousRoute: PropTypes.string,
};
Login.defaultProps = {
    backgroundImage: 'https://source.unsplash.com/random/1600x900/daily',
    theme: defaultTheme,
    loginForm: React.createElement(DefaultLoginForm, null),
};
export default withStyles(styles)(Login);
