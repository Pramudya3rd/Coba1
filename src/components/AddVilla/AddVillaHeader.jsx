import React from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import "../../styles/add-villa.css";

const AddVillaHeader = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="add-villa-header">
      <div className="left-section">
        <button className="back-button" onClick={handleBack}>
          <LuArrowLeft size={20} />
        </button>
      </div>
      <div className="center-section">
        <div className="role">ADD VILLA</div>
      </div>
    </header>
  );
};

export default AddVillaHeader;
