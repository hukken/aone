/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../plugins/dc-post-grid/src/mixins/Searchable.js":
/*!***********************************************************!*\
  !*** ../../plugins/dc-post-grid/src/mixins/Searchable.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Searchable": () => (/* binding */ Searchable)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Searchable = {
  props: {
    filters: {
      type: Array,
      required: true
    },
    lang: {
      type: String,
      required: false
    },
    s: {
      type: String,
      required: false
    },
    searchButtonId: {
      type: String,
      required: true
    },
    initialModel: {
      type: Object,
      required: false
    },
    currentPaged: {
      type: Number,
      required: true
    },
    gridSettings: {
      type: Array,
      required: true
    }
  },
  data: function data() {
    return {
      timeout: null,
      needsRefresh: false,
      previousTerm: '',
      initialPaged: null,
      previousPaged: '2',
      previousForm: {},
      form: {
        s: null,
        paged: 2,
        category: []
      }
    };
  },
  computed: {
    isQueryable: function isQueryable() {
      return typeof this.gridSettings !== 'undefined' && typeof this.gridSettings.queryable !== 'undefined' && this.gridSettings.queryable;
    }
  },
  methods: {
    toggleTextSearchFocused: function toggleTextSearchFocused() {
      this.textSearchFocused = !this.textSearchFocused;
    },
    doTextSearch: function doTextSearch() {
      var _this = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        _this.refreshQuery();

        _this.search();
      }, 250);
    },
    updateSearchTerm: function updateSearchTerm(newVal) {
      if (typeof newVal === 'undefined' || newVal === '') {
        this.form.s = null;
      } else {
        this.form.s = newVal;
      } // If the newVal is different than oldVal, and newVal is !empty


      if (typeof newVal !== 'undefined' && newVal !== this.previousTerm) {
        this.doTextSearch();
      }
    },
    updateAndSearch: function updateAndSearch(name, value, usesMultiselect) {
      if (this.previousForm[name] !== value) {
        this.refreshQuery();
        this.previousForm[name] = [value];

        if (typeof this.form[name] === 'undefined') {
          this.form[name] = [];
        }

        if (usesMultiselect) {
          if (this.form[name].includes(value)) {
            var index = this.form[name].indexOf(value);

            if (index > -1) {
              this.form[name].splice(index, 1);
            }
          } else {
            this.form[name].push(value);
          }
        } else {
          this.form[name] = [value];
        }

        this.search();
      }
    },
    refreshQuery: function refreshQuery() {
      this.form.paged = 0;
      this.$emit('update-current-paged', this.initialPaged);
      this.previousYear = this.form.year;

      if (typeof this.filters !== 'undefined') {
        for (var i = 0; i < this.filters.length; i++) {
          this.previousForm[this.filters[i].name] = this.form[this.filters[i].name];
        }
      }

      this.previousTerm = this.form.s;
    },
    serialize: function serialize(obj) {
      var str = '?' + Object.keys(obj).reduce(function (a, k) {
        a.push(k + '=' + encodeURIComponent(obj[k]));
        return a;
      }, []).join('&');
      return str;
    },
    updateDefaultFilterValuesIfNoSelections: function updateDefaultFilterValuesIfNoSelections(formValues) {
      return formValues;
      /*
      This logic is disabled. Replaced with __not_in hidden filters for terms.
      if (typeof this.filters === 'undefined' || this.filters.length === 0) return formValues;
      this.filters.forEach((filter, filterIndex) => {
      	if (formValues[filter.name].length===0) {
      		let values = [];
      		filter.options.forEach((option, optionIndex) => {
      			values.push(option.value)
      		})
      		formValues[filter.name] = values
      	}
      })
      return formValues
      */
    },
    getUrlFriendlyKey: function getUrlFriendlyKey(key) {
      if (key === 'post_type') return 'post_types';
      if (key === 'paged') return 'dc_page';
      return key;
    },
    updateUrlSearchHistory: function updateUrlSearchHistory(formValues) {
      var queryString = '';

      for (var _i = 0, _Object$entries = Object.entries(formValues); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        var paramKey = this.getUrlFriendlyKey(key);
        if (paramKey === 'dc_page' && ['0', 0].includes(value) || value.length === 0 || ['posts_per_page', 'order', 'orderby', 'total_pages', 'post_types'].includes(paramKey)) continue;
        queryString += queryString === '' ? '?' : '&';
        queryString += paramKey + '=';

        if (typeof value === 'string' || typeof value === 'number') {
          queryString += value;
        } else {
          if (_typeof(value) === 'object') {
            value = Object.values(value);
          }

          queryString += value.join(',');
        }
      }

      history.replaceState(null, '', queryString);
    },
    search: function search() {
      var _this2 = this;

      // if (typeof this.form.s === 'undefined') return
      this.$emit('searching');
      var formValues = this.form;

      if (formValues['s'] === null || typeof formValues['s'] === 'undefined') {
        delete formValues['s'];
      }

      var formValuesFinal = this.updateDefaultFilterValuesIfNoSelections(_objectSpread({}, formValues));
      axios.post(window.dcpgData.searchEndpoint + this.serialize(formValuesFinal)).then(function (response) {
        if (response.data.success) {
          if (_this2.isQueryable) {
            _this2.updateUrlSearchHistory(formValuesFinal);
          }

          _this2.form.paged = response.data.paged;
          _this2.needsRefresh = _this2.form.paged <= _this2.previousPaged;
          var resultData = {
            paged: response.data.paged,
            posts: response.data.posts,
            endOfResults: response.data.endOfResults,
            needsRefresh: _this2.needsRefresh
          };

          if (typeof response.data.totalPages !== 'undefined') {
            _this2.$emit('update-total-pages', response.data.totalPages);
          }

          _this2.$emit('results', resultData);

          _this2.previousPaged = _this2.form.paged;
        } else {
          _this2.$emit('error');
        }
      });
    },
    setInitialModelsFromFilters: function setInitialModelsFromFilters() {
      if (typeof this.filters !== 'undefined' && this.filters !== null) {
        for (var i = 0; i < this.filters.length; i++) {
          var value = this.filters[i].value[0] === '' ? [] : this.filters[i].value;
          this.form[this.filters[i].name] = value;
          this.previousForm[this.filters[i].name] = value;
        }
      }
    },
    initSearchModel: function initSearchModel() {
      //this.form.s = this.$route.params.s
      this.initialPaged = this.currentPaged;
      this.setInitialModelsFromFilters();

      if (typeof this.lang !== 'undefined') {
        this.form.lang = this.lang;
      }

      if (typeof this.s !== 'undefined') {
        this.form.s = this.s;
      }

      if (typeof this.initialModel !== 'undefined') {
        for (var _i2 = 0, _Object$entries2 = Object.entries(this.initialModel); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
              key = _Object$entries2$_i[0],
              value = _Object$entries2$_i[1];

          this.form[key] = value;
        }
      }
    }
  },
  mounted: function mounted() {
    this.initSearchModel();
  },
  watch: {
    currentPaged: function currentPaged(newVal) {
      this.form.paged = newVal;
      this.search();
    }
  }
};

