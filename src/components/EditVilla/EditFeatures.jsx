import React from "react";

const EditFeatures = ({ roomFeatures, newFeature, setNewFeature, addFeature, removeFeature }) => (
  <>
    <label>Room Features</label>
    <div className="inline-inputs">
      <input
        type="text"
        value={newFeature}
        onChange={(e) => setNewFeature(e.target.value)}
        placeholder="e.g., AC, TV"
      />
      <button type="button" onClick={addFeature} className="add-feature-btn">
        Add
      </button>
    </div>
    <ul className="features-list">
      {roomFeatures.map((f, i) => (
        <li key={i}>
          {f}{" "}
          <button type="button" onClick={() => removeFeature(f)}>
            ✕
          </button>
        </li>
      ))}
    </ul>
  </>
);

export default EditFeatures;
