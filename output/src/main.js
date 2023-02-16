"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
});
var _jsxRuntime = require("react/jsx-runtime");
require("react");
var _client = _interopRequireDefault(require("react-dom/client")), _app = _interopRequireDefault(require("./App"));
require("../styles/index.css");
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var Render = function() {
    return (0, _jsxRuntime.jsx)(_reactRouterDom.BrowserRouter, {
        children: (0, _jsxRuntime.jsx)(_app.default, {})
    });
};
if ("undefined" != typeof window) {
    var container = document.getElementById("root");
    if (!import.meta.hot && (null == container ? void 0 : container.innerText)) {
        var container1 = document.getElementById("root");
        _client.default.hydrateRoot(container1, (0, _jsxRuntime.jsx)(Render, {}));
    } else _client.default.createRoot(container).render((0, _jsxRuntime.jsx)(Render, {}));
}
