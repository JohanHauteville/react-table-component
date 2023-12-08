import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import Table from "./components/Table";
import reportWebVitals from "./reportWebVitals";
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
      // classTableContainer={"new-class-container"}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
