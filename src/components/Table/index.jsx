import { useEffect, useState, useCallback, useMemo } from "react";
import "./styles.scss";

function Table({
  data,
  listToDisplay,
  tableTitle,
  fontHeaderColor,
  primaryColor,
  classHeader,
  rowPagination,
  labelPerPage,
}) {
  const [itemPerPage, setItemPerPage] = useState(
    rowPagination ? rowPagination : 10
  );
  const [arrayOfData, setArrayOfData] = useState(data ? data : null);

  const [currentPage, setCurrentPage] = useState(1);
  const [indexOfLastItem, setIndexOfLastItem] = useState(0);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);
  const [maxPageOfItems, setMaxPageOfItems] = useState(
    data ? parseInt(data.length / itemPerPage) : null
  );
  // const [arrayOfDataToDisplay, setArrayOfDataToDisplay] = useState(
  //   arrayOfData ? arrayOfData.slice(indexOfFirstItem, indexOfLastItem) : null
  // );

  const arrayOfDataToDisplay = useMemo(() => {
    return arrayOfData
      ? arrayOfData.slice(indexOfFirstItem, indexOfLastItem)
      : null;
  }, [arrayOfData, indexOfFirstItem, indexOfLastItem]);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("init");

  const handleSearchBar = (e) => {
    let temporaryArray = [];
    if (e.currentTarget.value.length > 3) {
      console.log(e.currentTarget.value);
      // arrayOfData.map((row) => console.log(row));
      // temporaryArray = arrayOfData.filter((row) => row[0] === e.currentTarget);

      console.log(temporaryArray);
    }
  };

  const handleSort = (column) => {
    // Si la colonne est déjà triée, changez l'ordre de tri
    console.log(sortOrder);

    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      console.log(sortOrder);
    } else {
      // Si c'est une nouvelle colonne, triez par ordre ascendant
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleDisplay = () => {
    setMaxPageOfItems(parseInt(arrayOfData.length / itemPerPage));
    setIndexOfLastItem(currentPage * itemPerPage);
    setIndexOfFirstItem(indexOfLastItem - itemPerPage);
    // setArrayOfDataToDisplay(
    //   arrayOfData.slice(indexOfFirstItem, indexOfLastItem)
    // );
  };

  const refreshArray = useCallback(
    (reset) => {
      // handleDisplay();
      console.log("Call refreshArray");
      reset && setArrayOfData(data);
      setMaxPageOfItems(parseInt(arrayOfData.length / itemPerPage));
      setIndexOfLastItem(currentPage * itemPerPage);
      setIndexOfFirstItem(indexOfLastItem - itemPerPage);
      // setArrayOfDataToDisplay(
      //   arrayOfData.slice(indexOfFirstItem, indexOfLastItem)
      // );
    },
    [
      // handleDisplay,
      data,
      currentPage,
      itemPerPage,
      indexOfLastItem,
      arrayOfData,
    ]
  );

  const handleNavigation = (action, page = 1) => {
    switch (action) {
      case "RESET":
        setArrayOfData(data);
        setItemPerPage(rowPagination);
        setCurrentPage(1);
        console.log("before " + currentPage);
        // handleDisplay();
        break;
      case "FIRST":
        setCurrentPage(1);
        break;
      case "PREVIOUS":
        break;
      case "NEXT":
        break;
      case "LAST":
        setCurrentPage(maxPageOfItems);
        break;
      case "SET":
        console.log(page);
        setCurrentPage(page);
        // handleDisplay();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    // Trie les données en fonction de la colonne et de l'ordre de tri
    if (sortColumn) {
      const sortedData = [...data].sort((a, b) => {
        const aValue = a[sortColumn] || "";
        const bValue = b[sortColumn] || "";

        if (sortOrder === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });

      setArrayOfData(sortedData);
      // setArrayOfDataToDisplay(
      //   arrayOfData.slice(indexOfFirstItem, indexOfLastItem)
      // );
    }
  }, [
    sortColumn,
    sortOrder,
    data,
    // indexOfFirstItem,
    // indexOfLastItem,
    // arrayOfData,
  ]);

  useEffect(() => {
    // setMaxPageOfItems(parseInt(data.length / itemPerPage));
    // setIndexOfLastItem(currentPage * itemPerPage);
    // setIndexOfFirstItem(indexOfLastItem - itemPerPage);
    // setArrayOfDataToDisplay(
    //   arrayOfData.slice(indexOfFirstItem, indexOfLastItem)
    // );
    refreshArray();
  }, [
    refreshArray,
    // currentPage,
    // data,
    // itemPerPage,
    // indexOfLastItem,
    // indexOfFirstItem,
    // arrayOfData,
  ]);

  return (
    <div className="table__container">
      {console.log("Rendu Table component")}
      {/* COMPONENT HEADER */}
      <div
        className={`table__header ${classHeader}`}
        // style={{ backgroundColor: primaryColor }}
      >
        {/* TITLE */}

        {tableTitle && <h3 style={{ color: fontHeaderColor }}>{tableTitle}</h3>}

        {/* RESEARCH BAR */}
        <div className="table__header--research-input">
          <input type="text" onChange={handleSearchBar} />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>

      <div className="table-content">
        {/* TABLE */}
        <table className="table-component">
          {/* TABLE HEADER */}
          <thead
            className="table-component__header"
            style={{ color: fontHeaderColor, backgroundColor: primaryColor }}
          >
            <tr>
              {listToDisplay?.map((item, index) => {
                return (
                  <th key={"header-" + index + item.dataName}>
                    {item.displayName}
                    <i
                      className="fa-solid fa-arrows-up-down"
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
        {!arrayOfDataToDisplay && (
          <div className="table__notification">No data available</div>
        )}
      </div>

      {/* PAGINATION */}
      {arrayOfDataToDisplay && (
        <div className="table__pagination">
          {/* BUTTON RESET */}
          <i
            className="fa-solid fa-arrow-rotate-right"
            // onClick={() => {
            //   setArrayOfData(data);
            //   setItemPerPage(rowPagination);
            //   setCurrentPage(1);
            // }}
            // onClick={() => handleNavigation("RESET")}
            // onClick={refreshArray}
            onClick={() => refreshArray(true)}
          ></i>

          {/* MAIN NAVIGATION BUTTON */}
          <div className="table__pagination--main-buttons">
            {/* SELECT PAGE */}
            <select
              value={currentPage}
              // onChange={(e) => setCurrentPage(e.target.value)}
              onChange={(e) => handleNavigation("SET", e.target.value)}
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
              {indexOfLastItem > data.length ? data.length : indexOfLastItem} of{" "}
              {data.length}
            </div>

            {/* BUTTON NEXT PAGE */}
            <i
              className={
                indexOfLastItem > data.length
                  ? "fa-solid fa-chevron-right desactivated"
                  : "fa-solid fa-chevron-right"
              }
              onClick={() =>
                setCurrentPage(
                  indexOfLastItem > data.length
                    ? currentPage
                    : parseInt(currentPage) + 1
                )
              }
            ></i>

            {/* BUTTON LAST PAGE */}
            <i
              className={
                indexOfLastItem > data.length
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
