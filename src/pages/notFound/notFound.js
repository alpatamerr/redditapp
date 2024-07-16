import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: "center", marginTop: 50 }}>
        The page you requested is not available
      </h2>
    </div>
  );
};

export default NotFound;