/***/ }),

/***/ "../../plugins/dc-post-grid/src/mixins/Translatable.js":
/*!*************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/mixins/Translatable.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Translatable": () => (/* binding */ Translatable)
/* harmony export */ });
var Translatable = {
  methods: {
    dctxt: function dctxt(key) {
      if (typeof window.dcpgData.txt !== 'undefined' && typeof window.dcpgData.txt[key] !== 'undefined') return window.dcpgData.txt[key];
      return key;
    }
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/DcPostGrid.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/DcPostGrid.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DcPostGridResults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DcPostGridResults */ "../../plugins/dc-post-grid/src/layout/DcPostGridResults.vue");
/* harmony import */ var _dc_post_grid_layout_Filters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dc-post-grid/layout/Filters */ "../../plugins/dc-post-grid/src/layout/Filters.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    title: {
      type: String,
      required: false
    },
    subtitle: {
      type: String,
      required: false
    },
    filters: {
      type: Array,
      required: false
    },
    link: {
      type: Array,
      required: false
    },
    label_before_filters: {
      type: String,
      required: false
    },
    initial_results: {
      type: Array,
      required: false
    },
    initial_model: {
      type: Object,
      required: false
    },
    posts_per_page: {
      type: Array,
      required: false
    },
    grid_settings: {
      type: Array,
      required: false
    },
    grid_layout: {
      type: String,
      "default": 'default',
      required: false
    },
    grid_columns: {
      type: Number,
      "default": 3,
      required: false
    },
    show_load_more: {
      type: Boolean,
      "default": false,
      required: false
    },
    search_form_placeholder: {
      type: String | Boolean,
      "default": false,
      required: false
    }
  },
  data: function data() {
    return {
      loading: false,
      currentPaged: null,
      endOfResults: false,
      results: []
    };
  },
  components: {
    DcPostGridResults: _DcPostGridResults__WEBPACK_IMPORTED_MODULE_0__.default,
    Filters: _dc_post_grid_layout_Filters__WEBPACK_IMPORTED_MODULE_1__.default
  },
  computed: {
    usesPagination: function usesPagination() {
      return typeof this.initial_model !== 'undefined' && typeof this.initial_model.total_pages !== 'undefined';
    },
    showLoadMore: function showLoadMore() {
      if (this.usesPagination) return true;
      if (typeof this.initial_model === 'undefined' || typeof this.initial_model.posts_per_page === 'undefined') return this.show_load_more;
      return this.show_load_more && this.results.length >= this.initial_model.posts_per_page;
    },
    searchButtonId: function searchButtonId() {
      return 'dc-post-grid-search-' + Math.floor(Math.random() * 10000 + 1);
    },
    columnsClass: function columnsClass() {
      return 'has-' + this.grid_columns + '-columns';
    }
  },
  methods: {
    triggerLoading: function triggerLoading() {
      this.loading = true;
    },
    updateCurrentPaged: function updateCurrentPaged(newPagedNumber) {
      this.currentPaged = newPagedNumber;
    },
    updateTotalPages: function updateTotalPages(newTotalPageNumber) {
      this.totalPages = newTotalPageNumber;
    },
    updateFilter: function updateFilter(key, value) {
      this.loading = true;
      this.endOfResults = false;

      if (this.usesPagination) {
        this.currentPaged = 1;
      }
    },
    updateResults: function updateResults(data) {
      this.loading = false;
      this.endOfResults = data.endOfResults;

      if (data.needsRefresh === true || this.usesPagination) {
        this.results = [];
        this.results = data.posts;
      } else {
        this.results = this.results.concat(data.posts);
      }

      if (this.usesPagination) {
        var y = this.$refs.resultsSection.getBoundingClientRect().top + window.pageYOffset - 150;
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    },
    updateMinHeight: function updateMinHeight(minHeight) {
      this.$refs.postGrid.style.minHeight = minHeight + 'px';
    }
  },
  mounted: function mounted() {
    this.currentPaged = this.initial_model.paged;

    if (typeof this.initial_model.total_pages !== 'undefined') {
      this.totalPages = this.initial_model.total_pages;
    }

    this.results = this.initial_results;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/DcPostGridResults.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/DcPostGridResults.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dc_post_grid_mixins_Translatable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dc-post-grid/mixins/Translatable */ "../../plugins/dc-post-grid/src/mixins/Translatable.js");
/* harmony import */ var _dc_post_grid_layout_cards_Default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dc-post-grid/layout/cards/Default */ "../../plugins/dc-post-grid/src/layout/cards/Default.vue");
/* harmony import */ var _dc_post_grid_layout_ui_LoadMore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dc-post-grid/layout/ui/LoadMore */ "../../plugins/dc-post-grid/src/layout/ui/LoadMore.vue");
/* harmony import */ var _dc_post_grid_layout_ui_Pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @dc-post-grid/layout/ui/Pagination */ "../../plugins/dc-post-grid/src/layout/ui/Pagination.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mixins: [_dc_post_grid_mixins_Translatable__WEBPACK_IMPORTED_MODULE_0__.Translatable],
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    results: {
      type: Array,
      required: true
    },
    gridLayout: {
      type: String,
      "default": 'default',
      required: false
    },
    showLoadMore: {
      type: Boolean,
      "default": false,
      required: true
    },
    currentPaged: {
      type: Number,
      required: false
    },
    totalPages: {
      type: Number,
      required: false
    },
    usesPagination: {
      type: Boolean,
      "default": false
    },
    endOfResults: {
      type: Boolean,
      "default": false,
      required: true
    },
    searchButtonId: {
      type: String,
      required: true
    }
  },
  methods: {
    updateCurrentPaged: function updateCurrentPaged(newPagedNumber) {
      this.$emit('update-current-paged', newPagedNumber);
    }
  },
  components: {
    Default: _dc_post_grid_layout_cards_Default__WEBPACK_IMPORTED_MODULE_1__.default,
    LoadMore: _dc_post_grid_layout_ui_LoadMore__WEBPACK_IMPORTED_MODULE_2__.default,
    Pagination: _dc_post_grid_layout_ui_Pagination__WEBPACK_IMPORTED_MODULE_3__.default
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/Filters.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/Filters.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dc_post_grid_layout_Search_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dc-post-grid/layout/Search.vue */ "../../plugins/dc-post-grid/src/layout/Search.vue");
/* harmony import */ var _dc_post_grid_layout_filters_Dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dc-post-grid/layout/filters/Dropdown */ "../../plugins/dc-post-grid/src/layout/filters/Dropdown.vue");
/* harmony import */ var _dc_post_grid_mixins_Searchable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dc-post-grid/mixins/Searchable */ "../../plugins/dc-post-grid/src/mixins/Searchable.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mixins: [_dc_post_grid_mixins_Searchable__WEBPACK_IMPORTED_MODULE_2__.Searchable],
  data: function data() {
    return {
      openFilter: null,
      minHeight: 0
    };
  },
  props: {
    searchFormPlaceholder: {
      type: String,
      required: false,
      "default": ''
    },
    filterLabel: {
      type: String,
      required: false,
      "default": ''
    }
  },
  methods: {
    updateFilter: function updateFilter(name, newValue, usesMultiselect) {
      this.$emit('update-filter', name, newValue);
    },
    toggleFilter: function toggleFilter(name, targetDropdownId) {
      var _this = this;

      this.openFilter = this.openFilter === name ? null : name;

      if (this.openFilter === null) {
        this.$emit('update-post-grid-min-height', 0);
      } else {
        window.setTimeout(function () {
          var dropdownOptions = document.getElementById(targetDropdownId);

          _this.$emit('update-post-grid-min-height', dropdownOptions.clientHeight);
        }, 500);
      }
    }
  },
  components: {
    Dropdown: _dc_post_grid_layout_filters_Dropdown__WEBPACK_IMPORTED_MODULE_1__.default,
    Search: _dc_post_grid_layout_Search_vue__WEBPACK_IMPORTED_MODULE_0__.default
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/Search.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/Search.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    model: {
      type: Object,
      required: true
    },
    searchFormPlaceholder: {
      type: String,
      "default": '',
      required: true
    }
  },
  watch: {
    model: function model(newVal) {
      this.$emit('updateSearchTerm', newVal);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/cards/Default.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/cards/Default.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    id: {
      type: String | Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: false
    },
    label: {
      type: Object,
      required: false
    },
    image: {
      type: Object,
      required: false
    },
    date: {
      type: String,
      required: false
    }
  },
  computed: {
    labelClass: function labelClass() {
      if (typeof this.label === 'undefined' || typeof this.label["class"] === 'undefined') return '';
      return this.label["class"];
    }
  },
  methods: {
    goToPost: function goToPost() {
      window.location.href = this.url;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/filters/Dropdown.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/filters/Dropdown.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    open: {
      type: Boolean,
      required: true
    },
    initialSelection: {
      type: String,
      required: false
    },
    multiselect: {
      type: Boolean,
      required: true
    }
  },
  data: function data() {
    return {
      checkedValues: [],
      legendText: '',
      usesMultiselect: true
    };
  },
  computed: {
    dropdownId: function dropdownId() {
      return 'dropdown-' + this.name;
    }
  },
  methods: {
    toggle: function toggle() {
      this.$emit('toggle-filter', this.name, this.dropdownId);
    },
    choose: function choose(newValue, newLabel) {
      this.$emit('update-filter', this.name, newValue, this.usesMultiselect);

      if (this.usesMultiselect) {
        if (this.checkedValues.includes(newValue)) {
          var index = this.checkedValues.indexOf(newValue);

          if (index > -1) {
            this.checkedValues.splice(index, 1);
          }
        } else {
          this.checkedValues.push(newValue);
        }
      } else {
        this.legendText = newLabel;
        this.checkedValues = [newValue];
        this.toggle();
      }
    }
  },
  mounted: function mounted() {
    this.usesMultiselect = this.multiselect !== '0';

    if (!this.usesMultiselect) {
      for (var i = 0; i < this.options.length; i++) {
        if (this.options[i].value !== this.initialSelection) continue;
        this.legendText = this.options[i].label;
      }
    }

    if (this.legendText === '') {
      this.legendText = this.label;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/ui/LoadMore.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/ui/LoadMore.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dc_post_grid_mixins_Translatable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dc-post-grid/mixins/Translatable */ "../../plugins/dc-post-grid/src/mixins/Translatable.js");
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mixins: [_dc_post_grid_mixins_Translatable__WEBPACK_IMPORTED_MODULE_0__.Translatable],
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    searchButtonId: {
      type: String,
      required: true
    }
  },
  computed: {
    label: function label() {
      return this.loading ? this.dctxt('loading') : this.dctxt('loadMore');
    }
  },
  methods: {
    loadMore: function loadMore() {
      this.loading = true;
      var searchButton = document.querySelector('#' + this.searchButtonId);

      if (searchButton !== null) {
        searchButton.click();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/ui/Pagination.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/ui/Pagination.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dc_post_grid_mixins_Translatable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dc-post-grid/mixins/Translatable */ "../../plugins/dc-post-grid/src/mixins/Translatable.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mixins: [_dc_post_grid_mixins_Translatable__WEBPACK_IMPORTED_MODULE_0__.Translatable],
  props: {
    currentPaged: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    changePage: function changePage(direction) {
      var newCurrentPage = direction === 'previous' ? this.currentPaged - 1 : this.currentPaged + 1;
      if (newCurrentPage < 1 || newCurrentPage > this.totalPages) return;
      this.$emit('update-current-paged', newCurrentPage);
    }
  }
});

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/DcPostGrid.vue":
/*!************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/DcPostGrid.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DcPostGrid_vue_vue_type_template_id_bf12299c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DcPostGrid.vue?vue&type=template&id=bf12299c& */ "../../plugins/dc-post-grid/src/layout/DcPostGrid.vue?vue&type=template&id=bf12299c&");
/* harmony import */ var _DcPostGrid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DcPostGrid.vue?vue&type=script&lang=js& */ "../../plugins/dc-post-grid/src/layout/DcPostGrid.vue?vue&type=script&lang=js&");
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../themes/dcfiresafe/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _DcPostGrid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _DcPostGrid_vue_vue_type_template_id_bf12299c___WEBPACK_IMPORTED_MODULE_0__.render,
  _DcPostGrid_vue_vue_type_template_id_bf12299c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "plugins/dc-post-grid/src/layout/DcPostGrid.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/DcPostGridResults.vue":
/*!*******************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/DcPostGridResults.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DcPostGridResults_vue_vue_type_template_id_37467194___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DcPostGridResults.vue?vue&type=template&id=37467194& */ "../../plugins/dc-post-grid/src/layout/DcPostGridResults.vue?vue&type=template&id=37467194&");
/* harmony import */ var _DcPostGridResults_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DcPostGridResults.vue?vue&type=script&lang=js& */ "../../plugins/dc-post-grid/src/layout/DcPostGridResults.vue?vue&type=script&lang=js&");
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../themes/dcfiresafe/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _DcPostGridResults_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _DcPostGridResults_vue_vue_type_template_id_37467194___WEBPACK_IMPORTED_MODULE_0__.render,
  _DcPostGridResults_vue_vue_type_template_id_37467194___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "plugins/dc-post-grid/src/layout/DcPostGridResults.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/Filters.vue":
