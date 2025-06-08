import React from "react";
import NavbarProfile from "../components/NavbarProfile"; // Ubah import
import ErrorPage from "../components/Error";

const NotFoundPage = () => {
  return (
    <>
      <NavbarProfile /> {/* Ubah penggunaan */}
      <ErrorPage
        code="404"
        title="Page Not Found"
        description="Oops! The page you’re looking for doesn’t exist or has been moved."
      />
    </>
  );
};

export default NotFoundPage;
