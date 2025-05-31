import React, { useEffect, useState } from "react";
import EditVillaHeader from "../components/EditVilla/EditHeader";
import EditVillaForm from "../components/EditVilla/EditVillaForm";
import { useNavigate, useLocation } from "react-router-dom";

const EditVilla = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const villaData = location.state;

  useEffect(() => {
    if (!villaData) {
      navigate("/villas");
    }
  }, [villaData, navigate]);

  return (
    <>
      <EditVillaHeader />
      <div className="add-villa-container" style={{ marginTop: "20px" }}>
        {villaData && <EditVillaForm villaData={villaData} />}
      </div>
    </>
  );
};

export default EditVilla;
