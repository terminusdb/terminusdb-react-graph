"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _GraphResultsViewer = _interopRequireDefault(require("./GraphResultsViewer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var GraphComponent = function GraphComponent(props) {
  var d3Container = (0, _react.useRef)(null);
  var graphResult = new _GraphResultsViewer["default"](props.config, props.dataProvider);
  var height = props.config && props.config.gheight || 300;
  var width = props.config && props.config.gwidth || 400;
  (0, _react.useEffect)(function () {
    if (props.dataProvider && d3Container.current) {
      graphResult.load(d3Container.current, true);
    }
  },
  /*
    useEffect has a dependency array (below). It's a list of dependency
    variables for this useEffect block. The block will run after mount
    and whenever any of these variables change. We still have to check
    if the variables are valid, but we do not have to compare old props
    to next props to decide whether to rerender.
  */
  [props.dataProvider, d3Container.current]);
  return _react["default"].createElement("div", {
    className: "d3-component",
    width: width,
    height: height,
    ref: d3Container
  });
};

var _default = GraphComponent;
exports["default"] = _default;