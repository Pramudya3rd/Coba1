import React from "react";
import MyVillaRow from "./MyVillaRow"; 

const villas = [
  { id: 1, name: "Grand Barca Nirwana", address: "Yogyakarta", status: "Verified" },
  { id: 2, name: "Grand Barca Nirwana", address: "Yogyakarta", status: "Pending" },
  { id: 3, name: "Grand Barca Nirwana", address: "Yogyakarta", status: "Rejected" },
];

const MyVillaTable = () => {
  return (
    <table className="villa-table">
      <thead>
        <tr>
          <th>Villa Name</th>
          <th>Address</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {villas.map((villa) => (
          <MyVillaRow key={villa.id} villa={villa} />
        ))}
      </tbody>
    </table>
  );
};

export default MyVillaTable;


