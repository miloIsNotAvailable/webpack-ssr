"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "render", {
    enumerable: !0,
    get: function() {
        return render;
    }
});
var _jsxRuntime = require("react/jsx-runtime"), _app = _interopRequireDefault(require("./App")), _server = _interopRequireDefault(require("react-dom/server")), _server1 = require("react-router-dom/server");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var render = function(url) {
    return _server.default.renderToString((0, _jsxRuntime.jsx)(_server1.StaticRouter, {
        location: url,
        children: (0, _jsxRuntime.jsx)(_app.default, {})
    }));
};
