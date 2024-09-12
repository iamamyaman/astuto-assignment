import React, { useState } from "react";
import styles from "./Table.module.scss";
import userAvatar from "../../../assets/images/Avatar.svg";
import UserCell from "./UserCell/UserCell";
import Pagination from "../Pagination/Pagination";
import Teams from "./TeamsCell/TeamsCell";
import CustomCheckbox from "../../../components/Checkbox";
import Checkbox from "../../../components/Checkbox";

const Table = ({ schema, users }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10; // Set the number of items per page
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  };

  const handleSelectRow = (index) => {
    // Toggle the selected row: if it's already selected, remove it; otherwise, add it
    const newSelectedRows = selectedRows.includes(index)
      ? selectedRows.filter((rowIndex) => rowIndex !== index) // Remove if already selected
      : [...selectedRows, index]; // Add if not selected

    setSelectedRows(newSelectedRows);
  };

  // Handle "Select All" checkbox
  const handleSelectAllRows = () => {
    const currentRows = getPaginatedData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRowIndices = currentRows.map((_, index) => index + startIndex);

    // If all rows are currently selected, deselect them; otherwise, select all
    const newSelectedRows = areAllRowsSelected()
      ? selectedRows.filter((index) => !currentRowIndices.includes(index)) // Deselect all
      : [...new Set([...selectedRows, ...currentRowIndices])]; // Select all and remove duplicates

    setSelectedRows(newSelectedRows);
  };

  // Check if all rows are selected
  const areAllRowsSelected = () => {
    const currentRows = getPaginatedData();
    const indexOfFirstRow = (currentPage - 1) * itemsPerPage;

    return (
      currentRows.length > 0 &&
      currentRows.every((_, index) =>
        selectedRows.includes(index + indexOfFirstRow)
      )
    );
  };

  return (
    <div className={styles.Table}>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={areAllRowsSelected()}
                onChange={handleSelectAllRows}
              />
            </th>
            {schema?.map((column) => {
              return (
                <th key={column.field} className={styles.Head}>
                  {column?.Label}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {getPaginatedData()?.map((user, rowIndex) => {
            const actualIndex = (currentPage - 1) * itemsPerPage + rowIndex; // Calculate the actual index for each row

            return (
              <tr key={rowIndex}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(actualIndex)}
                    onChange={() => handleSelectRow(actualIndex)}
                  />
                </td>
                <td>
                  {/* Cutom component to show name,username and avatar */}
                  <UserCell
                    name={user?.name}
                    username={user?.username}
                    avatar={userAvatar}
                  />
                </td>
                <td>
                  <div className={styles.StatusPill}>{user?.status}</div>
                </td>
                <td>{user?.role}</td>
                <td>{user?.email}</td>
                <td>
                  {/* Custom Component to show user teams */}
                  <Teams teams={user?.teams} />
                </td>

                <td>
                  <Checkbox />
                </td>
                <td>
                  <Checkbox />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
