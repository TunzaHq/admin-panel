import React from "react";
import styled from "styled-components";
import { useTable } from "react-table";

function ReusableTable({ columns, data, title }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Section>
      <div className="salestable">
        <h3 className="tableTitle">{title}</h3>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

export default ReusableTable;
const Section = styled.section`
  .salestable {
    margin-top: 1.4rem;
    margin-right: 2px;
    padding: 10px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    overflow-x: scroll;
  }

  .tableTitle {
    margin: 2px 10px;
    text-align: left;
    font-weight: 450;
    font-size: 32px;
    color: black;
    line-height: 2em;
  }
  table {
    margin-top: 1rem;
    width: 100%;
    border-spacing: 0;
    // border: 0.4px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 150;
          border-top: 250;
          color: black;
          font-weight: 450;
          font-size: 15px;
        }
      }
    }
    th {
      text-align: center;
      padding: 0.2rem 0.2rem;
      color: #fff;
      background: #3a4276;
      border: transparent;
      border-radius: 12px;
    }    
    ,
    td {
      margin: 0;
      color: #665B5B;
      padding: 1rem 0.2rem;
      text-align: left;
      border-bottom: 1px solid gray;
      font-size: 13px;
      :first-child {
        font-weight: 450;
      }
      :last-child {
        border-right: 0;
      }
    }
    tr,
    td {
      text-align: center;
    }        
  }
`;
