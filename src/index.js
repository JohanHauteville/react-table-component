import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Table from "./components/Table";
import { EMPLOYEES_DATA, LIST_TO_DISPLAY } from "./mock/employees";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Table
      tableTitle={"Employees"}
      data={EMPLOYEES_DATA}
      listToDisplay={LIST_TO_DISPLAY}
      rowPagination={10}
      labelPerPage={"Employees"}
      // fontHeaderColor={"#fff"}
      classHeader={"new-class-header"}
      researchBar={false}
      // classTableContainer={"new-class-container"}
    />
  </React.StrictMode>
);
