"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.array.sort.js");
var _react = _interopRequireWildcard(require("react"));
require("./styles.scss");
var _ramda = require("ramda");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 *
 * @name easy-react-table-component
 * @description Create a React Table Component
 *
 * @author Johan Hauteville
 * @version 1.1.1
 *
 * @installation
 * // Installation via npm
 * // npm install easy-react-table-component
 *
 * // Import in a React file
 * // import Table from 'easy-react-table-component';
 *
 * @component
 * @param {JSON} data
 * @param {JSON} listToDisplay For each Object : "dataName" represents the data and "displayName" is the name displayed. ex: {dataName: "firstName", displayName: "First Name"}
 * @param {String} tableTitle represents the table title name
 * @param {Boolean} researchBar true: display the research input. false: hide the research input
 * @param {String} classHeader used for styling the header
 * @param {String} classHeaderTitle used for styling the header title
 * @param {String} classTableContainer used for styling the table container
 * @param {String} classTableHeader used for styling the table header
 * @param {String} classTableContent used for styling the table content
 * @param {String} classTablePagination used for styling the table pagination
 * @param {String} classTableComponent used for styling the table component
 * @param {Number} rowPagination represent the number of row per page (10 by default)
 * @param {String} labelPerPage represent the displayed name of item per page ("Items per page" by default)
 * @returns {JSX.Element} Table component
 */

