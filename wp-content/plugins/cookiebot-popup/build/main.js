/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _class_cookiebot_popup_v1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class-cookiebot-popup-v1 */ \"./src/js/class-cookiebot-popup-v1.js\");\n/* harmony import */ var _class_cookiebot_popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class-cookiebot-popup */ \"./src/js/class-cookiebot-popup.js\");\n\n\nwindow.addEventListener('CookiebotOnDialogInit', function () {\n  new _class_cookiebot_popup_v1__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  new _class_cookiebot_popup__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n});\n\n//# sourceURL=webpack://cookiebot-popup/./src/js/app.js?");

/***/ }),

/***/ "./src/js/class-cookiebot-popup-v1.js":
/*!********************************************!*\
  !*** ./src/js/class-cookiebot-popup-v1.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CookiebotPopupV1)\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/js/util.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : \"undefined\" != typeof Symbol && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i[\"return\"] && (_r = _i[\"return\"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n/**\n * OLD POP UP VERSION 1 FALLBACK SUPPORT\n * This is to support cookiebot version 1.3.2 and below\n * Using template with dc-class instead of stem-class\n */\n\n\nvar CookiebotPopupV1 = /*#__PURE__*/_createClass(function CookiebotPopupV1() {\n  var _this2 = this;\n  _classCallCheck(this, CookiebotPopupV1);\n  this.accordions = function () {\n    var _this = _this2;\n    document.addEventListener('click', function (e) {\n      console.log('V1 KLIKK');\n      if (!e.target) return;\n      var el = e.target;\n\n      // Toggle parent accordion\n      if (el.id == 'DcCookiebotListToggle' && el.classList.contains('dc-cookiebot-popup__main__list-toggle')) {\n        console.log('V1 KLIKK --- yes');\n        _this.toggleAccordion(el);\n        var acp = _this.setActiveClass(el); // acp: Active Class Parent\n        _this.setDetailsText(el, acp);\n        _this.setAriaState(el, acp);\n      }\n\n      // Toggle child accordion\n      if (el.classList.contains('dc-cookiebot-popup__main__cookie-list__cat__toggle')) {\n        _this.toggleAccordion(el);\n        var acc = _this.setActiveClass(el); // acc: Active Class Child\n        _this.setAriaState(el, acc);\n      }\n    });\n  };\n  this.toggleAccordion = function (el) {\n    var content = el.parentElement.nextSibling;\n    return (0,_util__WEBPACK_IMPORTED_MODULE_0__.slideToggle)(content);\n  };\n  this.setActiveClass = function (el) {\n    var _el$className$split = el.className.split(' '),\n      _el$className$split2 = _slicedToArray(_el$className$split, 1),\n      mainClass = _el$className$split2[0];\n    var activeClass = mainClass + '--active';\n    if (el.classList.contains(activeClass)) {\n      el.classList.remove(activeClass);\n    } else {\n      el.classList.add(activeClass);\n    }\n    return activeClass;\n  };\n  this.setDetailsText = function (el, activeClass) {\n    if (el.classList.contains(activeClass)) {\n      el.innerHTML = CookiebotDialog.hideDetailsText;\n    } else {\n      el.innerHTML = CookiebotDialog.showDetailsText;\n    }\n  };\n  this.setAriaState = function (el, activeClass) {\n    if (el.classList.contains(activeClass)) {\n      el.setAttribute('aria-hidden', false);\n      el.setAttribute('aria-expanded', true);\n    } else {\n      el.setAttribute('aria-hidden', true);\n      el.setAttribute('aria-expanded', false);\n    }\n  };\n  this.accordions();\n});\n\n\n//# sourceURL=webpack://cookiebot-popup/./src/js/class-cookiebot-popup-v1.js?");

/***/ }),

/***/ "./src/js/class-cookiebot-popup.js":
/*!*****************************************!*\
  !*** ./src/js/class-cookiebot-popup.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CookiebotPopup)\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/js/util.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : \"undefined\" != typeof Symbol && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i[\"return\"] && (_r = _i[\"return\"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar CookiebotPopup = /*#__PURE__*/_createClass(function CookiebotPopup() {\n  var _this2 = this;\n  _classCallCheck(this, CookiebotPopup);\n  // privacy_page_link = ( el ) => {\n  // const privacyLinkEl = document.querySelector( '.stem-cookiebot-popup__policy-link' );\n  // if ( privacyLinkEl ) {\n  // const privacyLink = privacyLinkEl.href;\n  // window.open( privacyLink, '_blank' ).focus();\n  // return true;\n  // }\n  // return false;\n  // }\n  this.accordions = function () {\n    var _this = _this2;\n    document.addEventListener('click', function (e) {\n      if (!e.target) return;\n      var el = e.target;\n      var ToggleClass = 'stem-cookiebot-popup__toggle';\n\n      // Toggle parent accordion\n      if (el.classList.contains(ToggleClass)) {\n        // if ( el.id === 'DcCookiebotListToggle' ) {\n        // const redirect = _this.privacy_page_link( el );\n        // if ( redirect ) {\n        // \treturn;\n        // }\n        // }\n\n        var toggleTarget = el.dataset.toggle;\n        _this.toggleAccordion(el, document.querySelector(toggleTarget));\n        var acp = _this.setActiveClass(el); // acp: Active Class Parent\n        _this.setDetailsText(el, acp);\n        _this.setAriaState(el, acp);\n      }\n\n      // Toggle child accordion\n      if (el.classList.contains('stem-cookiebot-popup__main__cookie-list__cat__toggle')) {\n        var content = el.parentElement.nextSibling;\n        _this.toggleAccordion(el, content);\n        var acc = _this.setActiveClass(el); // acc: Active Class Child\n        _this.setAriaState(el, acc);\n      }\n    });\n  };\n  this.toggleAccordion = function (el, target) {\n    return (0,_util__WEBPACK_IMPORTED_MODULE_0__.slideToggle)(target);\n  };\n  this.setActiveClass = function (el) {\n    var _el$className$split = el.className.split(' '),\n      _el$className$split2 = _slicedToArray(_el$className$split, 1),\n      mainClass = _el$className$split2[0];\n    var activeClass = mainClass + '--active';\n    if (el.classList.contains(activeClass)) {\n      el.classList.remove(activeClass);\n    } else {\n      el.classList.add(activeClass);\n    }\n    return activeClass;\n  };\n  this.setDetailsText = function (el, activeClass) {\n    if (el.classList.contains(activeClass)) {\n      el.innerHTML = CookiebotDialog.hideDetailsText;\n    } else {\n      el.innerHTML = CookiebotDialog.showDetailsText;\n    }\n  };\n  this.setAriaState = function (el, activeClass) {\n    if (el.classList.contains(activeClass)) {\n      el.setAttribute('aria-hidden', false);\n      el.setAttribute('aria-expanded', true);\n    } else {\n      el.setAttribute('aria-hidden', true);\n      el.setAttribute('aria-expanded', false);\n    }\n  };\n  this.accordions();\n});\n\n\n//# sourceURL=webpack://cookiebot-popup/./src/js/class-cookiebot-popup.js?");

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setTransition: () => (/* binding */ setTransition),\n/* harmony export */   slideToggle: () => (/* binding */ slideToggle)\n/* harmony export */ });\nvar slideToggle = function slideToggle(el) {\n  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;\n  setTransition(el, {\n    target: 'height',\n    duration: duration,\n    type: 'linear'\n  });\n  el.style.overflow = 'hidden';\n  if (el.style.display !== 'block') {\n    el.style.display = 'block';\n    el.style.height = 'auto';\n    var height = el.clientHeight + 'px';\n    el.style.height = '0px';\n    setTimeout(function () {\n      el.style.height = height;\n    }, 0);\n    setTimeout(function () {\n      el.style.height = 'auto';\n    }, duration);\n  } else {\n    el.style.height = '0px';\n    setTimeout(function () {\n      el.style.display = 'none';\n    }, duration);\n  }\n};\nvar setTransition = function setTransition(el, options) {\n  var target = options.target,\n    duration = options.duration,\n    type = options.type;\n  el.style.transition = \"\".concat(target, \" \").concat(duration, \"ms \").concat(type);\n  el.style.MozTransition = \"\".concat(target, \" \").concat(duration, \" \").concat(type);\n  el.style.WebkitTransition = \"\".concat(target, \" \").concat(duration, \" \").concat(type);\n  el.style.willChange = target;\n};\n\n//# sourceURL=webpack://cookiebot-popup/./src/js/util.js?");

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://cookiebot-popup/./src/scss/app.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./src/js/app.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scss/app.scss");
/******/ 	
/******/ })()
;