/*!*********************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/Filters.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Filters_vue_vue_type_template_id_038a93be___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Filters.vue?vue&type=template&id=038a93be& */ "../../plugins/dc-post-grid/src/layout/Filters.vue?vue&type=template&id=038a93be&");
/* harmony import */ var _Filters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Filters.vue?vue&type=script&lang=js& */ "../../plugins/dc-post-grid/src/layout/Filters.vue?vue&type=script&lang=js&");
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../themes/dcfiresafe/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Filters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Filters_vue_vue_type_template_id_038a93be___WEBPACK_IMPORTED_MODULE_0__.render,
  _Filters_vue_vue_type_template_id_038a93be___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "plugins/dc-post-grid/src/layout/Filters.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/Search.vue":
/*!********************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/Search.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Search_vue_vue_type_template_id_21b3d035___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Search.vue?vue&type=template&id=21b3d035& */ "../../plugins/dc-post-grid/src/layout/Search.vue?vue&type=template&id=21b3d035&");
/* harmony import */ var _Search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Search.vue?vue&type=script&lang=js& */ "../../plugins/dc-post-grid/src/layout/Search.vue?vue&type=script&lang=js&");
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../themes/dcfiresafe/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Search_vue_vue_type_template_id_21b3d035___WEBPACK_IMPORTED_MODULE_0__.render,
  _Search_vue_vue_type_template_id_21b3d035___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "plugins/dc-post-grid/src/layout/Search.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/cards/Default.vue":
