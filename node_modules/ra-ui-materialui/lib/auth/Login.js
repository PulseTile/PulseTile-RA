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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var classnames_1 = __importDefault(require("classnames"));
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var Avatar_1 = __importDefault(require("@material-ui/core/Avatar"));
var styles_1 = require("@material-ui/core/styles");
var Lock_1 = __importDefault(require("@material-ui/icons/Lock"));
var defaultTheme_1 = __importDefault(require("../defaultTheme"));
var Notification_1 = __importDefault(require("../layout/Notification"));
var LoginForm_1 = __importDefault(require("./LoginForm"));
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
        _this.theme = styles_1.createMuiTheme(props.theme);
        _this.containerRef = react_1.default.createRef();
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
        return (react_1.default.createElement(styles_1.MuiThemeProvider, { theme: this.theme },
            react_1.default.createElement("div", __assign({ className: classnames_1.default(classes.main, className) }, sanitizeRestProps(rest), { ref: this.containerRef }),
                react_1.default.createElement(Card_1.default, { className: classes.card },
                    react_1.default.createElement("div", { className: classes.avatar },
                        react_1.default.createElement(Avatar_1.default, { className: classes.icon },
                            react_1.default.createElement(Lock_1.default, null))),
                    loginForm),
                react_1.default.createElement(Notification_1.default, null))));
    };
    return Login;
}(react_1.Component));
Login.propTypes = {
    authProvider: prop_types_1.default.func,
    backgroundImage: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    input: prop_types_1.default.object,
    loginForm: prop_types_1.default.element,
    meta: prop_types_1.default.object,
    previousRoute: prop_types_1.default.string,
};
Login.defaultProps = {
    backgroundImage: 'https://source.unsplash.com/random/1600x900/daily',
    theme: defaultTheme_1.default,
    loginForm: react_1.default.createElement(LoginForm_1.default, null),
};
exports.default = styles_1.withStyles(styles)(Login);
