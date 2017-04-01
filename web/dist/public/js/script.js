/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = {
    parse: urls => {
        return fetch("api/v1/parse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ urls })
        }).then(result => {
            return result.json().then(res => {
                return result.ok ? res : Promise.reject(res);
            }).catch(res => {
                return Promise.reject({ "message": "JSON is invalid" });
            });
        });
    },

    product: prod => {
        return fetch("api/v1/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(prod)
        });
    }
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_http__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__product_components_Product__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__query_components_Query__ = __webpack_require__(4);




class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            err: "",
            data: undefined
        };

        this.error = this.error.bind(this);
        this.update = this.update.bind(this);
    }

    confirm(k) {
        let product = this.data[k];

        __WEBPACK_IMPORTED_MODULE_0__common_http__["a" /* default */].product(product); // TODO: handle messages
    }

    error(err) {
        this.setState({ err });
    }

    update(data) {
        this.setState({ data });
    }

    renderProducts() {
        return this.state.data.map(d => {
            return React.createElement(__WEBPACK_IMPORTED_MODULE_1__product_components_Product__["a" /* default */], { key: d.id, specs: d.specs, name: d.name, confirm: this.confirm.bind(this, k) });
        });
    }

    render() {
        return React.createElement(
            'div',
            { className: 'container mt-5' },
            React.createElement(
                'h1',
                { className: 'text-center' },
                'Product Parser'
            ),
            this.state.err ? React.createElement(
                'div',
                { className: 'alert alert-danger', role: 'alert' },
                this.state.err,
                '.'
            ) : null,
            React.createElement(__WEBPACK_IMPORTED_MODULE_2__query_components_Query__["a" /* default */], { update: this.update, error: this.error }),
            this.state.data ? null : null
        );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = App;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            specs: []
        };

        this.handleConfirm = this.handleConfirm.bind(this);
    }

    update(k, e) {
        let newSpecs = this.state.specs;
        newSpecs[k].value = e.currentTarget.value;

        this.setState({ specs: newSpecs });
    }

    renderSpecs() {
        return this.props.specs.map((spec, k) => {
            return React.createElement(Specification, { key: k, update: this.update.bind(this, k), data: spec });
        });
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h2",
                { className: "text-center" },
                this.props.name
            ),
            React.createElement(
                "form",
                null,
                this.renderSpecs(),
                React.createElement(
                    "button",
                    { className: "btn btn-primary text-center", onClick: this.props.confirm },
                    "Confirm"
                )
            )
        );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Product;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_http__ = __webpack_require__(0);


class Query extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: ""
        };

        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUrl(e) {
        let url = e.currentTarget.value;
        this.setState({ url });
    }

    onSubmit(e) {
        e.preventDefault();
        __WEBPACK_IMPORTED_MODULE_0__common_http__["a" /* default */].post([{ url: this.state.url }]).then(res => {
            this.props.error("");
            this.props.update(res);
        }).catch(res => {
            this.props.error(res.message);
        });
    }

    render() {
        return React.createElement(
            "form",
            null,
            React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "label",
                    { htmlFor: "url" },
                    "Enter a url:"
                ),
                React.createElement("input", {
                    className: "form-control",
                    value: this.state.url,
                    onChange: this.onChangeUrl,
                    placeholder: "URL" })
            ),
            React.createElement(
                "div",
                { className: "form-group text-center" },
                React.createElement(
                    "button",
                    { type: "submit", onClick: this.onSubmit, className: "btn btn-primary" },
                    "Submit"
                )
            )
        );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Query;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);



__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(React.createElement(__WEBPACK_IMPORTED_MODULE_0__App__["a" /* default */], null), document.getElementById("root"));

/***/ })
/******/ ]);
//# sourceMappingURL=script.js.map