/*!***************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/cards/Default.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Default_vue_vue_type_template_id_17a7f618___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Default.vue?vue&type=template&id=17a7f618& */ "../../plugins/dc-post-grid/src/layout/cards/Default.vue?vue&type=template&id=17a7f618&");
/* harmony import */ var _Default_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Default.vue?vue&type=script&lang=js& */ "../../plugins/dc-post-grid/src/layout/cards/Default.vue?vue&type=script&lang=js&");
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Default_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Default_vue_vue_type_template_id_17a7f618___WEBPACK_IMPORTED_MODULE_0__.render,
  _Default_vue_vue_type_template_id_17a7f618___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "plugins/dc-post-grid/src/layout/cards/Default.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/filters/Dropdown.vue":
/*!******************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/filters/Dropdown.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Dropdown_vue_vue_type_template_id_3357e172___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dropdown.vue?vue&type=template&id=3357e172& */ "../../plugins/dc-post-grid/src/layout/filters/Dropdown.vue?vue&type=template&id=3357e172&");
/* harmony import */ var _Dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dropdown.vue?vue&type=script&lang=js& */ "../../plugins/dc-post-grid/src/layout/filters/Dropdown.vue?vue&type=script&lang=js&");
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Dropdown_vue_vue_type_template_id_3357e172___WEBPACK_IMPORTED_MODULE_0__.render,
  _Dropdown_vue_vue_type_template_id_3357e172___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "plugins/dc-post-grid/src/layout/filters/Dropdown.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/ui/LoadMore.vue":
