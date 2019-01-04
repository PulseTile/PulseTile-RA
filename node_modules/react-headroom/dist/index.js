'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _shouldUpdate2 = require('./shouldUpdate');

var _shouldUpdate3 = _interopRequireDefault(_shouldUpdate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line import/no-unresolved


var noop = function noop() {};

var Headroom = function (_Component) {
  _inherits(Headroom, _Component);

  function Headroom(props) {
    _classCallCheck(this, Headroom);

    // Class variables.
    var _this = _possibleConstructorReturn(this, (Headroom.__proto__ || Object.getPrototypeOf(Headroom)).call(this, props));

    _this.setRef = function (ref) {
      return _this.inner = ref;
    };

    _this.setHeightOffset = function () {
      _this.setState({
        height: _this.inner.offsetHeight
      });
      _this.resizeTicking = false;
    };

    _this.getScrollY = function () {
      if (_this.props.parent().pageYOffset !== void 0) {
        return _this.props.parent().pageYOffset;
      } else if (_this.props.parent().scrollTop !== void 0) {
        return _this.props.parent().scrollTop;
      } else {
        return (document.documentElement || document.body.parentNode || document.body).scrollTop;
      }
    };

    _this.getViewportHeight = function () {
      return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    };

    _this.getDocumentHeight = function () {
      var body = document.body;
      var documentElement = document.documentElement;

      return Math.max(body.scrollHeight, documentElement.scrollHeight, body.offsetHeight, documentElement.offsetHeight, body.clientHeight, documentElement.clientHeight);
    };

    _this.getElementPhysicalHeight = function (elm) {
      return Math.max(elm.offsetHeight, elm.clientHeight);
    };

    _this.getElementHeight = function (elm) {
      return Math.max(elm.scrollHeight, elm.offsetHeight, elm.clientHeight);
    };

    _this.getScrollerPhysicalHeight = function () {
      var parent = _this.props.parent();

      return parent === window || parent === document.body ? _this.getViewportHeight() : _this.getElementPhysicalHeight(parent);
    };

    _this.getScrollerHeight = function () {
      var parent = _this.props.parent();

      return parent === window || parent === document.body ? _this.getDocumentHeight() : _this.getElementHeight(parent);
    };

    _this.isOutOfBound = function (currentScrollY) {
      var pastTop = currentScrollY < 0;

      var scrollerPhysicalHeight = _this.getScrollerPhysicalHeight();
      var scrollerHeight = _this.getScrollerHeight();

      var pastBottom = currentScrollY + scrollerPhysicalHeight > scrollerHeight;

      return pastTop || pastBottom;
    };

    _this.handleScroll = function () {
      if (!_this.scrollTicking) {
        _this.scrollTicking = true;
        (0, _raf2.default)(_this.update);
      }
    };

    _this.handleResize = function () {
      if (!_this.resizeTicking) {
        _this.resizeTicking = true;
        (0, _raf2.default)(_this.setHeightOffset);
      }
    };

    _this.unpin = function () {
      _this.props.onUnpin();

      _this.setState({
        translateY: '-100%',
        className: 'headroom headroom--unpinned',
        state: 'unpinned'
      });
    };

    _this.pin = function () {
      _this.props.onPin();

      _this.setState({
        translateY: 0,
        className: 'headroom headroom--pinned',
        state: 'pinned'
      });
    };

    _this.unfix = function () {
      _this.props.onUnfix();

      _this.setState({
        translateY: 0,
        className: 'headroom headroom--unfixed',
        state: 'unfixed'
      });
    };

    _this.update = function () {
      _this.currentScrollY = _this.getScrollY();

      if (!_this.isOutOfBound(_this.currentScrollY)) {
        var _shouldUpdate = (0, _shouldUpdate3.default)(_this.lastKnownScrollY, _this.currentScrollY, _this.props, _this.state),
            action = _shouldUpdate.action;

        if (action === 'pin') {
          _this.pin();
        } else if (action === 'unpin') {
          _this.unpin();
        } else if (action === 'unfix') {
          _this.unfix();
        }
      }

      _this.lastKnownScrollY = _this.currentScrollY;
      _this.scrollTicking = false;
    };

    _this.currentScrollY = 0;
    _this.lastKnownScrollY = 0;
    _this.scrollTicking = false;
    _this.resizeTicking = false;
    _this.state = {
      state: 'unfixed',
      translateY: 0,
      className: 'headroom headroom--unfixed'
    };
    return _this;
  }

  _createClass(Headroom, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setHeightOffset();
      if (!this.props.disable) {
        this.props.parent().addEventListener('scroll', this.handleScroll);

        if (this.props.calcHeightOnResize) {
          this.props.parent().addEventListener('resize', this.handleResize);
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.disable && !this.props.disable) {
        this.unfix();
        this.props.parent().removeEventListener('scroll', this.handleScroll);
        this.props.parent().removeEventListener('resize', this.handleResize);
      } else if (!nextProps.disable && this.props.disable) {
        this.props.parent().addEventListener('scroll', this.handleScroll);

        if (this.props.calcHeightOnResize) {
          this.props.parent().addEventListener('resize', this.handleResize);
        }
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _shallowequal2.default)(this.props, nextProps) || !(0, _shallowequal2.default)(this.state, nextState);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      // If children have changed, remeasure height.
      if (prevProps.children !== this.props.children) {
        this.setHeightOffset();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.parent().removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('scroll', this.handleScroll);
      this.props.parent().removeEventListener('resize', this.handleResize);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          userClassName = _props.className,
          divProps = _objectWithoutProperties(_props, ['className']);

      delete divProps.onUnpin;
      delete divProps.onPin;
      delete divProps.onUnfix;
      delete divProps.disableInlineStyles;
      delete divProps.disable;
      delete divProps.parent;
      delete divProps.children;
      delete divProps.upTolerance;
      delete divProps.downTolerance;
      delete divProps.pinStart;
      delete divProps.calcHeightOnResize;

      var style = divProps.style,
          wrapperStyle = divProps.wrapperStyle,
          rest = _objectWithoutProperties(divProps, ['style', 'wrapperStyle']);

      var innerStyle = {
        position: this.props.disable || this.state.state === 'unfixed' ? 'relative' : 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        WebkitTransform: 'translate3D(0, ' + this.state.translateY + ', 0)',
        MsTransform: 'translate3D(0, ' + this.state.translateY + ', 0)',
        transform: 'translate3D(0, ' + this.state.translateY + ', 0)'
      };

      var className = this.state.className;

      // Don't add css transitions until after we've done the initial
      // negative transform when transitioning from 'unfixed' to 'unpinned'.
      // If we don't do this, the header will flash into view temporarily
      // while it transitions from 0 — -100%.
      if (this.state.state !== 'unfixed') {
        innerStyle = _extends({}, innerStyle, {
          WebkitTransition: 'all .2s ease-in-out',
          MozTransition: 'all .2s ease-in-out',
          OTransition: 'all .2s ease-in-out',
          transition: 'all .2s ease-in-out'
        });
        className += ' headroom--scrolled';
      }

      if (!this.props.disableInlineStyles) {
        innerStyle = _extends({}, innerStyle, style);
      } else {
        innerStyle = style;
      }

      var wrapperStyles = _extends({}, wrapperStyle, {
        height: this.state.height ? this.state.height : null
      });

      var wrapperClassName = userClassName ? userClassName + ' headroom-wrapper' : 'headroom-wrapper';

      return _react2.default.createElement(
        'div',
        { style: wrapperStyles, className: wrapperClassName },
        _react2.default.createElement(
          'div',
          _extends({
            ref: this.setRef
          }, rest, {
            style: innerStyle,
            className: className
          }),
          this.props.children
        )
      );
    }
  }]);

  return Headroom;
}(_react.Component);

Headroom.propTypes = {
  className: _propTypes2.default.string,
  parent: _propTypes2.default.func,
  children: _propTypes2.default.any.isRequired,
  disableInlineStyles: _propTypes2.default.bool,
  disable: _propTypes2.default.bool,
  upTolerance: _propTypes2.default.number,
  downTolerance: _propTypes2.default.number,
  onPin: _propTypes2.default.func,
  onUnpin: _propTypes2.default.func,
  onUnfix: _propTypes2.default.func,
  wrapperStyle: _propTypes2.default.object,
  pinStart: _propTypes2.default.number,
  style: _propTypes2.default.object,
  calcHeightOnResize: _propTypes2.default.bool
};
Headroom.defaultProps = {
  parent: function parent() {
    return window;
  },
  disableInlineStyles: false,
  disable: false,
  upTolerance: 5,
  downTolerance: 0,
  onPin: noop,
  onUnpin: noop,
  onUnfix: noop,
  wrapperStyle: {},
  pinStart: 0,
  calcHeightOnResize: true
};
exports.default = Headroom;