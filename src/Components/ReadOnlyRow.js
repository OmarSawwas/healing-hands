import React from "react";

const ReadOnlyRow = ({ account, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{account.email}</td>
      <td>{account.status}</td>
      <td>{account.date}</td>
      <td>{account.datetime}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, account)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(account.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