/*!*************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/ui/LoadMore.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LoadMore_vue_vue_type_template_id_686cd90e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoadMore.vue?vue&type=template&id=686cd90e& */ "../../plugins/dc-post-grid/src/layout/ui/LoadMore.vue?vue&type=template&id=686cd90e&");
/* harmony import */ var _LoadMore_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoadMore.vue?vue&type=script&lang=js& */ "../../plugins/dc-post-grid/src/layout/ui/LoadMore.vue?vue&type=script&lang=js&");
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _LoadMore_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _LoadMore_vue_vue_type_template_id_686cd90e___WEBPACK_IMPORTED_MODULE_0__.render,
  _LoadMore_vue_vue_type_template_id_686cd90e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "plugins/dc-post-grid/src/layout/ui/LoadMore.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/ui/Pagination.vue":
/*!***************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/ui/Pagination.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Pagination_vue_vue_type_template_id_060fd8b8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pagination.vue?vue&type=template&id=060fd8b8& */ "../../plugins/dc-post-grid/src/layout/ui/Pagination.vue?vue&type=template&id=060fd8b8&");
/* harmony import */ var _Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pagination.vue?vue&type=script&lang=js& */ "../../plugins/dc-post-grid/src/layout/ui/Pagination.vue?vue&type=script&lang=js&");
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_themes_dcfiresafe_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Pagination_vue_vue_type_template_id_060fd8b8___WEBPACK_IMPORTED_MODULE_0__.render,
  _Pagination_vue_vue_type_template_id_060fd8b8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "plugins/dc-post-grid/src/layout/ui/Pagination.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/DcPostGrid.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/DcPostGrid.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_DcPostGrid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../themes/dcfiresafe/node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./DcPostGrid.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/DcPostGrid.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_DcPostGrid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/DcPostGridResults.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/DcPostGridResults.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_DcPostGridResults_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../themes/dcfiresafe/node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./DcPostGridResults.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/DcPostGridResults.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_DcPostGridResults_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/Filters.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/Filters.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Filters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../themes/dcfiresafe/node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./Filters.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/Filters.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Filters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/Search.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/Search.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../themes/dcfiresafe/node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./Search.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/Search.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/cards/Default.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/cards/Default.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Default_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../themes/dcfiresafe/node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./Default.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/cards/Default.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Default_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/filters/Dropdown.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/filters/Dropdown.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../themes/dcfiresafe/node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./Dropdown.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/filters/Dropdown.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/ui/LoadMore.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/ui/LoadMore.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadMore_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../themes/dcfiresafe/node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./LoadMore.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/ui/LoadMore.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadMore_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/ui/Pagination.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/ui/Pagination.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../themes/dcfiresafe/node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./Pagination.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/ui/Pagination.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_themes_dcfiresafe_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/DcPostGrid.vue?vue&type=template&id=bf12299c&":
/*!*******************************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/DcPostGrid.vue?vue&type=template&id=bf12299c& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_DcPostGrid_vue_vue_type_template_id_bf12299c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_DcPostGrid_vue_vue_type_template_id_bf12299c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_DcPostGrid_vue_vue_type_template_id_bf12299c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../themes/dcfiresafe/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./DcPostGrid.vue?vue&type=template&id=bf12299c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/DcPostGrid.vue?vue&type=template&id=bf12299c&");


/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/DcPostGridResults.vue?vue&type=template&id=37467194&":
/*!**************************************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/DcPostGridResults.vue?vue&type=template&id=37467194& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_DcPostGridResults_vue_vue_type_template_id_37467194___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_DcPostGridResults_vue_vue_type_template_id_37467194___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_DcPostGridResults_vue_vue_type_template_id_37467194___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../themes/dcfiresafe/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./DcPostGridResults.vue?vue&type=template&id=37467194& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/DcPostGridResults.vue?vue&type=template&id=37467194&");


/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/Filters.vue?vue&type=template&id=038a93be&":
/*!****************************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/Filters.vue?vue&type=template&id=038a93be& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Filters_vue_vue_type_template_id_038a93be___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Filters_vue_vue_type_template_id_038a93be___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Filters_vue_vue_type_template_id_038a93be___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../themes/dcfiresafe/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./Filters.vue?vue&type=template&id=038a93be& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/Filters.vue?vue&type=template&id=038a93be&");


/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/Search.vue?vue&type=template&id=21b3d035&":
/*!***************************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/Search.vue?vue&type=template&id=21b3d035& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Search_vue_vue_type_template_id_21b3d035___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Search_vue_vue_type_template_id_21b3d035___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Search_vue_vue_type_template_id_21b3d035___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../themes/dcfiresafe/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./Search.vue?vue&type=template&id=21b3d035& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/Search.vue?vue&type=template&id=21b3d035&");


/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/cards/Default.vue?vue&type=template&id=17a7f618&":
/*!**********************************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/cards/Default.vue?vue&type=template&id=17a7f618& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Default_vue_vue_type_template_id_17a7f618___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Default_vue_vue_type_template_id_17a7f618___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Default_vue_vue_type_template_id_17a7f618___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./Default.vue?vue&type=template&id=17a7f618& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/cards/Default.vue?vue&type=template&id=17a7f618&");


/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/filters/Dropdown.vue?vue&type=template&id=3357e172&":
/*!*************************************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/filters/Dropdown.vue?vue&type=template&id=3357e172& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Dropdown_vue_vue_type_template_id_3357e172___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Dropdown_vue_vue_type_template_id_3357e172___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Dropdown_vue_vue_type_template_id_3357e172___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./Dropdown.vue?vue&type=template&id=3357e172& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/filters/Dropdown.vue?vue&type=template&id=3357e172&");


/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/ui/LoadMore.vue?vue&type=template&id=686cd90e&":
/*!********************************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/ui/LoadMore.vue?vue&type=template&id=686cd90e& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadMore_vue_vue_type_template_id_686cd90e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadMore_vue_vue_type_template_id_686cd90e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadMore_vue_vue_type_template_id_686cd90e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./LoadMore.vue?vue&type=template&id=686cd90e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/ui/LoadMore.vue?vue&type=template&id=686cd90e&");


/***/ }),

