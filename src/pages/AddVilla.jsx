import React from "react";
import AddVillaHeader from "../components/AddVilla/AddVillaHeader";
import AddVillaForm from "../components/AddVilla/AddVillaForm";
import "../styles/add-villa.css";

const AddVilla = () => {
  return (
    <div className="add-villa-page">
      <AddVillaHeader />
      <AddVillaForm />
    </div>
  );
};

export default AddVilla;
