import React from "react";
import NavbarProfile from "../components/NavbarProfile"; // Ubah import
import ErrorPage from "../components/Error";

const ForbiddenPage = () => {
  return (
    <>
      <NavbarProfile /> {/* Ubah penggunaan */}
      <ErrorPage
        code="403"
        title="Access Forbidden"
        description="You don’t have permission to access this page."
      />
    </>
  );
};

export default ForbiddenPage;
