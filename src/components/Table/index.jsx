import { useEffect, useState } from "react";
import "./styles.scss";

function Table({
  data,
  listToDisplay,
  tableTitle,
  primaryColor,
  rowPagination,
}) {
  const [itemPerPage, setItemPerPage] = useState(
    rowPagination ? rowPagination : 10
  );
  const [arrayOfData, setArrayOfData] = useState(data ? data : null);
  const [currentPage, setCurrentPage] = useState(1);
  const [indexOfLastItem, setIndexOfLastItem] = useState(0);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);
  const [maxPageOfItems, setMaxPageOfItems] = useState(0);

  useEffect(() => {
    setMaxPageOfItems(parseInt(data.length / itemPerPage));
    setIndexOfLastItem(currentPage * itemPerPage);
    setIndexOfFirstItem(indexOfLastItem - itemPerPage);
    setArrayOfData(data.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, data, itemPerPage, indexOfLastItem, indexOfFirstItem]);

  return (
    <div className="table__container">
      {tableTitle && <h3 className="table__header">{tableTitle}</h3>}
      <div className="table-content">
        <table className="table-component">
          <thead className="table-component__header">
            <tr>
              {Object.values(listToDisplay)?.map((key) => {
                return <th key={"header-" + key}>{key}</th>;
              })}
            </tr>
          </thead>
          {arrayOfData && (
            <tbody>
              {arrayOfData.map((employee, index) => {
                return (
                  <tr
                    key={"data-row-" + index}
                    className="table-component__row"
                  >
                    {Object.keys(listToDisplay)?.map((key) => {
                      return (
                        <td
                          key={
                            "data-" + index + "-" + key + "-" + employee[key]
                          }
                        >
                          {employee[key]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {/* Display "No data available" if there's no data */}
        {!arrayOfData && (
          <div className="table__notification">No data available</div>
        )}
      </div>
      {arrayOfData && (
        <div className="table__pagination">
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(e.target.value)}
          >
            {/* {console.log(currentPage)} */}

            {Array.from({ length: maxPageOfItems + 1 }).map((_, index) => {
              return <option key={"page-" + (index + 1)}>{index + 1}</option>;
            })}
          </select>
          <i
            className={
              currentPage === 1
                ? "fa-solid fa-angles-left desactivated"
                : "fa-solid fa-angles-left"
            }
            onClick={() => setCurrentPage(1)}
          ></i>
          <i
            className={
              currentPage === 1
                ? "fa-solid fa-chevron-left desactivated"
                : "fa-solid fa-chevron-left"
            }
            onClick={() =>
              setCurrentPage(currentPage === 1 ? 1 : parseInt(currentPage) - 1)
            }
          ></i>
          <div>
            {indexOfFirstItem + 1} to{" "}
            {indexOfLastItem > data.length ? data.length : indexOfLastItem} of{" "}
            {data.length}
          </div>
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
          <i
            className={
              indexOfLastItem > data.length
                ? "fa-solid fa-angles-right desactivated"
                : "fa-solid fa-angles-right"
            }
            onClick={() => setCurrentPage(maxPageOfItems + 1)}
          ></i>
        </div>
      )}
    </div>
  );
}

export default Table;