/***/ "../../plugins/dc-post-grid/src/layout/ui/Pagination.vue?vue&type=template&id=060fd8b8&":
/*!**********************************************************************************************!*\
  !*** ../../plugins/dc-post-grid/src/layout/ui/Pagination.vue?vue&type=template&id=060fd8b8& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_060fd8b8___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_060fd8b8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _themes_dcfiresafe_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_themes_dcfiresafe_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_060fd8b8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../themes/dcfiresafe/node_modules/vue-loader/lib/index.js??vue-loader-options!./Pagination.vue?vue&type=template&id=060fd8b8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/ui/Pagination.vue?vue&type=template&id=060fd8b8&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/DcPostGrid.vue?vue&type=template&id=bf12299c&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/DcPostGrid.vue?vue&type=template&id=bf12299c& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { ref: "postGrid", staticClass: "dc-post-grid-component-wrapper" },
    [
      _c(
        "header",
        {
          staticClass: "dc-post-grid-header",
          attrs: { slot: "dc-post-grid-header" },
          slot: "dc-post-grid-header"
        },
        [
          _vm.title || _vm.subtitle
            ? _c(
                "div",
                {
                  staticClass: "dc-post-grid-top-left",
                  attrs: { slot: "dc-post-grid-top-left" },
                  slot: "dc-post-grid-top-left"
                },
                [
                  _vm.title
                    ? _c("h2", { staticClass: "section-title-default" }, [
                        _vm._v(_vm._s(_vm.title))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.subtitle
                    ? _c("h3", { staticClass: "section-subtitle-default" }, [
                        _vm._v(_vm._s(_vm.subtitle))
                      ])
                    : _vm._e()
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.filters || _vm.search_form_placeholder
            ? _c(
                "div",
                {
                  staticClass: "dc-post-grid-top-right",
                  attrs: { slot: "dc-post-grid-top-right" },
                  slot: "dc-post-grid-top-right"
                },
                [
                  _vm.link && typeof _vm.link.url !== "undefined"
                    ? _c(
                        "a",
                        {
                          class: _vm.link.class || "",
                          attrs: { href: _vm.link.url, target: _vm.link.target }
                        },
                        [_vm._v(_vm._s(_vm.link.title))]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.currentPaged !== null
                    ? _c("Filters", {
                        attrs: {
                          filterLabel: _vm.label_before_filters,
                          filters: _vm.filters,
                          initialModel: _vm.initial_model,
                          currentPaged: _vm.currentPaged,
                          searchButtonId: _vm.searchButtonId,
                          searchFormPlaceholder: _vm.search_form_placeholder,
                          gridSettings: _vm.grid_settings
                        },
                        on: {
                          results: _vm.updateResults,
                          searching: _vm.triggerLoading,
                          "update-total-pages": _vm.updateTotalPages,
                          "update-current-paged": _vm.updateCurrentPaged,
                          "update-post-grid-min-height": _vm.updateMinHeight
                        }
                      })
                    : _vm._e()
                ],
                1
              )
            : _vm._e()
        ]
      ),
      _vm._v(" "),
      _vm.results
        ? _c(
            "div",
            {
              ref: "resultsSection",
              class: [
                "dc-post-grid-results",
                "uses-no-image-card-fallbacks",
                _vm.columnsClass
              ],
              attrs: { slot: "dc-post-grid-results" },
              slot: "dc-post-grid-results"
            },
            [
              _vm.currentPaged !== null
                ? _c("DcPostGridResults", {
                    attrs: {
                      results: _vm.results,
                      loading: _vm.loading,
                      gridLayout: _vm.grid_layout,
                      searchButtonId: _vm.searchButtonId,
                      showLoadMore: _vm.showLoadMore,
                      currentPaged: _vm.currentPaged,
                      totalPages: _vm.totalPages,
                      usesPagination: _vm.usesPagination,
                      endOfResults: _vm.endOfResults
                    },
                    on: {
                      "update-current-paged": _vm.updateCurrentPaged,
                      "load-more": _vm.loadMore
                    }
                  })
                : _vm._e()
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c("footer", {
        staticClass: "dc-post-grid-footer",
        attrs: { slot: "dc-post-grid-footer" },
        slot: "dc-post-grid-footer"
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/DcPostGridResults.vue?vue&type=template&id=37467194&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/DcPostGridResults.vue?vue&type=template&id=37467194& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { ref: "resultsWrapper", staticClass: "grid-container full" },
    [
      _c(
        "div",
        {
          ref: "resultsWrapperInner",
          class: [
            "grid-x",
            "grid-margin-x",
            "grid-margin-y",
            "initialized",
            "dc-post-grid-results-inner",
            {
              loading: _vm.loading
            }
          ],
          attrs: { "aria-live": "polite" }
        },
        [
          _vm.results.length === 0
            ? _c("p", [_vm._v(_vm._s(_vm.dctxt("noResultsMessage")))])
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.results, function(result, index) {
            return _c(
              "div",
              {
                key: "result-" + index,
                ref: "resultsWrapperInnerAlt",
                refInFor: true,
                class: ["cell"]
              },
              [
                _c("default", {
                  style: { zIndex: _vm.results.length - index },
                  attrs: {
                    id: result.id,
                    title: result.title,
                    excerpt: result.excerpt,
                    url: result.url,
                    image: result.image,
                    label: result.label
                  }
                })
              ],
              1
            )
          })
        ],
        2
      ),
      _vm._v(" "),
      _vm.showLoadMore && !_vm.endOfResults && !_vm.usesPagination
        ? _c("LoadMore", {
            attrs: { loading: _vm.loading, searchButtonId: _vm.searchButtonId },
            on: {
              click: function($event) {
                $event.stopPropagation()
                $event.preventDefault()
                return _vm.loadMore.apply(null, arguments)
              }
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.showLoadMore && _vm.usesPagination
        ? _c("Pagination", {
            attrs: {
              loading: _vm.loading,
              currentPaged: _vm.currentPaged,
              totalPages: _vm.totalPages
            },
            on: {
              "update-current-paged": _vm.updateCurrentPaged,
              click: function($event) {
                $event.stopPropagation()
                $event.preventDefault()
                return _vm.loadMore.apply(null, arguments)
              }
            }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/Filters.vue?vue&type=template&id=038a93be&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/Filters.vue?vue&type=template&id=038a93be& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { ref: "filtersWrapper", staticClass: "dc-post-grid-filters-wrapper" },
    [
      _vm.searchFormPlaceholder
        ? _c(
            "div",
            { class: ["dc-post-grid-search-wrapper"] },
            [
              _c("Search", {
                attrs: {
                  model: _vm.form.s,
                  searchFormPlaceholder: _vm.searchFormPlaceholder
                },
                on: { updateSearchTerm: _vm.updateSearchTerm }
              })
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.filters
        ? _c(
            "div",
            { class: ["dc-post-grid-dropdowns-wrapper"] },
            [
              _vm.filterLabel
                ? _c("h3", [_vm._v(_vm._s(_vm.filterLabel))])
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.filters, function(filter) {
                return _c(
                  "div",
                  { key: "filter-" + filter.name },
                  [
                    filter.type === "default"
                      ? _c("Dropdown", {
                          attrs: {
                            label: filter.label,
                            name: filter.name,
                            options: filter.options,
                            multiselect: filter.multiselect || true,
                            initialSelection: filter.initial_selection,
                            open: filter.name === _vm.openFilter
                          },
                          on: {
                            "toggle-filter": _vm.toggleFilter,
                            "update-filter": _vm.updateAndSearch
                          }
                        })
                      : _vm._e()
                  ],
                  1
                )
              })
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _c("input", {
        class: ["screen-reader-text", { loading: _vm.loading }],
        attrs: { id: _vm.searchButtonId, type: "submit", tabindex: "-1" },
        domProps: { value: _vm.Search },
        on: {
          click: function($event) {
            $event.stopPropagation()
            $event.preventDefault()
            return _vm.search.apply(null, arguments)
          }
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/Search.vue?vue&type=template&id=21b3d035&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/Search.vue?vue&type=template&id=21b3d035& ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { ref: "searchWrapper", class: ["dc-post-grid-search-wrapper"] },
    [
      _c("div", { class: ["dc-post-grid-input-wrapper"] }, [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.model,
              expression: "model"
            }
          ],
          class: ["dc-post-grid-search-input"],
          attrs: {
            name: "dc-post-grid-search",
            placeholder: _vm.searchFormPlaceholder,
            id: _vm.dc - _vm.post - _vm.grid - _vm.search - _vm.input
          },
          domProps: { value: _vm.model },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.model = $event.target.value
            }
          }
        })
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/cards/Default.vue?vue&type=template&id=17a7f618&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/cards/Default.vue?vue&type=template&id=17a7f618& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "article",
    {
      class: [
        _vm.labelClass,
        "dc-post-grid-card default-card post-summary default"
      ],
      attrs: { id: _vm.id },
      on: {
        click: function($event) {
          $event.stopPropagation()
          $event.preventDefault()
          return _vm.goToPost()
        }
      }
    },
    [
      _c("div", { staticClass: "dc-post-grid-card-inner post-summary-inner" }, [
        _c(
          "div",
          {
            class: [
              "image-wrapper",
              {
                "no-image": !_vm.image
              }
            ]
          },
          [
            _vm.image
              ? _c("img", {
                  attrs: {
                    src: _vm.image.src,
                    srcset: _vm.image.srcset,
                    alt: _vm.image.alt
                  }
                })
              : _vm._e()
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          { ref: "cardContentWrapper", staticClass: "content-wrapper" },
          [
            _c("div", {
              ref: "cardContentHoverOverlay",
              staticClass: "content-hover-overlay"
            }),
            _vm._v(" "),
            _vm.date
              ? _c("span", { staticClass: "post-date" }, [
                  _vm._v(_vm._s(_vm.date))
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.label && typeof _vm.label.url !== "undefined"
              ? _c(
                  "a",
                  {
                    staticClass: "post-summary-category",
                    attrs: { href: _vm.label.url }
                  },
                  [_vm._v(_vm._s(_vm.label.title))]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.label && typeof _vm.label.url === "undefined"
              ? _c("span", { staticClass: "post-summary-category" }, [
                  _vm._v(_vm._s(_vm.label.title))
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.title
              ? _c("h1", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(_vm.title))
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.excerpt
              ? _c("div", {
                  staticClass: "card-excerpt",
                  domProps: { innerHTML: _vm._s(_vm.excerpt) }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.url
              ? _c(
                  "a",
                  {
                    ref: "postLink",
                    staticClass: "link read-more-link",
                    attrs: { href: _vm.url }
                  },
                  [
                    _c("span", { staticClass: "screen-reader-text" }, [
                      _vm._v("Read more")
                    ])
                  ]
                )
              : _vm._e()
          ]
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/filters/Dropdown.vue?vue&type=template&id=3357e172&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/filters/Dropdown.vue?vue&type=template&id=3357e172& ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: [
        "field-wrapper",
        "dropdown",
        {
          open: _vm.open
        }
      ]
    },
    [
      _c("fieldset", { ref: "dropdownWrapper" }, [
        _c(
          "button",
          {
            ref: "dropdownToggle",
            class: ["dropdown-toggle", "dc-button"],
            attrs: {
              "aria-controls": _vm.dropdownId,
              "aria-expanded": _vm.open
            },
            on: {
              click: function($event) {
                $event.stopPropagation()
                $event.preventDefault()
                return _vm.toggle.apply(null, arguments)
              }
            }
          },
          [
            _c("legend", { attrs: { for: _vm.name } }, [
              _vm._v(_vm._s(_vm.legendText))
            ]),
            _vm._v(" "),
            _vm._m(0)
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            ref: "dropdownOptions",
            class: [
              "dropdown-wrapper",
              {
                open: _vm.open
              }
            ],
            attrs: { id: _vm.dropdownId, "aria-hidden": !_vm.open }
          },
          _vm._l(_vm.options, function(option, index) {
            return _c("div", { key: _vm.name + "-option-" + index }, [
              _c("input", {
                attrs: {
                  id: _vm.name + "-option-" + index,
                  type: "checkbox",
                  name: _vm.name
                },
                domProps: { value: option.value },
                on: {
                  click: function($event) {
                    return _vm.choose(option.value, option.label)
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "label",
                {
                  class: [
                    {
                      selected: _vm.checkedValues.includes(option.value)
                    }
                  ],
                  attrs: { for: _vm.name + "-option-" + index }
                },
                [_vm._v(_vm._s(option.label))]
              )
            ])
          }),
          0
        )
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "menu-dots" }, [
      _c("span", { staticClass: "dot top" }),
      _vm._v(" "),
      _c("span", { staticClass: "dot middle" }),
      _vm._v(" "),
      _c("span", { staticClass: "dot bottom" })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/ui/LoadMore.vue?vue&type=template&id=686cd90e&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/ui/LoadMore.vue?vue&type=template&id=686cd90e& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    {
      class: ["dc-post-grid-load-more", "dc-button", { loading: _vm.loading }],
      on: {
        click: function($event) {
          $event.stopPropagation()
          $event.preventDefault()
          return _vm.loadMore.apply(null, arguments)
        }
      }
    },
    [_vm._v(_vm._s(_vm.label))]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/ui/Pagination.vue?vue&type=template&id=060fd8b8&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!../../plugins/dc-post-grid/src/layout/ui/Pagination.vue?vue&type=template&id=060fd8b8& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "dc-post-grid-pagination" }, [
    _c("span", { staticClass: "dc-post-grid-current-page" }, [
      _vm._v(_vm._s(_vm.currentPaged) + " / " + _vm._s(_vm.totalPages))
    ]),
    _vm._v(" "),
    _c(
      "button",
      {
        class: [
          "dc-post-grid-previous",
          "dc-button",
          {
            disabled: _vm.currentPaged <= 1
          }
        ],
        attrs: { "aria-disabled": _vm.currentPaged <= 1 },
        on: {
          click: function($event) {
            $event.stopPropagation()
            $event.preventDefault()
            return _vm.changePage("previous")
          }
        }
      },
      [
        _c("span", { staticClass: "dc-button-text" }, [
          _vm._v(_vm._s(_vm.dctxt("previous")))
        ])
      ]
    ),
    _vm._v(" "),
    _c(
      "button",
      {
        class: [
          "dc-post-grid-next",
          "dc-button",
          {
            disabled: _vm.currentPaged >= _vm.totalPages
          }
        ],
        attrs: { "aria-disabled": _vm.currentPaged >= _vm.totalPages },
        on: {
          click: function($event) {
            $event.stopPropagation()
            $event.preventDefault()
            return _vm.changePage("next")
          }
        }
      },
      [
        _c("span", { staticClass: "dc-button-text" }, [
          _vm._v(_vm._s(_vm.dctxt("next")))
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************************************!*\
  !*** ./src/blocks/dc-post-grid/assets/dc-post-grid.js ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dc_post_grid_layout_DcPostGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dc-post-grid/layout/DcPostGrid */ "../../plugins/dc-post-grid/src/layout/DcPostGrid.vue");

var dcPostGrids = document.querySelectorAll('.dc-post-grid-component-wrapper');

if (dcPostGrids.length) {
  var _loop = function _loop(i) {
    var dcPostGridId = dcPostGrids[i].id;
    var dcPostGridBlockId = dcPostGridId.replace('dc_post_grid_', '');
    var dcPostGridData = dcpgData[dcPostGridBlockId];
    new Vue({
      render: function render(h) {
        return h(_dc_post_grid_layout_DcPostGrid__WEBPACK_IMPORTED_MODULE_0__.default, {
          props: dcPostGridData
        });
      }
    }).$mount('#' + dcPostGridId);
  };

  for (var i = 0; i < dcPostGrids.length; i++) {
    _loop(i);
  }
}
})();

/******/ })()
;
//# sourceMappingURL=dc-post-grid.js.map