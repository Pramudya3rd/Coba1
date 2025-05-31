import React from "react";
import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyVillaRow = ({ villa }) => {
  const navigate = useNavigate();

  return (
    <tr className="villa-row">
      <td>{villa.name}</td>
      <td>{villa.address}</td>
      <td>{villa.status}</td>
      <td className="action-buttons">
        <button
          title="View"
          onClick={() => navigate(`/view-villa`, { state: { ...villa } })}
        >
          <FaRegEye />
        </button>

        <button
          title="Edit"
          onClick={() => navigate(`/edit-villa`, { state: { ...villa } })}
        >
          <FaEdit />
        </button>

        <button title="Delete">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default MyVillaRow;
