/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/admin.js":
/*!*************************!*\
  !*** ./src/js/admin.js ***!
  \*************************/
/***/ (() => {

eval("/*\n\tSets height for ACF wysiwyg fields.\n*/\nif (typeof acf !== 'undefined') {\n  acf.add_action('wysiwyg_tinymce_init', function (ed, id, mceInit, $field) {\n    var newHeight = false;\n\n    if ($field.hasClass('one-line')) {\n      newHeight = '1.8rem';\n    }\n\n    if ($field.hasClass('short-height')) {\n      newHeight = '3rem';\n    }\n\n    if (newHeight) {\n      var minHeight = newHeight;\n      var mceHeight = jQuery(ed.iframeElement).contents().find('html').height() || minHeight;\n\n      if (mceHeight < minHeight) {\n        mceHeight = minHeight;\n      }\n\n      jQuery(ed.iframeElement).css({\n        'height': mceHeight,\n        'min-height': minHeight\n      });\n      $field.css({\n        'min-height': minHeight\n      });\n    }\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYWRtaW4uanMuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYW9uZXdlYi8uL3NyYy9qcy9hZG1pbi5qcz84MThmIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG5cdFNldHMgaGVpZ2h0IGZvciBBQ0Ygd3lzaXd5ZyBmaWVsZHMuXG4qL1xuaWYgKHR5cGVvZiBhY2YgIT09ICd1bmRlZmluZWQnKSB7XG4gIGFjZi5hZGRfYWN0aW9uKCd3eXNpd3lnX3RpbnltY2VfaW5pdCcsIGZ1bmN0aW9uIChlZCwgaWQsIG1jZUluaXQsICRmaWVsZCkge1xuICAgIHZhciBuZXdIZWlnaHQgPSBmYWxzZTtcblxuICAgIGlmICgkZmllbGQuaGFzQ2xhc3MoJ29uZS1saW5lJykpIHtcbiAgICAgIG5ld0hlaWdodCA9ICcxLjhyZW0nO1xuICAgIH1cblxuICAgIGlmICgkZmllbGQuaGFzQ2xhc3MoJ3Nob3J0LWhlaWdodCcpKSB7XG4gICAgICBuZXdIZWlnaHQgPSAnM3JlbSc7XG4gICAgfVxuXG4gICAgaWYgKG5ld0hlaWdodCkge1xuICAgICAgdmFyIG1pbkhlaWdodCA9IG5ld0hlaWdodDtcbiAgICAgIHZhciBtY2VIZWlnaHQgPSBqUXVlcnkoZWQuaWZyYW1lRWxlbWVudCkuY29udGVudHMoKS5maW5kKCdodG1sJykuaGVpZ2h0KCkgfHwgbWluSGVpZ2h0O1xuXG4gICAgICBpZiAobWNlSGVpZ2h0IDwgbWluSGVpZ2h0KSB7XG4gICAgICAgIG1jZUhlaWdodCA9IG1pbkhlaWdodDtcbiAgICAgIH1cblxuICAgICAgalF1ZXJ5KGVkLmlmcmFtZUVsZW1lbnQpLmNzcyh7XG4gICAgICAgICdoZWlnaHQnOiBtY2VIZWlnaHQsXG4gICAgICAgICdtaW4taGVpZ2h0JzogbWluSGVpZ2h0XG4gICAgICB9KTtcbiAgICAgICRmaWVsZC5jc3Moe1xuICAgICAgICAnbWluLWhlaWdodCc6IG1pbkhlaWdodFxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/admin.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/admin.js"]();
/******/ 	
/******/ })()
;