function Table(_ref) {
  let {
    data,
    listToDisplay,
    tableTitle,
    researchBar = true,
    classHeader,
    classHeaderTitle,
    classTableContainer,
    classTableHeader,
    classTableContent,
    classTablePagination,
    classTableComponent,
    rowPagination,
    labelPerPage
  } = _ref;
  // Function to flatten datas
  function flattenObject(obj) {
    return (0, _ramda.mergeAll)((0, _ramda.filter)((0, _ramda.is)(Object), (0, _ramda.toPairs)(obj)).map(_ref2 => {
      let [key, value] = _ref2;
      return (0, _ramda.is)(Object, value) ? flattenObject(value) : {
        [key]: value
      };
    }));
  }
  // USESTATES
  const [itemPerPage, setItemPerPage] = (0, _react.useState)(rowPagination ? rowPagination : 10);
  let rawData = [];
  data && data.forEach(profile => {
    rawData.push(flattenObject(profile));
  });
  const flattenData = rawData;
  const [arrayOfData, setArrayOfData] = (0, _react.useState)(flattenData.length > 0 ? flattenData : null);
  const [currentPage, setCurrentPage] = (0, _react.useState)(1);
  const [sortColumn, setSortColumn] = (0, _react.useState)(null);
  const [sortOrder, setSortOrder] = (0, _react.useState)("init");

  // USEMEMOS
  const indexOfLastItem = (0, _react.useMemo)(() => {
    return currentPage * itemPerPage;
  }, [currentPage, itemPerPage]);
  const indexOfFirstItem = (0, _react.useMemo)(() => {
    return indexOfLastItem - itemPerPage;
  }, [itemPerPage, indexOfLastItem]);
  const maxPageOfItems = (0, _react.useMemo)(() => {
    return arrayOfData ? parseInt(arrayOfData.length / itemPerPage) : null;
  }, [itemPerPage, arrayOfData]);
  const arrayOfDataToDisplay = (0, _react.useMemo)(() => {
    return arrayOfData ? arrayOfData.slice(indexOfFirstItem, indexOfLastItem) : null;
  }, [arrayOfData, indexOfFirstItem, indexOfLastItem]);

  // RESEARCH FUNCTION
  const handleSearchBar = e => {
    const searchTerm = e.currentTarget.value.toLowerCase();
    if (e.currentTarget.value.length > 1) {
      const filteredData = arrayOfData.filter(row => {
        return listToDisplay.some(item => {
          const cellValue = String(row[item.dataName]).toLowerCase();
          return cellValue.includes(searchTerm);
        });
      });
      setArrayOfData(filteredData);
    } else {
      setArrayOfData(flattenData);
    }
    setCurrentPage(1);
  };

  /**
   * Used to sort data.
   *
   * @param column The column that will be used to sort the entire data set of the table
   * @return sortedData - Sorted Data will be set with "setArrayOfData"
   */
  const handleSort = (0, _react.useCallback)(column => {
    // If column already sorted, order will be changed
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If it's a new column, sort will be ascendant
      setSortColumn(column);
      setSortOrder("asc");
    }
    // Datas will be sorted thanks to the column and the order.
    const sortedData = [...arrayOfData].sort((a, b) => {
      const aValue = a[column] || "";
      const bValue = b[column] || "";
      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
    setArrayOfData(sortedData);
  }, [sortColumn, sortOrder, arrayOfData]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classTableContainer ? "table__container ".concat(classTableContainer) : "table__container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classHeader ? "table__header ".concat(classHeader) : "table__header"
  }, tableTitle && /*#__PURE__*/_react.default.createElement("h3", {
    className: classHeaderTitle ? classHeaderTitle : ""
  }, tableTitle), arrayOfData && researchBar === true && /*#__PURE__*/_react.default.createElement("div", {
    className: "table__header--research-input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    onChange: handleSearchBar
  }), /*#__PURE__*/_react.default.createElement("i", {
    className: "fa-solid fa-magnifying-glass"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: classTableContent ? "table-content ".concat(classTableContent) : "table-content"
  }, /*#__PURE__*/_react.default.createElement("table", {
    className: classTableComponent ? "table-component ".concat(classTableComponent) : "table-component"
  }, /*#__PURE__*/_react.default.createElement("thead", {
    className: classTableHeader ? "table-component__header ".concat(classTableHeader) : "table-component__header"
  }, /*#__PURE__*/_react.default.createElement("tr", null, listToDisplay === null || listToDisplay === void 0 ? void 0 : listToDisplay.map((item, index) => {
    return /*#__PURE__*/_react.default.createElement("th", {
      key: "header-" + index + item.dataName
    }, item.displayName, /*#__PURE__*/_react.default.createElement("i", {
      className: sortColumn === item.dataName ? sortOrder === "asc" ? "fa-solid fa-arrow-up-wide-short" : "fa-solid fa-arrow-down-short-wide " : "fa-solid fa-arrows-up-down",
      onClick: () => handleSort(item.dataName)
    }));
  }))), arrayOfDataToDisplay && /*#__PURE__*/_react.default.createElement("tbody", null, arrayOfDataToDisplay.map((employee, index) => {
    return /*#__PURE__*/_react.default.createElement("tr", {
      key: "data-row-" + index,
      className: "table-component__row"
    }, listToDisplay === null || listToDisplay === void 0 ? void 0 : listToDisplay.map(item => {
      return /*#__PURE__*/_react.default.createElement("td", {
        key: "data-" + index + "-" + item.dataName + "-" + employee[item.displayName]
      }, employee[item.dataName]);
    }));
  }))), !arrayOfDataToDisplay && /*#__PURE__*/_react.default.createElement("div", {
    className: "table__notification"
  }, "No data available")), arrayOfDataToDisplay && /*#__PURE__*/_react.default.createElement("div", {
    className: classTablePagination ? "table__pagination ".concat(classTablePagination) : "table__pagination"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa-solid fa-arrow-rotate-right",
    onClick: () => {
      setArrayOfData(flattenData);
      setItemPerPage(rowPagination ? rowPagination : 10);
      setCurrentPage(1);
    }
  }), /*#__PURE__*/_react.default.createElement("select", {
    className: "table__pagination--select-page",
    value: currentPage,
    onChange: e => setCurrentPage(e.target.value)
  }, Array.from({
    length: maxPageOfItems + 1
  }).map((_, index) => {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: "page-" + (index + 1)
    }, index + 1);
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "table__pagination--main-buttons"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: currentPage === 1 ? "fa-solid fa-angles-left desactivated" : "fa-solid fa-angles-left",
    onClick: () => setCurrentPage(1)
  }), /*#__PURE__*/_react.default.createElement("i", {
    className: currentPage === 1 ? "fa-solid fa-chevron-left desactivated" : "fa-solid fa-chevron-left",
    onClick: () => setCurrentPage(currentPage === 1 ? 1 : parseInt(currentPage) - 1)
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "table__pagination--page-notification"
  }, indexOfFirstItem + 1, " to", " ", indexOfLastItem > arrayOfData.length ? arrayOfData.length : indexOfLastItem, " ", "of ", arrayOfData.length), /*#__PURE__*/_react.default.createElement("i", {
    className: indexOfLastItem > arrayOfData.length ? "fa-solid fa-chevron-right desactivated" : "fa-solid fa-chevron-right",
    onClick: () => setCurrentPage(indexOfLastItem > arrayOfData.length ? currentPage : parseInt(currentPage) + 1)
  }), /*#__PURE__*/_react.default.createElement("i", {
    className: indexOfLastItem > arrayOfData.length ? "fa-solid fa-angles-right desactivated" : "fa-solid fa-angles-right",
    onClick: () => setCurrentPage(maxPageOfItems + 1)
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "table__pagination--items-per-page"
  }, /*#__PURE__*/_react.default.createElement("p", null, labelPerPage ? labelPerPage : "Items", " per page"), /*#__PURE__*/_react.default.createElement("select", {
    value: itemPerPage,
    onChange: e => {
      setItemPerPage(e.currentTarget.value);
      setCurrentPage(1);
    }
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "10"
  }, "10"), /*#__PURE__*/_react.default.createElement("option", {
    value: "20"
  }, "20"), /*#__PURE__*/_react.default.createElement("option", {
    value: "50"
  }, "50"), /*#__PURE__*/_react.default.createElement("option", {
    value: "100"
  }, "100")))));
}
var _default = exports.default = Table;