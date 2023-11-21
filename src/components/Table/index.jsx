import { useState } from "react";
import "./styles.scss";

function Table({ data, listToDisplay, primaryColor, rangePagination }) {
  const [rangeOfPagination, setRangeOfPagination] = useState(
    rangePagination ? rangePagination : 10
  );
  const [arrayOfData, setArrayOfData] = useState(data ? data : null);

  return (
    <div className="table__container">
      {arrayOfData && arrayOfData.header && (
        <h3 className="table__header">{data.header}</h3>
      )}
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
              {arrayOfData.data.map((employee, index) => {
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
          <div>
            1 to {arrayOfData.data.length} of {arrayOfData.data.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
