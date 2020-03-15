webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/Stats.js":
/*!*****************************!*\
  !*** ./components/Stats.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stats; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/conorogrady/react_workspace/corona/components/Stats.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function Stats() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(),
      stats = _useState[0],
      setStats = _useState[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    fetch("https://covid19.mathdro.id/api/").then(function (data) {
      return data.json();
    }).then(function (res) {
      console.log(res);
      setStats(res);
    });
  }, []); // empty array as second argument ensures useEffect function only runs once on initial render: https://css-tricks.com/run-useeffect-only-once/ 

  if (!stats) {
    return __jsx("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, "loading ........");
  }

  return __jsx("div", {
    style: {
      display: "flex",
      justifyContent: "space-evenly"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, __jsx("div", {
    style: styles.statContainer,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, __jsx("span", {
    style: styles.statHeader,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, "Confirmed"), __jsx("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, stats.confirmed.value.toLocaleString())), __jsx("div", {
    style: styles.statContainer,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, __jsx("span", {
    style: styles.statHeader,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, "Recovered"), __jsx("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, stats.recovered.value.toLocaleString())), __jsx("div", {
    style: styles.statContainer,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, __jsx("span", {
    style: styles.statHeader,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, "Deaths"), __jsx("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, stats.deaths.value.toLocaleString())));
}
var styles = {
  statContainer: {
    border: '1px solid',
    borderRadius: '7px',
    padding: '20px 0px',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: "15px 0px"
  },
  statHeader: {
    fontSize: '1.2em',
    fontWeight: 'bold'
  }
};

/***/ })

})
//# sourceMappingURL=index.js.43a69b7dcde359d8db97.hot-update.js.map