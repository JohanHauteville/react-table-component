/**
 *  Represents a React Table Component
 *
 *  @author Johan Hauteville
 *  @version 1.0
 */

import { useState, useMemo, useCallback } from "react";
import "./styles.scss";

function Table({
  data,
  listToDisplay,
  tableTitle,
  classHeader,
  classHeaderTitle,
  classTableContainer,
  classTableHeader,
  classTableContent,
  classTablePagination,
  classTableComponent,
  rowPagination,
  labelPerPage,
}) {
  // USESTATES
  const [itemPerPage, setItemPerPage] = useState(
    rowPagination ? rowPagination : 10
  );
  const [arrayOfData, setArrayOfData] = useState(data ? data : null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("init");

  // USEMEMOS
  const indexOfLastItem = useMemo(() => {
    return currentPage * itemPerPage;
  }, [currentPage, itemPerPage]);
  const indexOfFirstItem = useMemo(() => {
    return indexOfLastItem - itemPerPage;
  }, [itemPerPage, indexOfLastItem]);
  const maxPageOfItems = useMemo(() => {
    return arrayOfData ? parseInt(arrayOfData.length / itemPerPage) : null;
  }, [itemPerPage, arrayOfData]);
  const arrayOfDataToDisplay = useMemo(() => {
    return arrayOfData
      ? arrayOfData.slice(indexOfFirstItem, indexOfLastItem)
      : null;
  }, [arrayOfData, indexOfFirstItem, indexOfLastItem]);

  // RESEARCH FUNCTION
  const handleSearchBar = (e) => {
    const searchTerm = e.currentTarget.value.toLowerCase();
    if (e.currentTarget.value.length > 1) {
      const filteredData = arrayOfData.filter((row) => {
        return listToDisplay.some((item) => {
          const cellValue = String(row[item.dataName]).toLowerCase();
          return cellValue.includes(searchTerm);
        });
      });
      setArrayOfData(filteredData);
    } else {
      setArrayOfData(data);
    }
    setCurrentPage(1);
  };

  /**
   * Used to sort data.
   *
   * @param column The column that will be used to sort the entire data set of the table
   * @return sortedData - Sorted Data will be set with "setArrayOfData"
   */
  const handleSort = useCallback(
    (column) => {
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
    },
    [sortColumn, sortOrder, arrayOfData]
  );

  return (
    <div
      className={
        classTableContainer
          ? `table__container ${classTableContainer}`
          : "table__container"
      }
    >
      {console.log("Rendu Table component")}
      {/* COMPONENT HEADER */}
      <div
        className={
          classHeader ? `table__header ${classHeader}` : "table__header"
        }
      >
        {/* TITLE */}
        {tableTitle && (
          <h3 className={classHeaderTitle ? classHeaderTitle : ""}>
            {tableTitle}
          </h3>
        )}

        {/* RESEARCH BAR */}
        <div className="table__header--research-input">
          <input type="text" onChange={handleSearchBar} />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className={
          classTableContent
            ? `table-content ${classTableContent}`
            : "table-content"
        }
      >
        {/* TABLE */}
        <table
          className={
            classTableComponent
              ? `table-component ${classTableComponent}`
              : "table-component"
          }
        >
          {/* TABLE HEADER */}
          <thead
            className={
              classTableHeader
                ? `table-component__header ${classTableHeader}`
                : "table-component__header"
            }
          >
            <tr>
              {listToDisplay?.map((item, index) => {
                return (
                  <th key={"header-" + index + item.dataName}>
                    {item.displayName}
                    <i
                      className={
                        sortColumn === item.dataName
                          ? sortOrder === "asc"
                            ? "fa-solid fa-arrow-up-wide-short"
                            : "fa-solid fa-arrow-down-short-wide "
                          : "fa-solid fa-arrows-up-down"
                      }
                      onClick={() => handleSort(item.dataName)}
                    ></i>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* TABLE CONTENT */}
          {arrayOfDataToDisplay && (
            <tbody>
              {arrayOfDataToDisplay.map((employee, index) => {
                return (
                  <tr
                    key={"data-row-" + index}
                    className="table-component__row"
                  >
                    {listToDisplay?.map((item) => {
                      return (
                        <td
                          key={
                            "data-" +
                            index +
                            "-" +
                            item.dataName +
                            "-" +
                            employee[item.displayName]
                          }
                        >
                          {employee[item.dataName]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>

        {/* MESSAGE IF NO DATA */}
        {arrayOfDataToDisplay.length <= 0 && (
          <div className="table__notification">No data available</div>
        )}
      </div>

      {/* PAGINATION */}
      {arrayOfDataToDisplay && (
        <div
          className={
            classTablePagination
              ? `table__pagination ${classTablePagination}`
              : "table__pagination"
          }
        >
          {/* BUTTON RESET */}
          <i
            className="fa-solid fa-arrow-rotate-right"
            onClick={() => {
              setArrayOfData(data);
              setItemPerPage(rowPagination ? rowPagination : 10);
              setCurrentPage(1);
            }}
          ></i>

          {/* MAIN NAVIGATION BUTTON */}
          <div className="table__pagination--main-buttons">
            {/* SELECT PAGE */}
            <select
              value={currentPage}
              // onChange={(e) => handleNavigation("SET", e.target.value)
              onChange={(e) => setCurrentPage(e.target.value)}
            >
              {Array.from({ length: maxPageOfItems + 1 }).map((_, index) => {
                return <option key={"page-" + (index + 1)}>{index + 1}</option>;
              })}
            </select>

            {/* BUTTON FIRST PAGE */}
            <i
              className={
                currentPage === 1
                  ? "fa-solid fa-angles-left desactivated"
                  : "fa-solid fa-angles-left"
              }
              onClick={() => setCurrentPage(1)}
            ></i>

            {/* BUTTON PREVIOUS PAGE */}
            <i
              className={
                currentPage === 1
                  ? "fa-solid fa-chevron-left desactivated"
                  : "fa-solid fa-chevron-left"
              }
              onClick={() =>
                setCurrentPage(
                  currentPage === 1 ? 1 : parseInt(currentPage) - 1
                )
              }
            ></i>

            {/* ACTUAL PAGE */}
            <div>
              {indexOfFirstItem + 1} to{" "}
              {indexOfLastItem > arrayOfData.length
                ? arrayOfData.length
                : indexOfLastItem}{" "}
              of {arrayOfData.length}
            </div>

            {/* BUTTON NEXT PAGE */}
            <i
              className={
                indexOfLastItem > arrayOfData.length
                  ? "fa-solid fa-chevron-right desactivated"
                  : "fa-solid fa-chevron-right"
              }
              onClick={() =>
                setCurrentPage(
                  indexOfLastItem > arrayOfData.length
                    ? currentPage
                    : parseInt(currentPage) + 1
                )
              }
            ></i>

            {/* BUTTON LAST PAGE */}
            <i
              className={
                indexOfLastItem > arrayOfData.length
                  ? "fa-solid fa-angles-right desactivated"
                  : "fa-solid fa-angles-right"
              }
              onClick={() => setCurrentPage(maxPageOfItems + 1)}
            ></i>
          </div>

          {/* SELECT ITEMS PER PAGE */}
          <div className="table__pagination--items-per-page">
            <p>{labelPerPage ? labelPerPage : "Items"} per page</p>
            <select
              value={itemPerPage}
              onChange={(e) => {
                setItemPerPage(e.currentTarget.value);
                setCurrentPage(1);
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
