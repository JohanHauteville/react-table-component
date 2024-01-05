# Easy-react-table-component

![Table component](./public/component-easy-to-use.svg) ![Table component](./public/build-with-react.svg)

An easy-to-use and customizable React table component.
Version: 1.1.1
![Table component](./public/TableCapture.png)

## Installation

- Installation via npm :
  `npm install easy-react-table-component`

- Import in a React file :
  `import Table from 'easy-react-table-component';`

## Requirements

To display icons you need to install Font Awesome.

1. Got to [Font Awesome](https://fontawesome.com/)

2. Create and install your Free [kit](https://fontawesome.com/kits) in your HTML head

## Props

| Name          | Type    | Description                                                                                                                                                                      | Example                                                                                                                                                                                                                                                          |
| ------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data          | JSON    | The JSON data that will be displayed in the table.<br>The data will be flattened to be displayed in the table.                                                                   | [{<br>firstName: "Linda", <br>lastName: "Randall", <br>startDate: "2022/04/15", <br>address: { <br>street: "594th Hope Street", <br>city: "Hatteras", <br>state: "KS", <br>zipCode: "35656" }, <br>birthDate: "1994/12/10", <br>department: "Human Ressources"}] |
| listToDisplay | JSON    | "JSON file specifying the elements of the JSON data to be displayed in the table.<br>"dataName" represents the name of the data, and "displayData" represents the column title." | [{ <br>dataName: "firstName", <br>displayName: "First Name" <br>}]                                                                                                                                                                                               |
| tableTitle    | String  | Table's Title                                                                                                                                                                    | "Employees"                                                                                                                                                                                                                                                      |
| researchBar   | Boolean | true: displayed, false: hidden (default: true)                                                                                                                                   | researchBar = {true}                                                                                                                                                                                                                                             |
| rowPagination | Number  | Sets the default number of rows per page. (default: 10)                                                                                                                          | rowPagination={7}                                                                                                                                                                                                                                                |
| labelPerPage  | String  | Sets the default name of elements per page (default: "Elements")                                                                                                                 | labelPerPage={"Emplpoyees"} <br> // "Employees per Pages                                                                                                                                                                                                         |

## Styling

You can change the style of the table by passing a class name using props that you will use with CSS/SASS

| Name                 | Type   | Description                  | Example                                           |
| -------------------- | ------ | ---------------------------- | ------------------------------------------------- |
| classHeader          | String | Styling the header           | classHeader = {"header"}                          |
| classHeaderTitle     | String | Styling the header title     | classHeaderTitle = {"table-header-title"}         |
| classTableContainer  | String | Styling the Table container  | classTableContainer = {"table-table-container"}   |
| classTableHeader     | String | Styling the Table header     | classTableHeader = {"table-table-header"}         |
| classTableContent    | String | Styling the Table content    | classTableContent = {"table-table-content"}       |
| classTablePagination | String | Styling the Table pagination | classTablePagination = {"table-table-pagination"} |
| classTableComponent  | String | Styling the Table component  | classTableComponent = {"table-table-component"}   |

## Repository

`https://github.com/JohanHauteville/react-table-component`

## Changelog

- ver 1.0.2 : Fix React import
- ver 1.0.4 : Fix Table Length
- ver 1.0.5 : Fix research Bar error when there's no data
- ver 1.0.6 : Add Ramda Librairie to flatten data
- ver 1.0.7 : Fix error on flatten data
- ver 1.0.8 : Fix flatten data with mergeAll
- ver 1.0.9 : Fix error on empty data
- ver 1.1.0 : Update responsivity
- ver 1.1.1 : Update Documentation

Thanks for your support !
